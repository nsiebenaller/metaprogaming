import React from "react";
import axios from "axios";
import { Player } from "../../../types/types";
import { TextField, Button } from "ebrap-ui";

interface Props {
    player: Player;
    teamId: number;
    refreshTeam: () => void;
}
export default function PlayerItem({ player, teamId, refreshTeam }: Props) {
    const [currentPlayer, setPlayer] = React.useState(player);
    const setName = (name: string) => setPlayer({ ...currentPlayer, name });
    const setGamerTag = (gamerTag: string) =>
        setPlayer({ ...currentPlayer, gamerTag });
    const setDiscord = (discord: string) =>
        setPlayer({ ...currentPlayer, discord });

    const save = async () => {
        const { data } = await axios.patch("/api/Player", currentPlayer);
        if (data.success) {
            return window.alert("success!");
        }
    };
    const remove = async () => {
        await axios.delete("/api/TeamPlayers", {
            params: { TeamId: teamId, PlayerId: player.id },
        });
        await axios.delete("/api/Player", { params: { id: player.id } });
        refreshTeam();
    };

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
            <Button topPad onClick={save} variant="outlined" color="blue-500">
                Save
            </Button>
            <Button topPad onClick={remove} variant="outlined" color="red-500">
                Remove
            </Button>
        </div>
    );
}
