import React from "react";
import { Route, RouteComponentProps } from "react-router-dom";

import Admin from "./Admin/Admin";
import LoginPage from "./LoginPage/LoginPage";
import MainPage from "./MainPage/MainPage";
import OrgPages from "./OrgPages";
import MainGamePage from "./MainGamePage/MainGamePage";
import TopBar from "./TopBar/TopBar";
import { connectContext } from "../Context";

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
                <Route path={"/Page/:pageId"} exact component={renderPage} />
                <Route path={"/Admin"} component={Admin} />
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
    if (!pageId) return null;
    const context = connectContext();
    const { pages } = context;
    const p = pages.find((x) => x.id === parseInt(pageId));
    if (!p) return null;

    React.useEffect(() => {
        context.setContext({ selectedPage: p });
    }, []);

    return <div dangerouslySetInnerHTML={{ __html: p.content }} />;
}
