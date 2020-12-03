import React from "react";
import { ByName } from "../../utils/sort";
import { connectContext, connectRouter } from "../../Store/Store";
import GameItem from "./GameItem";
import PageItem from "./PageItem";
import config from "../../config.js";

const isNECC = config.theme === "necc";
export default function SideBar() {
    const context = connectContext();
    const router = connectRouter();
    const { games, pages, selectedGame, selectedPage } = context;
    games.sort(ByName);

    const [showPages, setShowPages] = React.useState<Array<Page>>([]);
    React.useEffect(() => {
        const p = pages.filter((p) => !p.hidden);
        p.sort(ByName);
        setShowPages(p);
    }, [pages]);

    const navToMeta = () => {
        window.location.href = "https://www.metaprogaming.gg/";
    };
    const selectGame = (selectedGame: Game) => {
        context.setContext({ selectedGame, selectedPage: undefined });
    };
    const selectPage = (selectedPage: Page) => {
        context.setContext({ selectedGame: undefined, selectedPage });
    };
    const goHome = () => {
        router.navigate(`/`);
    };

    return (
        <div className="side-panel">
            <div className={"logo-container"} onClick={navToMeta}>
                <img
                    className={"side-panel-logo"}
                    src={"/images/meta-logo-no-bg.png"}
                />
            </div>
            {isNECC && (
                <div className={"conference-item"}>
                    <img
                        className={"conference-logo"}
                        src={"/images/logo.png"}
                        onClick={goHome}
                    />
                </div>
            )}

            {showPages.map((page, idx) => (
                <PageItem
                    key={idx}
                    page={page}
                    selected={page.id === selectedPage?.id}
                    selectPage={selectPage}
                />
            ))}
            {games.map((game, key) => (
                <GameItem
                    key={key}
                    game={game}
                    selected={game.id === selectedGame?.id}
                    selectGame={selectGame}
                />
            ))}
            <div className={"vert-banner"}>
                <img
                    className={"vert-banner-img"}
                    src={"/images/vert-banner.png"}
                    onClick={goHome}
                />
            </div>
        </div>
    );
}
