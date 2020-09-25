import React from "react";

interface Props {
    game: Game;
    selected: boolean;
    selectGame: (game: Game) => void;
}
export default function GameItem({ game, selected, selectGame }: Props) {
    const handleClick = () => selectGame(game);
    return (
        <div
            className={`menu-item ${selected ? "active" : ""}`}
            onClick={handleClick}
        >
            <span>{game.name}</span>
        </div>
    );
}
