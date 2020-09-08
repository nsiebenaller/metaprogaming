import React from "react";
import { Route } from "react-router-dom";
import TopBar from "./TopBar/TopBar";
import LoginPage from "./LoginPage/LoginPage";
import GamePage from "./GamePage/GamePage";
import MainPage from "./MainPage/MainPage";
import NewMatchPage from "./NewMatchPage/NewMatchPage";
import EditMatchPage from "./EditMatchPage/EditMatchPage";
import EditTeamPage from "./EditTeamPage/EditTeamPage";
import EditWeeksPage from "./EditWeeksPage/EditWeeksPage";
import CreateSeasonPage from "./CreateSeasonPage/CreateSeasonPage";

interface Props {
    selectedDivision: string;
}
export default function Content(props: Props) {
    return (
        <div className="content">
            <Route path={"/"} component={TopBar} />
            <div className="content-main">
                <Route path={"/"} exact>
                    <MainPage {...props} />
                </Route>
                <Route
                    path={"/game/:gameId"}
                    component={({ match }: any) => (
                        <GamePage
                            selectedDivision={props.selectedDivision}
                            match={match}
                        />
                    )}
                />
                <Route path={"/login"}>
                    <LoginPage />
                </Route>
                <Route path={"/Match/new"} exact>
                    <NewMatchPage />
                </Route>
                <Route
                    path={"/Match/edit/:matchId"}
                    component={({ match }: any) => (
                        <EditMatchPage match={match} />
                    )}
                />
                <Route
                    path={"/Team/edit/:teamId"}
                    component={({ match }: any) => (
                        <EditTeamPage match={match} />
                    )}
                />
                <Route path={"/Weeks/edit"} exact>
                    <EditWeeksPage selectedDivision={props.selectedDivision} />
                </Route>
                <Route
                    path={"/Season/:gameId"}
                    component={({ match }: any) => (
                        <CreateSeasonPage
                            match={match}
                            selectedDivision={props.selectedDivision}
                        />
                    )}
                />
            </div>
        </div>
    );
}
