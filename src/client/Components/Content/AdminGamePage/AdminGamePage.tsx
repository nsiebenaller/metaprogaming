import React from "react";
import { connectContext, connectRouter } from "../../Context";
import GameCard from "./GameCard";
import ManageGameForm from "./ManageGameForm";

interface Props {
    gameId?: number;
}
export default function AdminGamePage({ gameId }: Props) {
    const context = connectContext();
    const { games } = context;

    const managedGame = gameId ? games.find((x) => x.id === gameId) : null;

    return (
        <div className={"admin-game-page"}>
            {!managedGame && (
                <React.Fragment>
                    <h1>Manage Games</h1>
                    <h4>NECC Conference</h4>
                    <div className={"game-card-container"}>
                        {games.map((game, key) => (
                            <GameCard key={key} game={game} />
                        ))}
                        <GameCard />
                    </div>
                </React.Fragment>
            )}
            {managedGame && <ManageGameForm game={managedGame} />}
        </div>
    );
}
