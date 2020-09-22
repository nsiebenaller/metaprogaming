import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { Dropdown, Datepicker, TextArea } from "ebrap-ui";
import { OptionFormat } from "ebrap-ui/dist/types/types";
import { connectContext } from "../../Context";
import Convert from "../../../utils/convert";

type SelectedGame = Game | undefined;
type SelectedOrg = Organization | undefined;
type SelectedTeam = Team | undefined;
type SelectedDivision = Division | undefined;

const noTeam: Array<OptionFormat> = [{ id: null, value: "No Team" }];
const gameTypes = ["Best of 1", "Best of 3", "Best of 5", "Best of 7"];
interface Props {
    match: any;
}
export default function EditMatchPage({ match }: Props) {
    const context = connectContext()!;

    const allDivisions = getAllDivision(context.conferences);
    const MatchId = parseInt(match.params.matchId);

    const [allOrgs, setAllOrgs] = React.useState<Array<OptionFormat>>([]);
    const [awayTeams, setAwayTeams] = React.useState<Array<OptionFormat>>([]);
    const [homeTeams, setHomeTeams] = React.useState<Array<OptionFormat>>([]);

    const [selectedGame, setGame] = React.useState("");
    const handleGame = (e: any) => setGame(e);
    const [selectedType, setType] = React.useState("");
    const handleType = (e: any) => setType(e);
    const [selectedDate, setDate] = React.useState(new Date());
    const handleDate = (e: any) => setDate(e);
    const [selectedDivision, setDivision] = React.useState<any>(undefined);
    const handleDivision = (e: any) => setDivision(e);

    // Away Org & Team
    const [awayOrg, setAwayOrg] = React.useState<SelectedOrg>();
    const [awayTeam, setAwayTeam] = React.useState<SelectedTeam>();
    const handleAwayOrg = (option: OptionFormat) => {
        const org = Convert.toOrganization(option);
        const teams = org.teams || new Array();
        teams.sort(ByName);
        setAwayTeams(noTeam.concat(Convert.toOptionFormat(teams)));
        setAwayOrg(org);
    };
    const handleAwayTeam = (option: OptionFormat) => {
        setAwayTeam(Convert.toTeam(option));
    };

    // Home Org & Team
    const [homeOrg, setHomeOrg] = React.useState<SelectedOrg>();
    const [homeTeam, setHomeTeam] = React.useState<SelectedTeam>();
    const handleHomeOrg = (option: OptionFormat) => {
        const org = Convert.toOrganization(option);
        const teams = org.teams || new Array();
        teams.sort(ByName);
        setHomeTeams(noTeam.concat(Convert.toOptionFormat(teams)));
        setHomeOrg(org);
    };
    const handleHomeTeam = (option: OptionFormat) => {
        setHomeTeam(Convert.toTeam(option));
    };

    const [notes, setNotes] = React.useState("");
    const handleNotes = (e: string) => setNotes(e);

    React.useEffect(() => {
        onMount();
    }, []);
    async function onMount() {
        context.organizations.sort(ByName);
        const orgs = Convert.toOptionFormat(context.organizations);
        setAllOrgs(noTeam.concat(orgs));

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
            awayTeam,
            homeTeam,
            notes,
        } = currentMatch;

        // Map match to state
        const game = context.games.find((g) => g.id === GameId);
        const division = allDivisions.find((d) => d.id === DivisionId);
        const matchDate = new Date(date);

        if (game) setGame(game.name);
        setType(type);
        if (division) setDivision(division);
        setDate(matchDate);
        if (awayOrg) {
            setAwayOrg(awayOrg);
            const teams = awayOrg?.teams || new Array();
            teams.sort(ByName);
            setAwayTeams(noTeam.concat(Convert.toOptionFormat(teams)));
        }
        if (awayTeam) {
            setAwayTeam(awayTeam);
        }
        if (homeOrg) {
            setHomeOrg(homeOrg);
            const teams = awayOrg?.teams || new Array();
            teams.sort(ByName);
            setHomeTeams(noTeam.concat(Convert.toOptionFormat(teams)));
        }
        if (homeTeam) {
            setHomeTeam(homeTeam);
        }

        setNotes(notes || "");
    }

    const save = async () => {
        const game = context.games.find((g) => g.name === selectedGame);
        const AwayOrganizationId = awayOrg ? awayOrg.id : null;
        const HomeOrganizationId = homeOrg ? homeOrg.id : null;
        const AwayTeamId = awayTeam ? awayTeam.id : null;
        const HomeTeamId = homeTeam ? homeTeam.id : null;
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
            AwayOrganizationId,
            HomeOrganizationId,
            AwayTeamId,
            HomeTeamId,
            DivisionId: selectedDivision.id,
            GameId: game.id,
        };
        const { data: response } = await axios.patch("/api/Match", request);
        if (!response.success) {
            return window.alert("error creating game");
        }
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
                selected={awayOrg?.name}
                options={allOrgs}
                onChange={handleAwayOrg}
                botPad
            />
            <Dropdown
                label={"Away Team"}
                placeholder={"Select a Team"}
                selected={awayTeam?.name}
                options={awayTeams}
                onChange={handleAwayTeam}
                noOptionsText={"No Teams"}
                botPad
            />
            <br />
            <Dropdown
                label={"Home Organization"}
                placeholder={"Select a Organization"}
                selected={homeOrg?.name}
                options={allOrgs}
                onChange={handleHomeOrg}
                botPad
            />
            <Dropdown
                label={"Home Team"}
                placeholder={"Select a Team"}
                selected={homeTeam?.name}
                options={homeTeams}
                onChange={handleHomeTeam}
                noOptionsText={"No Teams"}
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

type Named = Organization | Team;
function ByName(a: Named, b: Named): number {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
}
