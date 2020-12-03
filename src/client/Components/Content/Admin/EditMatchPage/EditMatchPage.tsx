import React from "react";
import { Dropdown, Datepicker, TextArea, command, Button } from "ebrap-ui";
import { connectContext } from "../../../../Store/Store";
import GameSelector from "../../../Selectors/GameSelector";
import OrgTeamSelector from "../../../Selectors/OrgTeamSelector";
import { getMatch, updateMatch } from "../../../../Api";

type SelectedGame = Game | undefined;
type SelectedGameType = GameType | undefined;
type SelectedOrg = Organization | undefined;
type SelectedTeam = Team | undefined;

const gameTypes = ["Best of 1", "Best of 3", "Best of 5", "Best of 7"];
interface Props {
    match: any;
}
export default function EditMatchPage({ match }: Props) {
    const context = connectContext()!;
    const MatchId = parseInt(match.params.matchId);

    const [loading, setLoading] = React.useState<boolean>(true);
    const [selectedGame, setGame] = React.useState<SelectedGame>();
    const [selectedVariant, setVariant] = React.useState<SelectedGameType>();
    const [selectedType, setType] = React.useState("");
    const handleType = (e: any) => setType(e);
    const [selectedDate, setDate] = React.useState(new Date());
    const handleDate = (e: any) => setDate(e);
    const [awayOrg, setAwayOrg] = React.useState<SelectedOrg>();
    const [awayTeam, setAwayTeam] = React.useState<SelectedTeam>();
    const [homeOrg, setHomeOrg] = React.useState<SelectedOrg>();
    const [homeTeam, setHomeTeam] = React.useState<SelectedTeam>();

    const [notes, setNotes] = React.useState("");
    const handleNotes = (e: string) => setNotes(e);

    React.useEffect(() => {
        onMount();
    }, []);
    async function onMount() {
        setLoading(true);
        const currentMatch = await getMatch(MatchId);
        if (!currentMatch) {
            return await command.alert("invalid match");
        }
        const {
            GameId,
            GameTypeId,
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
        const matchDate = new Date(date);

        if (game) setGame(game);
        if (game && GameTypeId) {
            const gameType = game.gameTypes.find((x) => x.id === GameTypeId);
            if (gameType) setVariant(gameType);
        }
        setType(type);
        setDate(matchDate);
        if (awayOrg) setAwayOrg(awayOrg);
        if (awayTeam) setAwayTeam(awayTeam);
        if (homeOrg) setHomeOrg(homeOrg);
        if (homeTeam) setHomeTeam(homeTeam);
        setNotes(notes || "");
        setLoading(false);
    }

    const save = async () => {
        let AwayOrganizationId = null;
        if (awayOrg && awayOrg.id !== -1) {
            AwayOrganizationId = awayOrg.id;
        }
        let HomeOrganizationId = null;
        if (homeOrg && homeOrg.id !== -1) {
            HomeOrganizationId = homeOrg.id;
        }
        let AwayTeamId = null;
        if (awayTeam && awayTeam.id !== -1) {
            AwayTeamId = awayTeam.id;
        }
        let HomeTeamId = null;
        if (homeTeam && homeTeam.id !== -1) {
            HomeTeamId = homeTeam.id;
        }

        if (!selectedGame) {
            return await command.alert("invalid game");
        }

        const request = {
            id: MatchId,
            date: selectedDate,
            type: selectedType,
            notes: notes,
            AwayOrganizationId,
            HomeOrganizationId,
            AwayTeamId,
            HomeTeamId,
            GameId: selectedGame.id,
            GameTypeId: selectedVariant?.id || null,
        };
        const response = await updateMatch(request);
        if (!response.success) {
            return await command.alert("Error creating game");
        }
        await command.alert("Success!");
    };

    if (loading) {
        return (
            <div>
                <h1>Edit Match</h1>
                <div>loading...</div>
            </div>
        );
    }

    return (
        <div>
            <h1>Edit Match</h1>
            <GameSelector
                games={context.games}
                game={selectedGame}
                gameType={selectedVariant}
                setGame={setGame}
                setGameType={setVariant}
            />
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
            <OrgTeamSelector
                type={"Away"}
                organizations={context.organizations}
                organization={awayOrg}
                team={awayTeam}
                setOrganization={setAwayOrg}
                setTeam={setAwayTeam}
            />
            <OrgTeamSelector
                type={"Home"}
                organizations={context.organizations}
                organization={homeOrg}
                team={homeTeam}
                setOrganization={setHomeOrg}
                setTeam={setHomeTeam}
            />
            <TextArea
                label={"Notes"}
                value={notes}
                onChange={handleNotes}
                cols={80}
            />
            <br />
            <Button
                colorHex={"#80ae10"}
                hoverHex={"#99BE3F"}
                textHex={"white"}
                onClick={save}
            >
                Save
            </Button>
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
