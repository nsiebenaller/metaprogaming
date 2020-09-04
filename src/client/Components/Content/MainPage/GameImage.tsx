import React, { useState } from "react";
import { Game } from "../../../types/types";
import { connectContext } from "../../Context";

interface Props {
    game: Game;
}
export default function GameImage({ game }: Props) {
    const context = connectContext()!;
    const redirect = () => context.history.push(`/game/${game.name}`);

    return (
        <div className={"game"} onClick={redirect}>
            <img className={"img"} src={game.imageSrc} />
            <div className={"name"}>{game.name}</div>
        </div>
    );
}
