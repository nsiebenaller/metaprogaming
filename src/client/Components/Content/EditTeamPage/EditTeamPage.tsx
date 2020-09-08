import React from "react";
import axios from "axios";
import { TextField, Button } from "ebrap-ui";
import { Team, Player } from "../../../types/types";
import PlayerItem from "./PlayerItem";

const initNewPlayer = {
    name: "",
    gamerTag: "",
    discord: "",
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
    const teamId = parseInt(match.params.teamId);

    const [team, setTeam] = React.useState<Team>(loadingTeam);
    const setName = (name: string) => setTeam({ ...team, name });

    const [newPlayer, setNewPlayer] = React.useState(initNewPlayer);
    const setPlayerName = (name: string) =>
        setNewPlayer({ ...newPlayer, name });
    const setGamerTag = (gamerTag: string) =>
        setNewPlayer({ ...newPlayer, gamerTag });
    const setDiscord = (discord: string) =>
        setNewPlayer({ ...newPlayer, discord });

    React.useEffect(() => {
        onMount();
    }, []);
    async function onMount() {
        const { data: teams } = await axios.get("/api/Team", {
            params: { id: teamId },
        });
        if (teams.length === 0) {
            return window.alert("error fetching team");
        }
        setTeam(teams[0] as Team);
    }

    const save = async () => {
        const { data } = await axios.patch("/api/Team", team);
        if (data.success) {
            return window.alert("success!");
        }
    };

    const createPlayer = async () => {
        const { data } = await axios.post("/api/Player", { name: newPlayer });
        if (!data.success) {
            return window.alert("error creating player");
        }
        await axios.post("/api/TeamPlayers", {
            PlayerId: data.id,
            TeamId: teamId,
        });
        setNewPlayer(initNewPlayer);
        onMount();
    };

    if (team && team.players) {
        team.players.sort((a: Player, b: Player) => a.id - b.id);
    }

    return (
        <div>
            <h1>Edit Team</h1>
            <TextField
                label={"Team Name"}
                value={team.name}
                onChange={setName}
                botPad
            />
            <br />
            <Button onClick={save}>Save</Button>
            <h4>Players</h4>
            {team.players &&
                team.players.map((player: Player, key: number) => (
                    <PlayerItem
                        key={key}
                        player={player}
                        teamId={teamId}
                        refreshTeam={onMount}
                    />
                ))}
            <div className="player-item">
                <TextField
                    label={"New Player"}
                    value={newPlayer.name}
                    onChange={setPlayerName}
                />
                <TextField
                    label={"Gamer Tag"}
                    value={newPlayer.gamerTag}
                    onChange={setGamerTag}
                />
                <TextField
                    label={"Discord"}
                    value={newPlayer.discord}
                    onChange={setDiscord}
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
