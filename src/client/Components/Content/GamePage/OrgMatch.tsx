import React from "react";
import ArrowUp from "@material-ui/icons/ArrowUpward";
import ArrowDown from "@material-ui/icons/ArrowDownward";
import { connectContext } from "../../Context";

enum Side {
    LEFT,
    RIGHT,
}
interface Props {
    org?: Organization;
    score?: number;
    side: Side;
    date?: Date;
    changeScore: (score: number) => void;
}
export default function OrgMatch({
    org,
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

    if (!org)
        return (
            <div className="bracket-group">
                <div className="arrow-container" />
                <div className="bracket-match">
                    <span>No Team</span>
                </div>
            </div>
        );

    switch (side) {
        case Side.LEFT:
            return (
                <div className="bracket-group">
                    <div className="arrow-container left">
                        <div className={"date"}>{getDate(date)}</div>
                        {context.user && <ArrowUp onClick={increment} />}
                    </div>

                    <div className="bracket-match">
                        <div className="bracket-contents left">
                            <img src={org.image} />
                            <span>{org.name}</span>
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
                            <span>{org.name}</span>
                            <img src={org.image} />
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

function getDate(date: Date | undefined) {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}
