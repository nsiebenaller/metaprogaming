import React from "react";
import Button from "@material-ui/core/Button";
import { Match } from "../../../types/types";
import TeamMatch from "./TeamMatch";
import { connectContext } from "../../Context";

interface Props {
    match: Match;
}
export default function MatchItem({ match }: Props) {
    const context = connectContext()!;

    const editMatch = () => context.history.push(`/Match/edit/${match.id}`);

    return (
        <div className="bracket-container">
            <div className={"date"}>{new Date(match.date).toDateString()}</div>
            <div className="bracket">
                <TeamMatch team={match.teams[0]} />
                <div className="bracket-divider">- vs -</div>
                <TeamMatch team={match.teams[1]} />
                {context.user && (
                    <Button onClick={editMatch}>Edit Match</Button>
                )}
            </div>
        </div>
    );
}
