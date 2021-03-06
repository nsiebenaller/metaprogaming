import React from "react";
import GameCard from "./GameCard";

interface Props {
    games: Array<Game>;
}
export default function DisplayGames({ games }: Props) {
    return (
        <React.Fragment>
            <h2>Manage Games</h2>
            <h4>NECC Conference</h4>
            <div className={"game-card-container"}>
                {games.map((game, key) => (
                    <GameCard key={key} game={game} />
                ))}
                <GameCard />
            </div>
        </React.Fragment>
    );
}
