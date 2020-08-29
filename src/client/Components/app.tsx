import React from "react";
import "../Less/app.less";
import SidePanel from "./SidePanel/SidePanel";
import Content from "./Content/Content";
import { Game, Team } from "../types/types";
import { games, teams } from "../static/index";

interface State {
    selectedDivision: string;
    games: Array<Game>;
    teams: Array<Team>;
}
export default class App extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            selectedDivision: "Division 1",
            games: [],
            teams: [],
        };
    }

    componentDidMount() {
        // Fetch Games for conference
        this.setState({ games: games });

        // Fetch Teams for conference
        this.setState({ teams: teams });
    }

    changeDivision = (selectedDivision: string) => {
        this.setState({ selectedDivision });
    };

    render() {
        return (
            <div className="app">
                <SidePanel
                    selectedDivision={this.state.selectedDivision}
                    changeDivision={this.changeDivision}
                />
                <Content
                    selectedDivision={this.state.selectedDivision}
                    games={this.state.games}
                    teams={this.state.teams}
                />
            </div>
        );
    }
}
