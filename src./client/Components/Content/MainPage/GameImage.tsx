import React from "react";
import { connectRouter } from "../../Context";

interface Props {
    game: Game;
}
export default function GameImage({ game }: Props) {
    const router = connectRouter()!;
    const redirect = () => router.history.push(`/game/${game.id}`);

    return (
        <div className={"game"} onClick={redirect}>
            <img className={"img"} src={game.image} />
            <div className={"name"}>{game.name}</div>
        </div>
    );
}
