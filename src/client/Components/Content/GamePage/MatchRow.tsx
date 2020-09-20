import React from "react";
import Button from "@material-ui/core/Button";
import OrgMatch from "./OrgMatch";
import { connectContext } from "../../Context";
import axios from "axios";

enum Side {
    LEFT,
    RIGHT,
}
interface Props {
    match: Match;
    changeScore: (match: Match) => void;
    deleteMatch: (id: number) => void;
}
export default function MatchRow({ match, changeScore, deleteMatch }: Props) {
    const context = connectContext()!;

    const editMatch = () => context.history.push(`/Match/edit/${match.id}`);
    const handleDelete = () => deleteMatch(match.id);

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
                <OrgMatch
                    org={match.awayOrg}
                    team={match.awayTeam}
                    score={match.firstTeamScore}
                    side={Side.LEFT}
                    date={match.date}
                    changeScore={changeFirstTeamScore}
                />
                <div className="bracket-divider">- vs -</div>
                <OrgMatch
                    org={match.homeOrg}
                    team={match.homeTeam}
                    score={match.secondTeamScore}
                    side={Side.RIGHT}
                    changeScore={changeSecondTeamScore}
                />
                <div className="notes-section">
                    {match.notes || "- no notes -"}
                </div>
                {context.user && (
                    <div className="btn-container">
                        <Button onClick={editMatch}>Edit Match</Button>
                    </div>
                )}
                {context.user && (
                    <div className="btn-container">
                        <Button onClick={handleDelete}>Delete Match</Button>
                    </div>
                )}
            </div>
        </div>
    );
}
