import React from "react";
import { connectContext } from "../../Context";

interface Props {
    game: Game;
}
export default function GameImage({ game }: Props) {
    const context = connectContext()!;
    const redirect = () => context.history.push(`/game/${game.id}`);

    return (
        <div className={"game"} onClick={redirect}>
            <img className={"img"} src={game.imageSrc} />
            <div className={"name"}>{game.name}</div>
        </div>
    );
}
