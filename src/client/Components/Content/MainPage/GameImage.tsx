import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Game } from "../../../types/types";

interface Props {
    game: Game;
}
export default function GameImage({ game }: Props) {
    const [img, setImg] = useState<string>();
    const [redirecting, setRedirecting] = useState<boolean>(false);
    const redirect = () => setRedirecting(true);

    useEffect(() => {
        fetch(game.image)
            .then((x) => x.blob())
            .then((x) => setImg(URL.createObjectURL(x)));
    }, [game]);

    if (redirecting) return <Redirect to={`/game/${game.name}`} />;
    if (!img) return null;
    return (
        <div className={"game"} onClick={redirect}>
            <img className={"img"} src={img} />
            <div className={"name"}>{game.name}</div>
        </div>
    );
}
