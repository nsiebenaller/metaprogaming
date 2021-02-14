import React from "react";
import { Link } from "react-router-dom";

interface Props {
    game: Game;
    selected: boolean;
    selectGame: (game: Game) => void;
}
export default function GameItem({ game, selected, selectGame }: Props) {
    const handleClick = () => selectGame(game);
    return (
        <Link
            className={`menu-item ${selected ? "active" : ""}`}
            onClick={handleClick}
            to={`/Game/${game.id}`}
        >
            <span>{game.name}</span>
        </Link>
    );
}
