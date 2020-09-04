import React from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import TopBar from "./TopBar/TopBar";
import { Game, Team } from "../../types/types";
import LoginPage from "./LoginPage/LoginPage";
import GamePage from "./GamePage/GamePage";
import MainPage from "./MainPage/MainPage";

interface Props {
    selectedDivision: string;
    games: Array<Game>;
    teams: Array<Team>;
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
                    path={"/game/:game"}
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
            </div>
        </div>
    );
}
