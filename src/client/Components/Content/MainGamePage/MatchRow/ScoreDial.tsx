import React from "react";
import { Icon } from "ebrap-ui";

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
                        <Icon
                            iconName={"ArrowDropUp"}
                            color={"white"}
                            cursorPointer
                        />
                    </div>
                )}
                <div className={"score"}>{score}</div>
                {isAdmin && (
                    <div className={"dial"} onClick={decrement}>
                        <Icon
                            iconName={"ArrowDropDown"}
                            color={"white"}
                            cursorPointer
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
