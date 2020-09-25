import React from "react";
import { connectRouter } from "../../Context";

interface Props {
    game?: Game;
}
export default function GameCard({ game }: Props) {
    const router = connectRouter()!;

    const label = game ? game.name : "Create New";
    const src = game ? game.image : null;

    const handleClick = () => {
        if (game) {
            router.history.push(`/Admin/Game/${game.id}`);
        } else {
            router.history.push(`/Admin/Game/new`);
        }
    };

    return (
        <div className={"game-card"} onClick={handleClick}>
            {src && <img src={src} alt={label} />}
            {!src && <div>{label}</div>}
        </div>
    );
}
