import React from "react";
import Button from "@material-ui/core/Button";
import { Match, Side } from "../../../types/types";
import TeamMatch from "./TeamMatch";
import { connectContext } from "../../Context";
import axios from "axios";

interface Props {
    match: Match;
    changeScore: (match: Match) => void;
}
export default function MatchItem({ match, changeScore }: Props) {
    const context = connectContext()!;

    const editMatch = () => context.history.push(`/Match/edit/${match.id}`);

    const changeFirstTeamScore = async (score: number) => {
        changeScore({ ...match, firstTeamScore: score });
        await axios.patch("/api/Match", {
            id: match.id,
            firstTeamScore: score,
        });
    };
    const changeSecondTeamScore = async (score: number) => {
        changeScore({ ...match, secondTeamScore: score });
        await axios.patch("/api/Match", {
            id: match.id,
            secondTeamScore: score,
        });
    };

    return (
        <div className="bracket-container">
            <div className="bracket">
                <TeamMatch
                    team={match.firstTeam}
                    score={match.firstTeamScore}
                    side={Side.LEFT}
                    date={match.date}
                    changeScore={changeFirstTeamScore}
                />
                <div className="bracket-divider">- vs -</div>
                <TeamMatch
                    team={match.secondTeam}
                    score={match.secondTeamScore}
                    side={Side.RIGHT}
                    changeScore={changeSecondTeamScore}
                />
                {context.user && (
                    <Button onClick={editMatch}>Edit Match</Button>
                )}
            </div>
        </div>
    );
}
