import React from "react";
import axios from "axios";
import { TextField, Button, Multiselect } from "ebrap-ui";
import EditPlayerItem from "./EditPlayerItem";
import EditTeamItem from "./EditTeamItem";
import { connectContext } from "../../Context";
import { fetchOrganizations } from "../../../Api";

const initNewPlayer = {
    name: "",
    gamerTag: "",
    discord: "",
    games: new Array<Game>(),
    roles: new Array<Role>(),
};
const loadingOrg: Organization = {
    id: -1,
    image: "",
    name: "loading...",
    players: new Array<Player>(),
};
interface Props {
    match: any;
}
export default function EditOrgPage({ match }: Props) {
    const context = connectContext()!;
    const orgId = parseInt(match.params.orgId);

    const [org, setOrg] = React.useState<Organization>(loadingOrg);
    const setName = (name: string) => setOrg({ ...org, name });

    const [newPlayer, setNewPlayer] = React.useState(initNewPlayer);
    const setPlayerParam = (param: string) => (value: any) =>
        setNewPlayer({ ...newPlayer, [param]: value });

    const [newTeam, setNewTeam] = React.useState("");
    const handleNewTeam = (value: string) => setNewTeam(value);

    const [roles, setRoles] = React.useState<Array<Role>>(new Array<Role>());

    React.useEffect(() => {
        onMount();
        return () => {
            onUnMount();
        };
    }, []);
    async function onMount() {
        const requests = [
            axios.get("/api/Role"),
            axios.get("/api/Organization", { params: { id: orgId } }),
        ];
        const [{ data: roles }, { data: orgs }] = await Promise.all(requests);
        if (orgs.length === 0) {
            return window.alert("error fetching organization");
        }
        setOrg(orgs[0] as Organization);
        setRoles(roles);
    }
    async function onUnMount() {
        const orgs = await fetchOrganizations();
        context.setContext({ organizations: orgs });
    }

    const save = async () => {
        const { data } = await axios.patch("/api/Organization", org);
        if (data.success) {
            return window.alert("success!");
        }
    };

    const createPlayer = async () => {
        const { data } = await axios.post("/api/Player", newPlayer);
        if (!data.success) {
            return window.alert("error creating player");
        }

        let GameIds = new Array();
        if (newPlayer.games) GameIds = newPlayer.games.map(getId);
        let RoleIds = new Array();
        if (newPlayer.roles) RoleIds = newPlayer.roles.map(getId);

        const orgRequest = {
            PlayerId: data.id,
            OrganizationId: orgId,
        };
        const gameRequest = {
            PlayerId: data.id,
            GameIds,
        };
        const roleRequest = {
            PlayerId: data.id,
            RoleIds,
        };
        const requests = [
            axios.post("/api/OrganizationPlayers", orgRequest),
            axios.post("/api/PlayerGames", gameRequest),
            axios.post("/api/PlayerRoles", roleRequest),
        ];

        await Promise.all(requests);
        setNewPlayer(initNewPlayer);
        onMount();
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
        onMount();
    };

    if (org && org.players) {
        org.players.sort((a: Player, b: Player) => a.id - b.id);
    }

    let selectedGames = new Array();
    if (newPlayer.games) selectedGames = newPlayer.games.map(addValue);

    let allGames = new Array();
    if (context.games) allGames = context.games.map(addValue);

    let selectedRoles = new Array();
    if (newPlayer.roles) selectedRoles = newPlayer.roles.map(addValue);

    const allRoles = roles.map(addValue);

    let allPlayers = new Array<Player>();
    if (org.players) allPlayers = org.players;

    const [coaches, captains, players] = sortPlayers(allPlayers);

    let allTeams = new Array<Team>();
    if (org.teams) allTeams = org.teams;

    return (
        <div className="org-page">
            <h1>Edit Organization</h1>
            <div className="flex-row --right-pad-10">
                <TextField
                    label={"Organization Name"}
                    value={org.name || ""}
                    onChange={setName}
                    botPad
                />
                <Button onClick={save} color="blue-500" topPad>
                    Save
                </Button>
            </div>
            <hr />
            <h4>Roster</h4>
            {allPlayers.length === 0 && <div>No Players</div>}
            {coaches.map((player: Player, key: number) => (
                <EditPlayerItem
                    key={`coaches-${rand(key)}`}
                    player={player}
                    orgId={orgId}
                    roles={roles}
                    refreshOrg={onMount}
                />
            ))}
            {captains.map((player: Player, key: number) => (
                <EditPlayerItem
                    key={`captains-${rand(key)}`}
                    player={player}
                    orgId={orgId}
                    roles={roles}
                    refreshOrg={onMount}
                />
            ))}
            {players.map((player: Player, key: number) => (
                <EditPlayerItem
                    key={`players-${rand(key)}`}
                    player={player}
                    orgId={orgId}
                    roles={roles}
                    refreshOrg={onMount}
                />
            ))}
            <hr />
            <div className="flex-row --right-pad-10">
                <TextField
                    label={"Name"}
                    value={newPlayer.name}
                    onChange={setPlayerParam("name")}
                />
                <TextField
                    label={"Gamer Tag"}
                    value={newPlayer.gamerTag}
                    onChange={setPlayerParam("gamerTag")}
                />
                <TextField
                    label={"Discord"}
                    value={newPlayer.discord}
                    onChange={setPlayerParam("discord")}
                />
                <Multiselect
                    label={"Games"}
                    placeholder={"Select Games"}
                    selected={selectedGames}
                    options={allGames}
                    onChange={setPlayerParam("games")}
                />
                <Multiselect
                    label={"Roles"}
                    placeholder={"Select Roles"}
                    selected={selectedRoles}
                    options={allRoles}
                    onChange={setPlayerParam("roles")}
                />
                <Button
                    onClick={createPlayer}
                    variant="outlined"
                    color="blue-500"
                    topPad
                >
                    Create
                </Button>
            </div>
            <h4>Teams</h4>
            {allTeams.map((team: Team, key: number) => (
                <EditTeamItem
                    key={rand(key)}
                    team={team}
                    refreshOrg={onMount}
                />
            ))}
            {allTeams.length === 0 && <div>No Teams</div>}
            <div className="flex-row --right-pad-10">
                <TextField
                    label={"New Team Name"}
                    value={newTeam}
                    onChange={handleNewTeam}
                />
                <Button
                    onClick={createTeam}
                    variant="outlined"
                    color="blue-500"
                    topPad
                >
                    Create
                </Button>
            </div>
        </div>
    );
}

function rand(key: number): string {
    return `${key}-${Math.random() * 100}`;
}

function sortPlayers(
    teamMembers: Array<Player>
): [Array<Player>, Array<Player>, Array<Player>] {
    const coaches = new Array<Player>();
    const captains = new Array<Player>();
    const players = new Array<Player>();

    teamMembers.forEach((player: Player) => {
        const { roles } = player;
        if (!roles) {
            players.push(player);
        } else if (roles.some((r) => r.name === "Coach")) {
            coaches.push(player);
        } else if (roles.some((r) => r.name === "Captain")) {
            captains.push(player);
        } else if (roles.some((r) => r.name === "Player")) {
            players.push(player);
        }
    });

    return [coaches, captains, players];
}

function addValue(a: Game | Role) {
    return { ...a, value: a.name };
}

function getId(a: Game | Role) {
    return a.id;
}
