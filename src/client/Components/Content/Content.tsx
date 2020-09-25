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

                {/* <Route path={"/"} exact>
                    <MainPage />
                </Route>
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
                <Route path={"/Weeks/edit"} exact>
                    <EditWeeksPage />
                </Route>
                <Route
                    path={"/Season/:gameId"}
                    exact
                    component={({ match }: any) => (
                        <CreateSeasonPage match={match} />
                    )}
                /> */}
            </div>
        </div>
    );
}

interface GameIdQueryParam {
    gameId?: string;
}
function renderMainGamePage(props: RouteComponentProps<GameIdQueryParam>) {
    const {
        match: {
            params: { gameId },
        },
    } = props;
    if (!gameId) return null;
    return <MainGamePage gameId={parseInt(gameId)} />;
}
function renderAdminGamePage(props: RouteComponentProps<GameIdQueryParam>) {
    const {
        match: {
            params: { gameId },
        },
    } = props;
    if (!gameId) return <AdminGamePage gameId={undefined} />;
    return <AdminGamePage gameId={gameId} />;
}
