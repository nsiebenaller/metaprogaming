import React from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import TopBar from "./TopBar/TopBar";
import LoginPage from "./LoginPage/LoginPage";
import GamePage from "./GamePage/GamePage";
import MainPage from "./MainPage/MainPage";
import NewMatchPage from "./NewMatchPage/NewMatchPage";
import EditMatchPage from "./EditMatchPage/EditMatchPage";
import EditWeeksPage from "./EditWeeksPage/EditWeeksPage";
import CreateSeasonPage from "./CreateSeasonPage/CreateSeasonPage";
import OrgPages from "./OrgPages";
import MainGamePage from "./MainGamePage/MainGamePage";
import AdminGamePage from "./AdminGamePage/AdminGamePage";

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
                <Route
                    path={"/Admin/Game/:gameId?"}
                    exact
                    component={renderAdminGamePage}
                />
                <Route path={"/Organization"} component={OrgPages} />
                <Route
                    path={"/Match/edit/:matchId"}
                    exact
                    component={renderEditMatchPage}
                />
                <Route path={"/Match/new"} exact component={NewMatchPage} />
                <Route path={"/Weeks/edit"} exact component={EditWeeksPage} />
                <Route
                    path={"/Season/new"}
                    exact
                    component={CreateSeasonPage}
                />
                {/* 
                <Route
                    path={"/game/:gameId"}
                    exact
                    component={({ match }: any) => <GamePage match={match} />}
                />
                <Route path={"/login"}>
                    <LoginPage />
                </Route>
                <Route path={"/Match/new"} exact>
                    <NewMatchPage />
                </Route>
                <Route
                    path={"/Match/edit/:matchId"}
                    exact
                    component={({ match }: any) => (
                        <EditMatchPage match={match} />
                    )}
                />
                <Route path={"/Organization"}>
                    <OrgPages />
                </Route>
                 */}
            </div>
        </div>
    );
}

interface MatchProps {
    gameId?: string;
    matchId?: string;
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
function renderAdminGamePage(props: RouteComponentProps<MatchProps>) {
    const {
        match: {
            params: { gameId },
        },
    } = props;
    if (!gameId) return <AdminGamePage gameId={undefined} />;
    return <AdminGamePage gameId={gameId} />;
}
function renderEditMatchPage(props: RouteComponentProps<MatchProps>) {
    const {
        match,
        match: {
            params: { matchId },
        },
    } = props;
    if (!matchId) return null;
    return <EditMatchPage match={match} />;
}
