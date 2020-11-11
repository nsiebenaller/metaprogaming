import React from "react";
import ScoreDial from "./ScoreDial";
import TeamImage from "./TeamImage";

interface Props {
    className: string;
    image?: string;
    nav: () => void;
    orgName: string;
    teamName: string;
    isAdmin: boolean;
    score: number;
    increment: () => void;
    decrement: () => void;
    canCheckIn: boolean;
    checkedIn: boolean;
    toggleCheckIn: () => void;
}
export default function MatchTeam(props: Props) {
    const scoreDial = (
        <ScoreDial
            isAdmin={props.isAdmin}
            score={props.score}
            increment={props.increment}
            decrement={props.decrement}
        />
    );
    const teamImage = (
        <TeamImage image={props.image} checkedIn={props.checkedIn} />
    );

    const firstItem = props.className === "left" ? teamImage : scoreDial;
    const secondItem = (
        <div className={"team-column"} onClick={props.nav}>
            <div className={"team-org"}>{props.orgName}</div>
            <div className={"team-name"}>{props.teamName}</div>
        </div>
    );
    const thirdItem = props.className === "left" ? scoreDial : teamImage;

    return (
        <div>
            <div className={`match-team ${props.className}`}>
                {firstItem}
                {secondItem}
                {thirdItem}
            </div>
            {props.canCheckIn && (
                <div
                    className={`checkin-btn 
                    ${props.checkedIn ? "ready" : "not-ready"}
                    ${props.isAdmin ? "admin" : ""}
                `}
                    onClick={props.toggleCheckIn}
                >
                    {props.checkedIn ? "Ready!" : "Check in Required"}
                </div>
            )}
        </div>
    );
}
