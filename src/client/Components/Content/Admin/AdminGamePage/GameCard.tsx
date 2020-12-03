import React from "react";
import { connectRouter } from "../../../../Store/Store";
import * as Util from "../../../../utils/file";

interface Props {
    game?: Game;
}
export default function GameCard({ game }: Props) {
    const router = connectRouter()!;

    const label = game ? game.name : "Create New";
    const src = game ? game.image : null;

    const handleClick = () => {
        if (game) {
            router.navigate(`/Admin/Game/${game.id}`);
        } else {
            router.navigate(`/Admin/Game/new`);
        }
    };

    return (
        <div className={"game-card"} onClick={handleClick}>
            {src && <img src={src} alt={label} />}
            {!src && <div>{label}</div>}
        </div>
    );
}
