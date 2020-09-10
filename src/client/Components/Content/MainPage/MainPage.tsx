import React from "react";
import GameImage from "./GameImage";
import TeamImage from "./TeamImage";
import { Game, Team, SubConference } from "../../../types/types";
import { connectContext } from "../../Context";
import { sortByName } from "../../../utils/sort";

interface Props {}
export default function MainPage(props: Props) {
    const context = connectContext()!;
    const { games, teams, selectedDivision, selectedSubConference } = context;

    const selectedTeams = getSelectedTeams(selectedSubConference, teams);
    selectedTeams.sort(sortByName);
    return (
        <div>
            <h1>{selectedDivision && selectedDivision.name}</h1>
            <div className={"games"}>
                {games.map((game: Game, idx: number) => (
                    <GameImage key={idx} game={game} />
                ))}
            </div>
            <div>
                <h1>Teams</h1>
                <div className={"teams"}>
                    {selectedTeams.map((team: Team, idx: number) => (
                        <TeamImage key={idx} team={team} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function getSelectedTeams(
    subconference: SubConference | undefined,
    allTeams: Array<Team>
): Array<Team> {
    if (!subconference || !subconference.teams) return new Array<Team>();
    const ids = subconference.teams.map((x) => x.id);
    return allTeams.filter((x) => ids.includes(x.id));
}
