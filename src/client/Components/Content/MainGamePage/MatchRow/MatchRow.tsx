import React from "react";
import { command } from "ebrap-ui";
import { connectContext, connectRouter } from "../../../../Store/Store";
import MatchTeam from "./MatchTeam";
import * as Sec from "../../../../utils/security";

interface MatchRowProps {
    match: Match;
    loggedIn: boolean;
    changeMatch: (match: Match) => void;
    deleteMatch: (match: Match) => void;
}
export default function MatchRow({
    match,
    loggedIn,
    changeMatch,
    deleteMatch,
}: MatchRowProps) {
    const { user } = connectContext();
    const router = connectRouter()!;
    const date = getDate(match.date);

    const [awayTeamRep, setAwayTeamRep] = React.useState<boolean>(false);
    const [homeTeamRep, setHomeTeamRep] = React.useState<boolean>(false);
    React.useEffect(() => {
        const gameId = match?.GameId || -1;
        const awayOrgId = match?.awayOrg?.id || -1;
        const homeOrgId = match?.homeOrg?.id || -1;
        setAwayTeamRep(isRep(awayOrgId, gameId, user));
        setHomeTeamRep(isRep(homeOrgId, gameId, user));
    }, [user]);
    const awayTeamCheckIn = canCheckIn(match.date) && awayTeamRep;
    const homeTeamCheckIn = canCheckIn(match.date) && homeTeamRep;

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
        router.navigate(`/Admin/Match/edit/${match.id}`);
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
        const isDirector = Sec.isOrgDirector(id, user);
        const isCoach = Sec.isOrgCoach(id, user);
        const isAdmin = Sec.isAdmin(user);

        if (isDirector || isCoach || isAdmin) {
            router.navigate(`/Organization/edit/${id}`);
        } else {
            router.navigate(`/Organization/${id}`);
        }
    };
    const navHome = () => {
        const id = match?.homeOrg?.id;
        if (!id) return;
        const isDirector = Sec.isOrgDirector(id, user);
        const isCoach = Sec.isOrgCoach(id, user);
        const isAdmin = Sec.isAdmin(user);
        if (isDirector || isCoach || isAdmin) {
            router.navigate(`/Organization/edit/${id}`);
        } else {
            router.navigate(`/Organization/${id}`);
        }
    };
    const toggleAway = () => {
        if (!loggedIn) return;
        changeMatch({ ...match, awayCheckedIn: !awayCheckedIn });
    };
    const toggleHome = () => {
        if (!loggedIn) return;
        changeMatch({ ...match, homeCheckedIn: !homeCheckedIn });
    };

    return (
        <div className={"row-container"}>
            <div className={"match-row-container"}>
                <div className={"match-date"}>{date}</div>
                <div className={"match-row"}>
                    <MatchTeam
                        className={"left"}
                        isAdmin={awayTeamRep}
                        nav={navAway}
                        orgName={awayOrgName}
                        teamName={awayTeamName}
                        score={awayScore}
                        image={awayImage}
                        increment={incrementAway}
                        decrement={decrementAway}
                        checkedIn={awayCheckedIn}
                        toggleCheckIn={toggleAway}
                        canCheckIn={awayTeamCheckIn}
                    />
                    <div className={"vs"}>- vs -</div>
                    <MatchTeam
                        className={"right"}
                        isAdmin={homeTeamRep}
                        nav={navHome}
                        orgName={homeOrgName}
                        teamName={homeTeamName}
                        score={homeScore}
                        image={homeImage}
                        increment={incrementHome}
                        decrement={decrementHome}
                        checkedIn={homeCheckedIn}
                        toggleCheckIn={toggleHome}
                        canCheckIn={homeTeamCheckIn}
                    />
                </div>
                <div className="notes-section">{match.notes}</div>
            </div>
            {Sec.isAdmin(user) && (
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
        timeZoneName: "short",
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

function isRep(orgId: number, gameId: number, user?: User) {
    if (!user) {
        return false;
    }
    if (Sec.isAdmin(user)) {
        return true;
    }
    if (Sec.isOrgDirector(orgId, user)) {
        return true;
    }
    if (Sec.isOrgGameCoach(orgId, gameId, user)) {
        return true;
    }
    if (Sec.isOrgCaptain(orgId, user)) {
        return true;
    }
    return false;
}
