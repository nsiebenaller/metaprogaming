import React from "react";
import ArrowUp from "@material-ui/icons/ArrowUpward";
import ArrowDown from "@material-ui/icons/ArrowDownward";
import { Button, command } from "ebrap-ui";
import * as Util from "../../../utils/file";
import { connectRouter } from "../../Context";

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

    const awayOrgName = match?.awayOrg?.name || "No Team";
    const awayTeamName = match?.awayTeam?.name;
    const awayImage = match?.awayOrg?.image;
    const awayScore = match?.firstTeamScore || 0;
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
    const incrementHome = () => {
        changeMatch({ ...match, secondTeamScore: homeScore + 1 });
    };
    const decrementHome = () => {
        if (homeScore === 0) return;
        changeMatch({ ...match, secondTeamScore: homeScore - 1 });
    };

    const handleEdit = () => {
        router.history.push(`/Match/edit/${match.id}`);
    };
    const handleDelete = async () => {
        const confirm = await command.confirm(
            "Are you sure you want to delete this match?"
        );
        if (confirm) {
            deleteMatch(match);
        }
    };

    return (
        <div className={"row-container"}>
            <div className={"match-row-container"}>
                <div className={"match-date"}>{date}</div>
                <div className={"match-row"}>
                    <div className={"match-team left"}>
                        <TeamImage image={awayImage} />
                        <div className={"team-column"}>
                            <div>{awayOrgName}</div>
                            <div className={"team-name"}>{awayTeamName}</div>
                        </div>
                        <ScoreDial
                            isAdmin={isAdmin}
                            score={awayScore}
                            increment={incrementAway}
                            decrement={decrementAway}
                        />
                    </div>
                    <div className={"vs"}>- vs -</div>
                    <div className={"match-team right"}>
                        <ScoreDial
                            isAdmin={isAdmin}
                            score={homeScore}
                            increment={incrementHome}
                            decrement={decrementHome}
                        />
                        <div className={"team-column"}>
                            <div>{homeOrgName}</div>
                            <div>{homeTeamName}</div>
                        </div>
                        <TeamImage image={homeImage} />
                    </div>
                </div>
                <div className="notes-section">
                    {match.notes || "- no notes -"}
                </div>
            </div>
            {isAdmin && (
                <div className={"button-container"}>
                    <Button
                        variant={"outlined"}
                        color={"blue"}
                        onClick={handleEdit}
                    >
                        Edit
                    </Button>
                    <Button
                        variant={"outlined"}
                        color={"red"}
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
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

interface TeamImageProps {
    image?: string;
}
function TeamImage({ image }: TeamImageProps) {
    if (!image) return null;
    return <img className={"team-img"} src={`${Util.Bucket}${image}`} />;
}

interface ScoreDialProps {
    isAdmin: boolean;
    score: number;
    increment: () => void;
    decrement: () => void;
}
function ScoreDial({ isAdmin, score, increment, decrement }: ScoreDialProps) {
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
