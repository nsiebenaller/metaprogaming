import React from "react";
import {
    BrowserRouter as Router,
    Route,
    RouteComponentProps,
} from "react-router-dom";
import TopBar from "./TopBar/TopBar";
import { Game, Team } from "../../types/types";
import MainPage from "./MainPage/MainPage";
import GamePage from "./GamePage/GamePage";

interface Props {
    selectedDivision: string;
    games: Array<Game>;
    teams: Array<Team>;
}
export default function Content(props: Props) {
    return (
        <div className="content">
            <TopBar />
            <Router>
                <Route
                    path={"/"}
                    exact
                    component={(routerProps: RouteComponentProps) => (
                        <MainPage {...props} {...routerProps} />
                    )}
                ></Route>
                <Route
                    path={"/game/:game"}
                    component={(routerProps: RouteComponentProps) => (
                        <GamePage
                            selectedDivision={props.selectedDivision}
                            {...routerProps}
                        />
                    )}
                />
            </Router>
        </div>
    );
}
