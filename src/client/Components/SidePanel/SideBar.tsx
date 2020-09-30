import React from "react";
import metaLogo from "../../Assets/logo.png";
import neccLogo from "../../Assets/necc-logo.png";
import { ByName } from "../../utils/sort";
import { connectContext, connectRouter } from "../Context";
import GameItem from "./GameItem";

export default function SideBar() {
    const context = connectContext();
    const router = connectRouter()!;
    const { games, selectedGame } = context;
    games.sort(ByName);

    const navToMeta = () => {
        window.location.href = "https://www.metaprogaming.gg/";
    };
    const selectGame = (selectedGame: Game) => {
        context.setContext({ selectedGame });
        router.history.push(`/Game/${selectedGame.id}`);
    };
    const goHome = () => {
        router.history.push(`/`);
    };

    return (
        <div className="side-panel">
            <div className={"logo-container"} onClick={navToMeta}>
                <img className={"side-panel-logo"} src={metaLogo} />
            </div>
            <div className={"conference-item"}>
                <img
                    className={"conference-logo"}
                    src={neccLogo}
                    onClick={goHome}
                />
            </div>
            {games.map((game, key) => (
                <GameItem
                    key={key}
                    game={game}
                    selected={game.id === selectedGame?.id}
                    selectGame={selectGame}
                />
            ))}
        </div>
    );
}
