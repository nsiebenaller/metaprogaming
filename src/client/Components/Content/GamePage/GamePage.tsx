import React, { useState, useEffect } from "react";
import axios from "axios";
import MatchItem from "./MatchItem";
import { Match, Game } from "../../../types/types";
import { connectContext } from "../../Context";

interface Props {
    selectedDivision: string;
    match: any;
}
export default function GamePage({ selectedDivision, match }: Props) {
    const context = connectContext()!;
    const gameId = parseInt(match.params.gameId);

    const [matchList, setMatchList] = useState<Array<Match>>([]);
    const [game, setGame] = useState<Game>();
    useEffect(() => {
        // Find Game
        const selectedGame = context.games.find((g) => g.id === gameId);
        setGame(selectedGame);

        // Find matches for game
        const DivisionId = selectedDivision === "Division 1" ? 1 : 2;
        axios
            .get("/api/GameMatches", {
                params: { GameId: gameId, DivisionId },
            })
            .then(({ data }) => {
                setMatchList(data);
            });
    }, []);

    matchList.sort((a: Match, b: Match) => {
        const aD = new Date(a.date);
        const bD = new Date(b.date);
        return aD.getTime() - bD.getTime();
    });

    return (
        <div className={"game-page"}>
            <div className={"game-title"}>{game ? game.name : ""}</div>
            <div className={"game-division"}>{selectedDivision}</div>
            {/*<!-- -->*/}
            <div className={"match-title"}>MATCH SCHEDULE</div>
            <div className={"match-list"}>
                {matchList.length === 0 && <span>no matches scheduled</span>}
                {matchList.map((match, idx) => (
                    <MatchItem key={idx} match={match} />
                ))}
            </div>
        </div>
    );
}
