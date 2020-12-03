import React from "react";
import { Button } from "ebrap-ui";
import { connectContext, connectRouter } from "../../../../Store/Store";
import GameSelector from "../../../Selectors/GameSelector";
import { getSeasons, setActiveSeason, deleteSeason } from "../../../../Api";
import SeasonItem from "./SeasonItem";

type SelectedGame = Game | undefined;
type SelectedGameType = GameType | undefined;
export default function EditWeeksPage() {
    const context = connectContext();
    const router = connectRouter()!;

    const [selectedGame, setGame] = React.useState<SelectedGame>();
    const [selectedGameType, setGameType] = React.useState<SelectedGameType>();
    const [seasons, setSeasons] = React.useState<Array<Season>>([]);

    const createSeason = () => router.navigate(`/Admin/Season/new`);

    const selectGame = async (game: SelectedGame) => {
        setGame(game);
        setGameType(undefined);
        if (!game) return;
        const data = await getSeasons(game.id, null);
        setSeasons(data);
    };
    const selectGameType = async (gameType: SelectedGameType) => {
        setGameType(gameType);
        if (!selectedGame) return;
        const data = await getSeasons(selectedGame.id, gameType?.id || null);
        setSeasons(data);
    };

    const removeSeason = async (id: number) => {
        await deleteSeason(id);
        if (!selectedGame) return;
        const gameTypeId = selectedGameType ? selectedGameType.id : null;
        const data = await getSeasons(selectedGame.id, gameTypeId);
        setSeasons(data);
    };
    const setActive = async (id: number) => {
        await setActiveSeason(id);
        if (!selectedGame) return;
        const gameTypeId = selectedGameType ? selectedGameType.id : null;
        const data = await getSeasons(selectedGame.id, gameTypeId);
        setSeasons(data);
    };

    React.useEffect(() => {
        if (context && context.games.length > 0) {
            selectGame(context.games[0]);
        }
    }, [context.games]);

    return (
        <div>
            <h1>Edit Seasons</h1>
            <h4>Select a Game:</h4>
            <GameSelector
                games={context.games}
                game={selectedGame}
                gameType={selectedGameType}
                setGame={selectGame}
                setGameType={selectGameType}
            />
            <br />
            <Button color={"blue-500"} onClick={createSeason}>
                Create a Season
            </Button>
            <h4>Seasons:</h4>
            {seasons.length === 0 && <div>No Seasons</div>}
            {seasons.map((s, i) => (
                <SeasonItem
                    key={i}
                    season={s}
                    game={selectedGame}
                    removeSeason={removeSeason}
                    setActive={setActive}
                />
            ))}
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
