import React from "react";
import ArrowUp from "@material-ui/icons/ArrowUpward";
import ArrowDown from "@material-ui/icons/ArrowDownward";

interface ScoreDialProps {
    isAdmin: boolean;
    score: number;
    increment: () => void;
    decrement: () => void;
}
export default function ScoreDial({
    isAdmin,
    score,
    increment,
    decrement,
}: ScoreDialProps) {
    return (
        <div className={"team-score"}>
            <div className={"score-container"}>
                {isAdmin && (
                    <div className={"dial"} onClick={increment}>
                        <ArrowUp />
                    </div>
                )}
                <div className={"score"}>{score}</div>
                {isAdmin && (
                    <div className={"dial"} onClick={decrement}>
                        <ArrowDown />
                    </div>
                )}
            </div>
        </div>
    );
}
