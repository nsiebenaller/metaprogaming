import React from "react";
import { Match } from "../../../types/types";

interface Props {
    match: Match;
}
export default function MatchItem({ match }: Props) {
    return (
        <div className="bracket-container">
            <div className={"date"}>{match.date.toDateString()}</div>
            <div className="bracket">
                <div className="bracket-left">{match.teams[0].name}</div>
                <div className="bracket-divider">- vs -</div>
                <div className="bracket-right">{match.teams[1].name}</div>
            </div>
        </div>
    );
}
