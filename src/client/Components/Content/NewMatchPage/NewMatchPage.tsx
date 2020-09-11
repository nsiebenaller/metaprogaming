import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { Dropdown, TextField, Datepicker } from "ebrap-ui";
import { connectContext } from "../../Context";
import { Division, Team } from "../../../types/types";

export default function NewMatchPage() {
    const context = connectContext()!;

    const [selectedGame, setGame] = React.useState("");
    const handleGame = (e: any) => setGame(e);
    const [selectedType, setType] = React.useState("");
    const handleType = (e: any) => setType(e);
    const [selectedDate, setDate] = React.useState(new Date());
    const handleDate = (e: any) => setDate(e);
    const [selectedDivision, setDivision] = React.useState<any>(undefined);
    const handleDivision = (e: any) => setDivision(e);
    const [team1, setTeam1] = React.useState("");
    const handleTeam1 = (e: any) => setTeam1(e);
    const [team2, setTeam2] = React.useState("");
    const handleTeam2 = (e: any) => setTeam2(e);
    const [divisions, setDivisions] = React.useState(new Array());

    React.useEffect(() => {
        const divs = new Array();
        context.conferences.forEach((c) => {
            if (!c.subconferences) return;
            c.subconferences.forEach((s) => {
                if (!s.divisions) return;
                s.divisions.forEach((d) => {
                    divs.push({ ...d, value: `${c.name} ${s.name} ${d.name}` });
                });
            });
        });
        setDivisions(divs);
    }, [context.conferences]);

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
        if (!selectedDivision) {
            return window.alert("invalid conference/division");
        }
        let DivisionId = null;
        if (selectedDivision) {
            DivisionId = selectedDivision.id;
        }

        const request = {
            date: selectedDate,
            type: selectedType,
            DivisionId,
            GameId: game.id,
        };
        const { data: response } = await axios.post("/api/Match", request);
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

    const allTeams = context.teams.map((t) => t.name);
    allTeams.sort();

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
                label={"Conference / Division"}
                placeholder={"Select One"}
                selected={selectedDivision}
                options={divisions}
                onChange={handleDivision}
                botPad
            />
            <br />
            <Dropdown
                label={"First Team"}
                placeholder={"Select a Team"}
                selected={team1}
                options={allTeams}
                onChange={handleTeam1}
                botPad
            />
            <Dropdown
                label={"Second Team"}
                placeholder={"Select a Team"}
                selected={team2}
                options={allTeams}
                onChange={handleTeam2}
                botPad
            />
            <br />
            <Button onClick={createMatch}>Create</Button>
        </div>
    );
}
