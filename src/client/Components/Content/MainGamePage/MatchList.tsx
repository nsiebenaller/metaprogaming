import React from "react";
import MatchRow from "./MatchRow/MatchRow";
import { ByDate } from "../../../utils/sort";

interface Props {
    matches: Array<Match>;
    loggedIn: boolean;
    loading: boolean;
    changeMatch: (match: Match) => void;
    deleteMatch: (match: Match) => void;
}
export default function MatchList({
    matches,
    loggedIn,
    loading,
    changeMatch,
    deleteMatch,
}: Props) {
    if (loading) {
        return (
            <div className={"match-list"}>
                <div className={"no-matches"}>Loading...</div>
            </div>
        );
    }

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
                    loggedIn={loggedIn}
                    changeMatch={changeMatch}
                    deleteMatch={deleteMatch}
                />
            ))}
        </div>
    );
}
