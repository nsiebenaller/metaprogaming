import React from "react";
import "../Less/app.less";
import SidePanel from "./SidePanel/SidePanel";
import Content from "./Content/Content";
import { Game, Team } from "../types/types";
import { games, teams } from "../static/index";
import RouterContextWrapper from "./Router";

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

    async componentDidMount() {
        // Fetch Games for conference
        const gameList = (await populateImages(games)) as Array<Game>;
        this.setState({ games: gameList });

        // Fetch Teams for conference
        const teamList = (await populateImages(teams)) as Array<Team>;
        this.setState({ teams: teamList });
    }

    changeDivision = (selectedDivision: string) => {
        this.setState({ selectedDivision });
    };

    render() {
        return (
            <RouterContextWrapper>
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
            </RouterContextWrapper>
        );
    }
}

interface ImageRef {
    image: string;
    [key: string]: any;
}
async function populateImages(
    objects: Array<ImageRef>
): Promise<Array<ImageRef>> {
    const promises: Array<Promise<string>> = [];
    objects.forEach((g) => {
        promises.push(
            new Promise(async (resolve: (value?: string) => void) => {
                const raw = await fetch(g.image);
                const blob = await raw.blob();
                resolve(URL.createObjectURL(blob));
            })
        );
    });
    const images = await Promise.all(promises);
    return objects.map((g, i) => ({ ...g, imageSrc: images[i] }));
}
