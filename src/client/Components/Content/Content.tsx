import React from "react";
import { Route } from "react-router-dom";
import TopBar from "./TopBar/TopBar";
import LoginPage from "./LoginPage/LoginPage";
import GamePage from "./GamePage/GamePage";
import MainPage from "./MainPage/MainPage";
import NewMatchPage from "./NewMatchPage/NewMatchPage";
import EditMatchPage from "./EditMatchPage/EditMatchPage";
import EditWeeksPage from "./EditWeeksPage/EditWeeksPage";
import CreateSeasonPage from "./CreateSeasonPage/CreateSeasonPage";
import OrgPages from "./OrgPages";

export default function Content() {
    return (
        <div className="content">
            <Route path={"/"} component={TopBar} />
            <div className="content-main">
                <Route path={"/"} exact>
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
                />
            </div>
        </div>
    );
}
