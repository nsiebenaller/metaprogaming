import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dropdown } from "ebrap-ui";
import MatchItem from "./MatchItem";
import { Match, Game, Week } from "../../../types/types";
import { connectContext } from "../../Context";
import Axios from "axios";

interface Props {
    selectedDivision: string;
    match: any;
}
export default function GamePage({ selectedDivision, match }: Props) {
    const context = connectContext()!;
    const gameId = parseInt(match.params.gameId);
    const DivisionId = selectedDivision === "Division 1" ? 1 : 2;

    const [matchList, setMatchList] = useState<Array<Match>>([]);
    const [game, setGame] = useState<Game>();
    const [weeks, setWeeks] = useState<Array<any>>([]);
    const [selectedWeek, setSelectedWeek] = useState<any>(null);
    const handleWeek = (value: any) => setSelectedWeek(value);
    const [weekMatches, setWeekMatches] = useState<Array<Match>>([]);
    useEffect(() => {
        // Find Game
        const selectedGame = context.games.find((g) => g.id === gameId);
        setGame(selectedGame);

        fetchMatches();
        fetchWeeks();
    }, [selectedDivision]);

    const fetchMatches = async () => {
        const { data } = await axios.get("/api/GameMatches", {
            params: { GameId: gameId, DivisionId },
        });
        setMatchList(data);
    };
    const fetchWeeks = async () => {
        const { data: weeks } = await Axios.get("/api/Week", {
            params: {
                GameId: gameId,
                DivisionId,
            },
        });
        if (weeks.length > 0) {
            const newWeeks = [{ value: "All" }].concat(
                weeks.map((x: Week) => ({ ...x, value: x.name }))
            );
            setWeeks(newWeeks);
            setSelectedWeek({ ...weeks[0], value: weeks[0].name });
        }
    };
    const changeScore = (match: Match) => {
        setMatchList(matchList.map((m) => (m.id === match.id ? match : m)));
    };

    React.useEffect(() => {
        if (!selectedWeek) return;

        console.log(selectedWeek);
        if (selectedWeek.value === "All") {
            return setWeekMatches(matchList);
        }

        const start = new Date(selectedWeek.start);
        const end = new Date(selectedWeek.end);

        setWeekMatches(
            matchList.filter((match: Match) => {
                if (!match.date) return false;
                const matchTime = new Date(match.date);
                if (
                    start.getTime() < matchTime.getTime() &&
                    end.getTime() > matchTime.getTime()
                ) {
                    return true;
                }
                return false;
            })
        );
    }, [weeks, game, matchList, selectedWeek]);

    weekMatches.sort((a: Match, b: Match) => {
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

            <Dropdown
                placeholder={"No Season"}
                options={weeks}
                selected={selectedWeek}
                onChange={handleWeek}
            />
            {selectedWeek && (
                <div>
                    <span>
                        {new Date(selectedWeek.start).toLocaleDateString()}
                    </span>
                    <span> - to - </span>
                    <span>
                        {new Date(selectedWeek.end).toLocaleDateString()}
                    </span>
                </div>
            )}
            <div className={"match-list"}>
                {weekMatches.length === 0 && <span>no matches scheduled</span>}
                {weekMatches.map((match, idx) => (
                    <MatchItem
                        key={idx}
                        match={match}
                        changeScore={changeScore}
                    />
                ))}
            </div>
        </div>
    );
}
