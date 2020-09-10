import React from "react";
import axios from "axios";
import { Player } from "../../../types/types";
import { TextField, Button, Multiselect } from "ebrap-ui";
import { connectContext } from "../../Context";

interface Props {
    player: Player;
    teamId: number;
    refreshTeam: () => void;
}
export default function PlayerItem({ player, teamId, refreshTeam }: Props) {
    const context = connectContext()!;

    const [currentPlayer, setPlayer] = React.useState(player);
    const setName = (name: string) => setPlayer({ ...currentPlayer, name });
    const setGamerTag = (gamerTag: string) =>
        setPlayer({ ...currentPlayer, gamerTag });
    const setDiscord = (discord: string) =>
        setPlayer({ ...currentPlayer, discord });
    const setGames = (games: any) => {
        setPlayer({ ...currentPlayer, games });
    };

    const save = async () => {
        const { data } = await axios.patch("/api/Player", currentPlayer);
        if (!data.success) {
            return window.alert("Error saving player");
        }
        const req = {
            PlayerId: currentPlayer.id,
            GameIds:
                (currentPlayer.games && currentPlayer.games.map((x) => x.id)) ||
                [],
        };
        await axios.post("/api/PlayerGames", req);
        window.alert("Success!");
    };
    const remove = async () => {
        await axios.delete("/api/TeamPlayers", {
            params: { TeamId: teamId, PlayerId: player.id },
        });
        await axios.delete("/api/Player", { params: { id: player.id } });
        refreshTeam();
    };

    const selectedGames =
        (currentPlayer.games &&
            currentPlayer.games.map((g) => ({ ...g, value: g.name }))) ||
        [];
    const allGames =
        (context.games &&
            context.games.map((g) => ({ ...g, value: g.name }))) ||
        [];

    return (
        <div className="player-item">
            <TextField
                label={"Player"}
                value={currentPlayer.name || ""}
                onChange={setName}
            />
            <TextField
                label={"Gamer Tag"}
                value={currentPlayer.gamerTag || ""}
                onChange={setGamerTag}
            />
            <TextField
                label={"Discord"}
                value={currentPlayer.discord || ""}
                onChange={setDiscord}
            />
            <Multiselect
                label={"Games"}
                placeholder={"Select Games"}
                selected={selectedGames}
                options={allGames}
                onChange={setGames}
            />
            <Button topPad onClick={save} variant="outlined" color="blue-500">
                Save
            </Button>
            <Button topPad onClick={remove} variant="outlined" color="red-500">
                Remove
            </Button>
        </div>
    );
}
