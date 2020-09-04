import React, { useState, useEffect } from "react";
import MatchItem from "./MatchItem";
import { Match } from "../../../types/types";
import { matches } from "../../../static/index";
import { connectContext } from "../../Context";

interface Props {
    selectedDivision: string;
    match: any;
}
export default function GamePage({ selectedDivision, match }: Props) {
    const context = connectContext()!;
    const { game } = match.params;

    const [matchList, setMatchList] = useState<Array<Match>>([]);
    useEffect(() => {
        setMatchList(matches);
    }, []);

    return (
        <div className={"game-page"}>
            <div className={"game-title"}>{game}</div>
            <div className={"game-division"}>{selectedDivision}</div>
            {/*<!-- -->*/}
            <div className={"match-title"}>MATCH SCHEDULE</div>
            <div className={"match-list"}>
                {matchList.map((match, idx) => (
                    <MatchItem key={idx} match={match} />
                ))}
            </div>
        </div>
    );
}
