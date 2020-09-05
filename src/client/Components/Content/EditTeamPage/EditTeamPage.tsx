import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { TextField } from "ebrap-ui";
import { Team, Player } from "../../../types/types";
import PlayerItem from "./PlayerItem";

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

    const [newPlayer, setNewPlayer] = React.useState("");

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
        setNewPlayer("");
        onMount();
    };

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
            <div>
                <TextField
                    label={"New Player"}
                    value={newPlayer}
                    onChange={setNewPlayer}
                />
                <Button onClick={createPlayer}>Create</Button>
            </div>
        </div>
    );
}
