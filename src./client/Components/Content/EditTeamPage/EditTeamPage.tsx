import React from "react";
import axios from "axios";
import { TextField, Button, Multiselect } from "ebrap-ui";
import { Team, Player, Role, Game } from "../../../types/types";
import PlayerItem from "./PlayerItem";
import { connectContext } from "../../Context";

const initNewPlayer = {
    name: "",
    gamerTag: "",
    discord: "",
    games: new Array<Game>(),
    roles: new Array<Role>(),
};
const loadingTeam: Team = {
    id: -1,
    image: "",
    name: "loading...",
    players: new Array<Player>(),
};
interface Props {
    match: any;
}
export default function EditTeamPage({ match }: Props) {
    const context = connectContext()!;
    const teamId = parseInt(match.params.teamId);

    const [team, setTeam] = React.useState<Team>(loadingTeam);
    const setName = (name: string) => setTeam({ ...team, name });

    const [newPlayer, setNewPlayer] = React.useState(initNewPlayer);
    const setPlayerParam = (param: string) => (value: any) =>
        setNewPlayer({ ...newPlayer, [param]: value });

    const [roles, setRoles] = React.useState<Array<Role>>(new Array<Role>());

    React.useEffect(() => {
        onMount();
    }, []);
    async function onMount() {
        const requests = [
            axios.get("/api/Role"),
            axios.get("/api/Team", { params: { id: teamId } }),
        ];
        const [{ data: roles }, { data: teams }] = await Promise.all(requests);
        if (teams.length === 0) {
            return window.alert("error fetching team");
        }
        const selectedTeam: Team = teams[0];
        setTeam(selectedTeam);
        setRoles(roles);
    }

    const save = async () => {
        const { data } = await axios.patch("/api/Team", team);
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

        const teamRequest = {
            PlayerId: data.id,
            TeamId: teamId,
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
            axios.post("/api/TeamPlayers", teamRequest),
            axios.post("/api/PlayerGames", gameRequest),
            axios.post("/api/PlayerRoles", roleRequest),
        ];

        await Promise.all(requests);
        setNewPlayer(initNewPlayer);
        onMount();
    };

    if (team && team.players) {
        team.players.sort((a: Player, b: Player) => a.id - b.id);
    }

    let selectedGames = new Array();
    if (newPlayer.games) selectedGames = newPlayer.games.map(addValue);

    let allGames = new Array();
    if (context.games) allGames = context.games.map(addValue);

    let selectedRoles = new Array();
    if (newPlayer.roles) selectedRoles = newPlayer.roles.map(addValue);

    const allRoles = roles.map(addValue);

    let teamMembers = new Array<Player>();
    if (team.players) teamMembers = team.players;

    const [coaches, captains, players] = sortPlayers(teamMembers);

    return (
        <div className="team-page">
            <h1>Edit Team</h1>
            <div className="flex-row --right-pad-10">
                <TextField
                    label={"Team Name"}
                    value={team.name}
                    onChange={setName}
                    botPad
                />
                <Button onClick={save} color="blue-500" topPad>
                    Save
                </Button>
            </div>
            <hr />
            <h4>Roster</h4>
            {coaches.map((player: Player, key: number) => (
                <PlayerItem
                    key={key}
                    player={player}
                    teamId={teamId}
                    roles={roles}
                    refreshTeam={onMount}
                />
            ))}
            {captains.map((player: Player, key: number) => (
                <PlayerItem
                    key={key}
                    player={player}
                    teamId={teamId}
                    roles={roles}
                    refreshTeam={onMount}
                />
            ))}
            {players.map((player: Player, key: number) => (
                <PlayerItem
                    key={key}
                    player={player}
                    teamId={teamId}
                    roles={roles}
                    refreshTeam={onMount}
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
        </div>
    );
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
