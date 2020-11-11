import React from "react";
import { connectContext } from "../../../Context";
import DisplayGames from "./DisplayGames";
import ManageGameForm from "./ManageGameForm";
import NewGameForm from "./NewGameForm";

interface Props {
    gameId?: string;
}
export default function AdminGamePage({ gameId }: Props) {
    const context = connectContext();
    const { games } = context;
    let page = null;

    if (gameId === "new") {
        page = <NewGameForm />;
    } else if (!gameId) {
        page = <DisplayGames games={games} />;
    } else {
        const managedGame = games.find((x) => x.id === parseInt(gameId));
        if (!managedGame) {
            page = <div>unkown game</div>;
        } else {
            page = <ManageGameForm game={managedGame} />;
        }
    }

    return <div className={"admin-game-page"}>{page}</div>;
}
