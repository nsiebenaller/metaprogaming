import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { Dropdown, TextField, Datepicker } from "ebrap-ui";
import { connectContext } from "../../Context";

interface Props {
    match: any;
}
export default function EditMatchPage({ match }: Props) {
    const context = connectContext()!;

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
        const currentMatch = matches[0];

        // Map match to state
        const game = context.games.find((g) => g.id === currentMatch.GameId);
        const type = currentMatch.type;
        const division =
            currentMatch.DivisionId === 1 ? "Division 1" : "Division 2";
        const date = new Date(currentMatch.date);
        const team1 = currentMatch.firstTeam ? currentMatch.firstTeam.name : "";
        const team2 = currentMatch.secondTeam
            ? currentMatch.secondTeam.name
            : "";

        if (game) setGame(game.name);
        setType(type);
        setDivision(division);
        setDate(date);
        setTeam1(team1);
        setTeam2(team2);
    }

    const save = async () => {
        await axios.delete("/api/TeamMatches", {
            params: { MatchId },
        });
        const game = context.games.find((g) => g.name === selectedGame);
        const teamA = context.teams.find((t) => t.name === team1);
        const teamB = context.teams.find((t) => t.name === team2);
        if (!game) {
            return window.alert("invalid game");
        }
        if (!teamA || !teamB) {
            return window.alert("invalid team(s)");
        }

        const request = {
            id: MatchId,
            date: selectedDate,
            type: selectedType,
            DivisionId: selectedDivision === "Division 1" ? 1 : 2,
            GameId: game.id,
        };
        const { data: response } = await axios.patch("/api/Match", request);
        if (!response.success) {
            return window.alert("error creating game");
        }
        const request1 = {
            FirstTeamId: teamA.id,
            SecondTeamId: teamB.id,
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
                options={["Division 1", "Division 2"]}
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
            <Button onClick={save}>Save</Button>
        </div>
    );
}
