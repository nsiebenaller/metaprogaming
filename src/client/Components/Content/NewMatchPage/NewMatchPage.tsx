import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { Dropdown, TextField, Datepicker } from "ebrap-ui";
import { connectContext } from "../../Context";

export default function NewMatchPage() {
    const context = connectContext()!;

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

    const createMatch = async () => {
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
            date: selectedDate,
            type: selectedType,
            DivisionId: selectedDivision === "Division 1" ? 1 : 2,
            GameId: game.id,
        };
        const { data: response } = await axios.post("/api/Match", request);
        if (!response.success) {
            return window.alert("error creating game");
        }
        const request1 = {
            TeamId: teamA.id,
            MatchId: response.id,
        };
        await axios.post("/api/TeamMatches", request1);
        const request2 = {
            TeamId: teamB.id,
            MatchId: response.id,
        };
        await axios.post("/api/TeamMatches", request2);
        window.alert("Success!");
    };

    return (
        <div>
            <h1>Create Match</h1>
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
            <Button onClick={createMatch}>Create</Button>
        </div>
    );
}
