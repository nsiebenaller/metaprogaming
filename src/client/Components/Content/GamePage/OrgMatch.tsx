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
    team?: Team;
    score?: number;
    side: Side;
    date?: Date;
    changeScore: (score: number) => void;
}
export default function OrgMatch({
    org,
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

    if (!org) return <NoTeamBracket />;

    switch (side) {
        case Side.LEFT:
            return (
                <AwayBracket
                    isAdmin={!!context.user}
                    date={date}
                    organization={org}
                    team={team}
                    score={score || 0}
                    increment={increment}
                    decrement={decrement}
                />
            );
        case Side.RIGHT:
            return (
                <HomeBracket
                    isAdmin={!!context.user}
                    date={date}
                    organization={org}
                    team={team}
                    score={score || 0}
                    increment={increment}
                    decrement={decrement}
                />
            );
        default:
            return null;
    }
}

function NoTeamBracket() {
    return (
        <div className="bracket-group">
            <div className="arrow-container" />
            <div className="bracket-match">
                <span>No Team</span>
            </div>
        </div>
    );
}

interface BracketProps {
    isAdmin: boolean;
    date: Date | undefined;
    organization: Organization;
    team?: Team;
    score: number;
    increment: () => void;
    decrement: () => void;
}
function AwayBracket(props: BracketProps) {
    return (
        <div className="bracket-group">
            <div className="arrow-container left">
                <div className={"date"}>{getDate(props.date)}</div>
                {props.isAdmin && <ArrowUp onClick={props.increment} />}
            </div>

            <div className="bracket-match">
                <div className="bracket-contents left">
                    <img src={props.organization.image} />
                    <div className={"team-name-left"}>
                        <div>{props.organization.name}</div>
                        {props.team && (
                            <div>
                                <b>{props.team.name}</b>
                            </div>
                        )}
                    </div>
                </div>
                <div className="score-container">
                    <span className="score">{props.score}</span>
                </div>
            </div>
            <div className="arrow-container left">
                {props.isAdmin && <ArrowDown onClick={props.decrement} />}
            </div>
        </div>
    );
}
function HomeBracket(props: BracketProps) {
    return (
        <div className="bracket-group">
            <div className="arrow-container right">
                {props.isAdmin && <ArrowUp onClick={props.increment} />}
            </div>
            <div className="bracket-match">
                <div className="score-container">
                    <span className="score">{props.score}</span>
                </div>
                <div className="bracket-contents right">
                    <div className={"team-name-right"}>
                        <div>{props.organization.name}</div>
                        {props.team && (
                            <div>
                                <b>{props.team.name}</b>
                            </div>
                        )}
                    </div>
                    <img src={props.organization.image} />
                </div>
            </div>
            <div className="arrow-container right">
                {props.isAdmin && <ArrowDown onClick={props.decrement} />}
            </div>
        </div>
    );
}

function getDate(date: Date | undefined) {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}
