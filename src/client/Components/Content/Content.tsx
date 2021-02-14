import React from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import { connectContext } from "@Store";

import Admin from "./Admin/Admin";
import LoginPage from "./LoginPage/LoginPage";
import MainPage from "./MainPage/MainPage";
import OrgPages from "./OrgPages";
import MainGamePage from "./MainGamePage/MainGamePage";
import TopBar from "../global/TopBar/TopBar";
import MyProfile from "./MyProfile/MyProfile";
import Page from "./Page";

export default function Content() {
    return (
        <div className="content">
            <Route path={"/"} component={TopBar} />
            <div className="content-main">
                <Route path={"/"} exact component={MainPage} />
                <Route
                    path={"/Game/:gameId"}
                    exact
                    component={renderMainGamePage}
                />
                <Route path={"/login"} exact component={LoginPage} />
                <Route path={"/Organization"} component={OrgPages} />
                <Route path={"/Page/:pageId"} exact component={Page} />
                <Route path={"/Admin"} component={Admin} />
                <Route path={"/MyProfile"} component={MyProfile} />
            </div>
        </div>
    );
}

interface MatchProps {
    gameId?: string;
    matchId?: string;
    pageId?: string;
}
function renderMainGamePage(props: RouteComponentProps<MatchProps>) {
    const {
        match: {
            params: { gameId },
        },
    } = props;
    if (!gameId) return null;
    return <MainGamePage gameId={parseInt(gameId)} />;
}

function renderPage(props: RouteComponentProps<MatchProps>) {
    const {
        match: {
            params: { pageId },
        },
    } = props;
    const { pages, selectedPage, setContext } = connectContext();
    React.useEffect(() => {
        if (!pageId) return;
        const p = pages.find((x) => x.id === parseInt(pageId));
        setContext({ selectedPage: p, selectedGame: undefined });
    }, [pageId, pages]);

    const twitchStreams = findTwitchStreams(selectedPage?.components);
    React.useEffect(() => {
        // Clear all existing Twitch Streams
        twitchStreams.forEach((c, idx) => {
            const hook = document.getElementById(`stream-${c.content}-${idx}`);
            if (!hook) return;
            while (hook.firstChild) {
                hook.removeChild(hook.firstChild);
            }
        });
        // Mount new Twitch Streams
        twitchStreams.forEach((c, idx) => {
            new Twitch.Embed(`stream-${c.content}-${idx}`, {
                width: 854,
                height: 480,
                channel: c.content,
            });
        });
    }, [twitchStreams]);

    if (!selectedPage) return null;
    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: selectedPage.content }} />
            {twitchStreams.map((c, idx) => (
                <div
                    className={"stream-container"}
                    key={`stream-${c.content}-${idx}`}
                    id={`stream-${c.content}-${idx}`}
                />
            ))}
        </div>
    );
}

function findTwitchStreams(
    components: Array<PageComponent> | undefined
): Array<PageComponent> {
    if (!components) return [];
    return components.filter((c) => c.type === "TWITCH_STREAM");
}
