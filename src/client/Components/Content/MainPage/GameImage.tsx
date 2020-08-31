import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Game } from "../../../types/types";

interface Props {
    game: Game;
}
export default function GameImage({ game }: Props) {
    const [redirecting, setRedirecting] = useState<boolean>(false);
    const redirect = () => setRedirecting(true);

    if (redirecting) return <Redirect to={`/game/${game.name}`} />;
    return (
        <div className={"game"} onClick={redirect}>
            <img className={"img"} src={game.imageSrc} />
            <div className={"name"}>{game.name}</div>
        </div>
    );
}
