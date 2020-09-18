import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dropdown } from "ebrap-ui";
import MatchItem from "./MatchItem";
import { connectContext } from "../../Context";
import Axios from "axios";

interface Props {
    match: any;
}
export default function GamePage({ match }: Props) {
    const context = connectContext()!;
    const { selectedDivision } = context;
    const gameId = parseInt(match.params.gameId);
    const DivisionId = (selectedDivision && selectedDivision.id) || null;

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
        if (!gameId || !DivisionId) return;
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
            weeks.sort(sortByDate);
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
    const deleteMatch = async (id: number) => {
        await axios.delete("/api/Match", { params: { id } });
        fetchMatches();
    };

    React.useEffect(() => {
        if (!selectedWeek || selectedWeek.value === "All") {
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
    }, [weeks, game, matchList, selectedWeek, selectedDivision]);

    weekMatches.sort((a: Match, b: Match) => {
        const aD = new Date(a.date);
        const bD = new Date(b.date);
        return aD.getTime() - bD.getTime();
    });

    let startDate = undefined;
    if (selectedWeek && selectedWeek.start) {
        startDate = getDate(selectedWeek.start);
    }
    let endDate = undefined;
    if (selectedWeek && selectedWeek.end) {
        endDate = getDate(selectedWeek.end);
    }

    return (
        <div className={"game-page"}>
            <div className={"game-title"}>{game ? game.name : ""}</div>
            <div className={"game-division"}>
                {selectedDivision && selectedDivision.name}
            </div>
            {/*<!-- -->*/}
            <div className={"match-title"}>MATCH SCHEDULE</div>

            <div className={"flex-row --right-pad-10 --vert-center"}>
                <Dropdown
                    placeholder={"No Season"}
                    options={weeks}
                    selected={selectedWeek}
                    onChange={handleWeek}
                    disabled={weeks.length === 0}
                />
                {selectedWeek && startDate && endDate && (
                    <div>
                        <span>{startDate}</span>
                        <span> - to - </span>
                        <span>{endDate}</span>
                    </div>
                )}
            </div>
            <div className={"match-list"}>
                {weekMatches.length === 0 && <span>no matches scheduled</span>}
                {weekMatches.map((match, idx) => (
                    <MatchItem
                        key={idx}
                        match={match}
                        changeScore={changeScore}
                        deleteMatch={deleteMatch}
                    />
                ))}
            </div>
        </div>
    );
}

function sortByDate(a: Week, b: Week) {
    const aT = new Date(a.start).getTime();
    const bT = new Date(b.start).getTime();

    if (aT < bT) return -1;
    if (aT > bT) return 1;
    return 0;
}

function getDate(date: string): string | undefined {
    if (!date) return undefined;
    return new Date(date).toLocaleDateString();
}
