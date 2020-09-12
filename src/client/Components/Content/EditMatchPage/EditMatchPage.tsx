import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { Dropdown, TextField, Datepicker, TextArea } from "ebrap-ui";
import { connectContext } from "../../Context";
import { Conference, Match } from "../../../types/types";

interface Props {
    match: any;
}
export default function EditMatchPage({ match }: Props) {
    const context = connectContext()!;
    const allDivisions = getAllDivision(context.conferences);

    const MatchId = parseInt(match.params.matchId);

    const [selectedGame, setGame] = React.useState("");
    const handleGame = (e: any) => setGame(e);
    const [selectedType, setType] = React.useState("");
    const handleType = (e: any) => setType(e);
    const [selectedDate, setDate] = React.useState(new Date());
    const handleDate = (e: any) => setDate(e);
    const [selectedDivision, setDivision] = React.useState("");
    const handleDivision = (e: any) => setDivision(e);
    const [team1, setTeam1] = React.useState("");
    const handleTeam1 = (e: any) => setTeam1(e);
    const [team2, setTeam2] = React.useState("");
    const handleTeam2 = (e: any) => setTeam2(e);
    const [notes, setNotes] = React.useState("");
    const handleNotes = (e: string) => setNotes(e);

    React.useEffect(() => {
        onMount();
    }, []);
    async function onMount() {
        const { data: matches } = await axios.get("/api/Match", {
            params: { id: MatchId },
        });
        if (matches.length === 0) {
            return window.alert("invalid match");
        }
        const currentMatch: Match = matches[0];
        const {
            GameId,
            DivisionId,
            type,
            date,
            firstTeam,
            secondTeam,
            notes,
        } = currentMatch;

        // Map match to state
        const game = context.games.find((g) => g.id === GameId);
        const division = allDivisions.find((d) => d.id === DivisionId);
        const matchDate = new Date(date);
        let firstTeamName = "";
        if (firstTeam) firstTeamName = firstTeam.name;
        let secondTeamName = "";
        if (secondTeam) secondTeamName = secondTeam.name;

        if (game) setGame(game.name);
        setType(type);
        if (division) setDivision(division.value);
        setDate(matchDate);
        setTeam1(firstTeamName);
        setTeam2(secondTeamName);
        setNotes(notes || "");
    }

    const save = async () => {
        const game = context.games.find((g) => g.name === selectedGame);
        const teamA = context.teams.find((t) => t.name === team1);
        const teamB = context.teams.find((t) => t.name === team2);
        const division = allDivisions.find(
            (d) => d.value === (selectedDivision as any).value
        );
        if (!game) {
            return window.alert("invalid game");
        }
        if (!division) {
            console.log(allDivisions, selectedDivision);
            return window.alert("invalid divsion");
        }

        await axios.delete("/api/TeamMatches", {
            params: { MatchId },
        });
        const request = {
            id: MatchId,
            date: selectedDate,
            type: selectedType,
            notes: notes,
            DivisionId: division.id,
            GameId: game.id,
        };
        const { data: response } = await axios.patch("/api/Match", request);
        if (!response.success) {
            return window.alert("error creating game");
        }
        const request1 = {
            FirstTeamId: teamA ? teamA.id : null,
            SecondTeamId: teamB ? teamB.id : null,
            MatchId: response.id,
        };
        await axios.post("/api/TeamMatches", request1);
        window.alert("Success!");
    };

    return (
        <div>
            <h1>Edit Match</h1>
            <Dropdown
                label={"Game"}
                placeholder={"Select a Game"}
                selected={selectedGame}
                options={context.games.map((g) => g.name)}
                onChange={handleGame}
                botPad
            />
            <br />
            <TextField
                label={"Type of Game"}
                placeholder={"ex: Best of 3"}
                value={selectedType}
                onChange={handleType}
                botPad
            />
            <br />
            <Datepicker
                label={"Date of Game"}
                value={selectedDate}
                onChange={handleDate}
                includeTime
            />
            <br />
            <Dropdown
                label={"Division"}
                placeholder={"Select a Division"}
                selected={selectedDivision}
                options={allDivisions}
                onChange={handleDivision}
                botPad
            />
            <br />
            <Dropdown
                label={"First Team"}
                placeholder={"Select a Team"}
                selected={team1}
                options={context.teams.map((t) => t.name)}
                onChange={handleTeam1}
                botPad
            />
            <Dropdown
                label={"Second Team"}
                placeholder={"Select a Team"}
                selected={team2}
                options={context.teams.map((t) => t.name)}
                onChange={handleTeam2}
                botPad
            />
            <br />
            <TextArea
                label={"Notes"}
                value={notes}
                onChange={handleNotes}
                cols={80}
            />
            <br />
            <Button onClick={save}>Save</Button>
        </div>
    );
}

function getAllDivision(conferences: Array<Conference>): Array<any> {
    const divisions = new Array();
    conferences.forEach((c) => {
        if (!c.subconferences) return;
        c.subconferences.forEach((s) => {
            if (!s.divisions) return;
            s.divisions.forEach((d) => {
                divisions.push({
                    ...d,
                    value: `${c.name} ${s.name} ${d.name}`,
                });
            });
        });
    });
    return divisions;
}
