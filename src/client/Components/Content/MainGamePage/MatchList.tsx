import React from "react";
import MatchRow from "./MatchRow";
import { ByDate } from "../../../utils/sort";

interface Props {
    matches: Array<Match>;
    isAdmin: boolean;
    changeMatch: (match: Match) => void;
    deleteMatch: (match: Match) => void;
}
export default function MatchList({
    matches,
    isAdmin,
    changeMatch,
    deleteMatch,
}: Props) {
    matches.sort(ByDate);
    return (
        <div className={"match-list"}>
            {matches.length === 0 && (
                <div className={"no-matches"}>No Matches Scheduled</div>
            )}
            {matches.map((match, idx) => (
                <MatchRow
                    key={idx}
                    match={match}
                    isAdmin={isAdmin}
                    changeMatch={changeMatch}
                    deleteMatch={deleteMatch}
                />
            ))}
        </div>
    );
}
