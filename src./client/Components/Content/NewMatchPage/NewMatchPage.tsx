import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { Dropdown, TextField, Datepicker, TextArea } from "ebrap-ui";
import { connectContext } from "../../Context";
import { Division, Team } from "../../../types/types";

const gameTypes = ["Best of 1", "Best of 3", "Best of 5", "Best of 7"];
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
    const [notes, setNotes] = React.useState("");
    const handleNotes = (e: string) => setNotes(e);

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
        if (!selectedDivision) {
            return window.alert("invalid conference/division");
        }

        const request = {
            date: selectedDate,
            type: selectedType,
            notes: notes,
            DivisionId: selectedDivision.id,
            GameId: game.id,
        };
        const { data: response } = await axios.post("/api/Match", request);
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

    const allTeams = context.teams.map((t) => t.name);
    allTeams.sort();
    const teamOptions = ["No Team"].concat(allTeams);

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
            <Dropdown
                label={"Type of Game"}
                placeholder={"ex: Best of 3"}
                selected={selectedType}
                options={gameTypes}
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
                options={teamOptions}
                onChange={handleTeam1}
                botPad
            />
            <Dropdown
                label={"Second Team"}
                placeholder={"Select a Team"}
                selected={team2}
                options={teamOptions}
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
            <Button onClick={createMatch}>Create</Button>
        </div>
    );
}
