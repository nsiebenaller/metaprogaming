import React, { useState } from "react";
import axios from "axios";
import { Dropdown, Datepicker, TextArea, command, Button } from "ebrap-ui";
import { OptionFormat } from "ebrap-ui/dist/types/types";
import { connectContext } from "../../../../Store/Store";
import Convert from "../../../../utils/convert";
import { ByName } from "../../../../utils/sort";

type SelectedGame = Game | undefined;
type SelectedGameType = GameType | undefined;
type SelectedOrg = Organization | undefined;
type SelectedTeam = Team | undefined;

const noTeam: Array<OptionFormat> = [{ id: null, value: "No Team" }];
const gameTypes = ["Best of 1", "Best of 3", "Best of 5", "Best of 7"];

export default function NewMatchPage() {
    const context = connectContext()!;

    const [allGames, setAllGames] = useState<Array<OptionFormat>>([]);
    const [allGameTypes, setAllGameTypes] = useState<Array<OptionFormat>>([]);
    const [allOrgs, setAllOrgs] = useState<Array<OptionFormat>>([]);
    const [awayTeams, setAwayTeams] = useState<Array<OptionFormat>>([]);
    const [homeTeams, setHomeTeams] = useState<Array<OptionFormat>>([]);
    React.useEffect(() => {
        context.games.sort(ByName);
        const games = Convert.toOptionFormat(context.games);
        setAllGames(games);
    }, [context.games]);
    React.useEffect(() => {
        context.organizations.sort(ByName);
        const orgs = Convert.toOptionFormat(context.organizations);
        setAllOrgs(noTeam.concat(orgs));
    }, [context.organizations]);

    const [selectedGame, setGame] = React.useState<SelectedGame>();
    const [selectedGameType, setGametype] = React.useState<SelectedGameType>();
    const handleGame = (option: OptionFormat) => {
        const game = Convert.toGame(option);
        setGame(game);
        setGametype(undefined);
        setAllGameTypes(Convert.toOptionFormat(game?.gameTypes || []));
    };
    const handleGameType = (option: OptionFormat) => {
        const gameType = Convert.toGameType(option);
        setGametype(gameType);
    };

    const [selectedType, setType] = React.useState("");
    const handleType = (e: any) => setType(e);
    const [selectedDate, setDate] = React.useState(new Date());
    const handleDate = (e: any) => setDate(e);

    // Away Org & Team
    const [awayOrg, setAwayOrg] = React.useState<SelectedOrg>();
    const [awayTeam, setAwayTeam] = React.useState<SelectedTeam>();
    const handleAwayOrg = (option: OptionFormat) => {
        const org = Convert.toOrganization(option);
        const teams = org.teams || new Array();
        setAwayTeams(Convert.toOptionFormat(teams));
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
        setHomeTeams(Convert.toOptionFormat(teams));
        setHomeOrg(org);
    };
    const handleHomeTeam = (option: OptionFormat) => {
        setHomeTeam(Convert.toTeam(option));
    };

    const [notes, setNotes] = React.useState("");
    const handleNotes = (e: string) => setNotes(e);

    const createMatch = async () => {
        if (!selectedGame) {
            await command.alert("invalid game");
            return;
        }

        const AwayOrganizationId = awayOrg ? awayOrg.id : null;
        const HomeOrganizationId = homeOrg ? homeOrg.id : null;
        const AwayTeamId = awayTeam ? awayTeam.id : null;
        const HomeTeamId = homeTeam ? homeTeam.id : null;

        if (AwayOrganizationId !== null && AwayTeamId === null) {
            await command.alert("Away Team is required");
            return;
        }
        if (HomeOrganizationId !== null && HomeTeamId === null) {
            await command.alert("Home Team is required");
            return;
        }

        const request = {
            date: selectedDate,
            type: selectedType,
            notes: notes,
            AwayOrganizationId,
            HomeOrganizationId,
            AwayTeamId,
            HomeTeamId,
            GameId: selectedGame.id,
            GameTypeId: selectedGameType?.id || null,
        };
        const { data: response } = await axios.post("/api/Match", request);
        if (!response.success) {
            await command.alert("error creating game");
            return;
        }
        await command.alert("Success!");
    };

    return (
        <div>
            <h1>Create Match</h1>
            <Dropdown
                label={"Game"}
                placeholder={"Select a Game"}
                selected={selectedGame?.name}
                options={allGames}
                onChange={handleGame}
                botPad
            />
            <Dropdown
                label={"Game Variant"}
                placeholder={"Select a Game Variant"}
                selected={selectedGameType?.name}
                options={allGameTypes}
                onChange={handleGameType}
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
                showTimeHelper
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
            <Button onClick={createMatch}>Create</Button>
        </div>
    );
}
