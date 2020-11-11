import React from "react";
import { command } from "ebrap-ui";
import { connectRouter } from "../../../Context";
import MatchTeam from "./MatchTeam";

interface MatchRowProps {
    match: Match;
    isAdmin: boolean;
    changeMatch: (match: Match) => void;
    deleteMatch: (match: Match) => void;
}
export default function MatchRow({
    match,
    isAdmin,
    changeMatch,
    deleteMatch,
}: MatchRowProps) {
    const router = connectRouter()!;
    const date = getDate(match.date);
    const checkInAllowed = canCheckIn(match.date);

    const awayOrgName = match?.awayOrg?.name || "No Team";
    const awayTeamName = match?.awayTeam?.name;
    const awayImage = match?.awayOrg?.image;
    const awayScore = match?.firstTeamScore || 0;
    const awayCheckedIn = !!match?.awayCheckedIn;
    const incrementAway = () => {
        changeMatch({ ...match, firstTeamScore: awayScore + 1 });
    };
    const decrementAway = () => {
        if (awayScore === 0) return;
        changeMatch({ ...match, firstTeamScore: awayScore - 1 });
    };

    const homeOrgName = match?.homeOrg?.name || "No Team";
    const homeTeamName = match?.homeTeam?.name;
    const homeImage = match?.homeOrg?.image;
    const homeScore = match?.secondTeamScore || 0;
    const homeCheckedIn = !!match?.homeCheckedIn;
    const incrementHome = () => {
        changeMatch({ ...match, secondTeamScore: homeScore + 1 });
    };
    const decrementHome = () => {
        if (homeScore === 0) return;
        changeMatch({ ...match, secondTeamScore: homeScore - 1 });
    };

    const handleEdit = () => {
        router.history.push(`/Admin/Match/edit/${match.id}`);
    };
    const handleDelete = async () => {
        const confirm = await command.confirm(
            "Are you sure you want to delete this match?"
        );
        if (confirm) {
            deleteMatch(match);
        }
    };
    const navAway = () => {
        const id = match?.awayOrg?.id;
        if (!id) return;
        if (isAdmin) {
            router.history.push(`/Organization/edit/${id}`);
        } else {
            router.history.push(`/Organization/${id}`);
        }
    };
    const navHome = () => {
        const id = match?.homeOrg?.id;
        if (!id) return;
        if (isAdmin) {
            router.history.push(`/Organization/edit/${id}`);
        } else {
            router.history.push(`/Organization/${id}`);
        }
    };
    const toggleAway = () => {
        if (!isAdmin) return;
        changeMatch({ ...match, awayCheckedIn: !awayCheckedIn });
    };
    const toggleHome = () => {
        if (!isAdmin) return;
        changeMatch({ ...match, homeCheckedIn: !homeCheckedIn });
    };

    return (
        <div className={"row-container"}>
            <div className={"match-row-container"}>
                <div className={"match-date"}>{date}</div>
                <div className={"match-row"}>
                    <MatchTeam
                        className={"left"}
                        isAdmin={isAdmin}
                        nav={navAway}
                        orgName={awayOrgName}
                        teamName={awayTeamName}
                        score={awayScore}
                        image={awayImage}
                        increment={incrementAway}
                        decrement={decrementAway}
                        checkedIn={awayCheckedIn}
                        toggleCheckIn={toggleAway}
                        canCheckIn={checkInAllowed}
                    />
                    <div className={"vs"}>- vs -</div>
                    <MatchTeam
                        className={"right"}
                        isAdmin={isAdmin}
                        nav={navHome}
                        orgName={homeOrgName}
                        teamName={homeTeamName}
                        score={homeScore}
                        image={homeImage}
                        increment={incrementHome}
                        decrement={decrementHome}
                        checkedIn={homeCheckedIn}
                        toggleCheckIn={toggleHome}
                        canCheckIn={checkInAllowed}
                    />
                </div>
                <div className="notes-section">{match.notes}</div>
            </div>
            {isAdmin && (
                <div className={"button-container"}>
                    <button className={"outline-btn"} onClick={handleEdit}>
                        Edit
                    </button>
                    <button className={"outline-btn"} onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            )}
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

const ONE_MIN = 60 * 1000;
const MIN_30 = 30 * ONE_MIN;
function canCheckIn(date: Date | undefined): boolean {
    let matchTime = 0;
    let now = new Date().getTime();
    if (date) {
        matchTime = new Date(date).getTime();
    } else {
        matchTime = now;
    }
    const before = matchTime - MIN_30;
    const after = matchTime + MIN_30;
    return before < now && now < after;
}
