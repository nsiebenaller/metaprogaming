import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { Dropdown, Datepicker, TextArea } from "ebrap-ui";
import { connectContext } from "../../Context";

const gameTypes = ["Best of 1", "Best of 3", "Best of 5", "Best of 7"];
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
    const [selectedDivision, setDivision] = React.useState<any>(undefined);
    const handleDivision = (e: any) => setDivision(e);
    const [awayOrg, setAwayOrg] = React.useState("");
    const handleAwayOrg = (e: any) => setAwayOrg(e);
    const [homeOrg, setHomeOrg] = React.useState("");
    const handleHomeOrg = (e: any) => setHomeOrg(e);
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
            awayOrg,
            homeOrg,
            notes,
        } = currentMatch;

        // Map match to state
        const game = context.games.find((g) => g.id === GameId);
        const division = allDivisions.find((d) => d.id === DivisionId);
        const matchDate = new Date(date);
        let awayOrgName = "";
        if (awayOrg) awayOrgName = awayOrg.name;
        let homeOrgName = "";
        if (homeOrg) homeOrgName = homeOrg.name;

        if (game) setGame(game.name);
        setType(type);
        if (division) setDivision(division.value);
        setDate(matchDate);
        setAwayOrg(awayOrgName);
        setHomeOrg(homeOrgName);
        setNotes(notes || "");
    }

    const save = async () => {
        const game = context.games.find((g) => g.name === selectedGame);
        const away = context.organizations.find((t) => t.name === awayOrg);
        const home = context.organizations.find((t) => t.name === homeOrg);
        if (!game) {
            return window.alert("invalid game");
        }
        if (!selectedDivision) {
            return window.alert("invalid conference/division");
        }

        await axios.delete("/api/OrganizationMatches", {
            params: { MatchId },
        });
        const request = {
            id: MatchId,
            date: selectedDate,
            type: selectedType,
            notes: notes,
            DivisionId: selectedDivision.id,
            GameId: game.id,
        };
        const { data: response } = await axios.patch("/api/Match", request);
        if (!response.success) {
            return window.alert("error creating game");
        }
        const request1 = {
            AwayOrganizationId: away ? away.id : null,
            HomeOrganizationId: home ? home.id : null,
            MatchId: response.id,
        };
        await axios.post("/api/OrganizationMatches", request1);
        window.alert("Success!");
    };

    const allTeams = context.organizations.map((t) => t.name);
    allTeams.sort();
    const teamOptions = ["No Team"].concat(allTeams);

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
                label={"Division"}
                placeholder={"Select a Division"}
                selected={selectedDivision}
                options={allDivisions}
                onChange={handleDivision}
                botPad
            />
            <br />
            <Dropdown
                label={"Away Organization"}
                placeholder={"Select a Organization"}
                selected={awayOrg}
                options={teamOptions}
                onChange={handleAwayOrg}
                botPad
            />
            <br />
            <Dropdown
                label={"Home Organization"}
                placeholder={"Select a Organization"}
                selected={homeOrg}
                options={teamOptions}
                onChange={handleHomeOrg}
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
