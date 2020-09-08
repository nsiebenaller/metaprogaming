import React from "react";
import ArrowUp from "@material-ui/icons/ArrowUpward";
import ArrowDown from "@material-ui/icons/ArrowDownward";
import { Team, Side } from "../../../types/types";
import { connectContext } from "../../Context";

interface Props {
    team?: Team;
    score?: number;
    side: Side;
    date?: Date;
    changeScore: (score: number) => void;
}
export default function TeamMatch({
    team,
    score,
    side,
    date,
    changeScore,
}: Props) {
    const context = connectContext()!;

    const increment = () => {
        if (score !== undefined) {
            changeScore(score + 1);
        }
    };
    const decrement = () => {
        if (score !== undefined && score > 0) {
            changeScore(score - 1);
        }
    };

    if (!team)
        return (
            <div className="bracket-match">
                <span>No Team</span>
            </div>
        );

    switch (side) {
        case Side.LEFT:
            return (
                <div className="bracket-group">
                    <div className="arrow-container left">
                        {date && (
                            <div className={"date"}>
                                {new Date(date).toDateString()}
                            </div>
                        )}
                        {context.user && <ArrowUp onClick={increment} />}
                    </div>

                    <div className="bracket-match">
                        <div className="bracket-contents left">
                            <img src={team.image} />
                            <span>{team.name}</span>
                        </div>
                        <div className="score-container">
                            <span className="score">{score || 0}</span>
                        </div>
                    </div>
                    <div className="arrow-container left">
                        {context.user && <ArrowDown onClick={decrement} />}
                    </div>
                </div>
            );
        case Side.RIGHT:
            return (
                <div className="bracket-group">
                    <div className="arrow-container right">
                        {context.user && <ArrowUp onClick={increment} />}
                    </div>
                    <div className="bracket-match">
                        <div className="score-container">
                            <span className="score">{score || 0}</span>
                        </div>
                        <div className="bracket-contents right">
                            <span>{team.name}</span>
                            <img src={team.image} />
                        </div>
                    </div>
                    <div className="arrow-container right">
                        {context.user && <ArrowDown onClick={decrement} />}
                    </div>
                </div>
            );
        default:
            return null;
    }
}
