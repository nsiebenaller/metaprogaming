import React from "react";
import GameImage from "./GameImage";
import TeamImage from "./TeamImage";
import { Game, Team } from "../../../types/types";
import { connectContext } from "../../Context";

interface Props {
    selectedDivision: string;
}
export default function MainPage({ selectedDivision }: Props) {
    const context = connectContext()!;
    const { games, teams } = context;
    return (
        <div>
            <h1>{selectedDivision}</h1>
            <div className={"games"}>
                {games.map((game: Game, idx: number) => (
                    <GameImage key={idx} game={game} />
                ))}
            </div>
            <div>
                <h1>Teams</h1>
                <div className={"teams"}>
                    {teams.map((team: Team, idx: number) => (
                        <TeamImage key={idx} team={team} />
                    ))}
                </div>
            </div>
        </div>
    );
}
