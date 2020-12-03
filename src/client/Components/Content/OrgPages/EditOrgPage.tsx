import React from "react";
import axios from "axios";
import { TextField, Button, command } from "ebrap-ui";
import EditTeamItem from "./EditTeamItem";
import { connectContext, connectRouter } from "../../../Store/Store";
import {
    deleteOrganization,
    fetchOrganization,
    fetchOrganizations,
    updateOrganization,
} from "../../../Api";
import * as Util from "../../../utils/file";
import OrgHeader from "./OrgHeader";
import PlayerList from "./PlayerList";
import TeamList from "./TeamList";

const loadingOrg: Organization = {
    id: -1,
    image: "",
    name: "loading...",
    players: new Array<Player>(),
};
interface Props {
    match: any;
}
let mounted = true;
export default function EditOrgPage({ match }: Props) {
    const context = connectContext();
    const router = connectRouter()!;
    const orgId = parseInt(match.params.orgId);

    const imageRef = React.useRef<HTMLImageElement | null>(null);
    const [file, setFile] = React.useState<File | undefined>();
    const handleFile = (event: React.FormEvent<HTMLInputElement>) => {
        const file = Util.extractFile(event);
        setFile(file);
        if (!file) return;
        Util.setImage(file, imageRef);
    };

    const [org, setOrg] = React.useState<Organization>(loadingOrg);
    const setName = (name: string) => setOrg({ ...org, name });

    const [newTeam, setNewTeam] = React.useState("");
    const handleNewTeam = (value: string) => setNewTeam(value);

    const loadOrganization = async () => {
        const organization = await fetchOrganization(orgId);
        if (organization && mounted) setOrg(organization);
    };
    React.useEffect(() => {
        mounted = true;
        loadOrganization();
        return () => {
            mounted = false;
            context.loadOrganizations();
        };
    }, []);

    const save = async () => {
        const data = await updateOrganization(org.id, org.name, file);
        if (data.success) {
            return window.alert("success!");
        }
    };
    const deleteOrg = async () => {
        const confirmed = await command.confirm(
            "Are you sure you would like to permanently delete this organization?"
        );
        if (confirmed) {
            const data = await deleteOrganization(org.id);
            if (!data.success) {
                return window.alert("Error deleting organization");
            }
            const organizations = await fetchOrganizations();
            context.setContext({ organizations });
            router.navigate("/");
        }
    };

    const createTeam = async () => {
        const { data } = await axios.post("/api/Team", {
            name: newTeam,
            OrganizationId: orgId,
        });
        if (!data.success) {
            return window.alert("error creating team");
        }
        setNewTeam("");
        loadOrganization();
    };

    let allTeams = new Array<Team>();
    if (org.teams) allTeams = org.teams;

    return (
        <div className="org-page">
            <OrgHeader
                user={context.user}
                organization={org}
                imageRef={imageRef}
                handleFile={handleFile}
                setName={setName}
                saveOrganization={save}
                deleteOrganization={deleteOrg}
            />
            <hr />
            <PlayerList
                user={context.user}
                organization={org}
                loadOrganization={loadOrganization}
            />
            <hr />
            <TeamList
                orgId={orgId}
                user={context.user}
                teams={allTeams}
                newTeam={newTeam}
                handleNewTeam={handleNewTeam}
                createTeam={createTeam}
                loadOrganization={loadOrganization}
            />
        </div>
    );
}
