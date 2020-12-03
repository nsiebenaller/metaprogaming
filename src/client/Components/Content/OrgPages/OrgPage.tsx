import React from "react";
import { command } from "ebrap-ui";
import { ByName } from "../../../utils/sort";
import OrgHeader from "./OrgHeader";
import { connectContext } from "../../../Store/Store";
import PlayerList from "./PlayerList";
import { fetchOrganization } from "../../../Api";

interface Props {
    match: any;
}
let mounted = true;
export default function OrgPage({ match }: Props) {
    const context = connectContext();
    const orgId = parseInt(match.params.orgId);

    const [org, setOrg] = React.useState<Organization | undefined>(undefined);

    const loadOrganization = async () => {
        const organization = await fetchOrganization(orgId);
        if (!organization) {
            return await command.alert("error fetching organization");
        }
        if (mounted) setOrg(organization);
    };
    React.useEffect(() => {
        mounted = true;
        loadOrganization();
        return () => {
            mounted = false;
        };
    }, []);

    if (!org) {
        return (
            <div>
                <h1>Organization</h1>
                <div>Loading...</div>
            </div>
        );
    }

    let allTeams = new Array<Team>();
    if (org.teams) allTeams = org.teams;
    allTeams.sort(ByName);

    return (
        <div>
            <OrgHeader organization={org} user={context.user} />
            <hr />
            <PlayerList
                user={context.user}
                organization={org}
                loadOrganization={loadOrganization}
            />
            <h4>Teams</h4>
            <div className={"flex-col children--bot-pad-10"}>
                {allTeams.map((team: Team, key: number) => (
                    <div
                        className={
                            "card background--grey-800 hover-background--grey-700"
                        }
                        key={key}
                    >
                        {team.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
