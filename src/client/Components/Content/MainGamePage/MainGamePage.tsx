import React from "react";
import { connectContext } from "../../Context";

interface Props {
    gameId: number;
}
export default function MainGamePage({ gameId }: Props) {
    const context = connectContext();
    const { selectedGame, games } = context;

    // Set selected game if not set
    if (!selectedGame) {
        const game = games.find((x) => x.id === gameId);
        if (!game) return null;
        context.setContext({ selectedGame: game });
        return null;
    }

    return (
        <div>
            <h1>{selectedGame.name}</h1>
        </div>
    );
}
