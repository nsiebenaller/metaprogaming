import React from "react";
import axios from "axios";
import { Player } from "../../../types/types";
import { TextField } from "ebrap-ui";
import Button from "@material-ui/core/Button";

interface Props {
    player: Player;
    teamId: number;
    refreshTeam: () => void;
}
export default function PlayerItem({ player, teamId, refreshTeam }: Props) {
    const [currentPlayer, setPlayer] = React.useState(player);
    const setName = (name: string) => setPlayer({ ...currentPlayer, name });

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
                value={currentPlayer.name}
                onChange={setName}
            />
            <Button onClick={save}>Save</Button>
            <Button onClick={remove}>Remove</Button>
        </div>
    );
}
