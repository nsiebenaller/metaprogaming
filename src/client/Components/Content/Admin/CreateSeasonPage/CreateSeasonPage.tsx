import React from "react";
import { TextField, Datepicker, Button } from "ebrap-ui";
import { connectContext } from "../../../../Store/Store";
import GameSelector from "../../../Selectors/GameSelector";
import { createSeason } from "../../../../Api";

type SelectedGame = Game | undefined;
type SelectedGameType = GameType | undefined;
export default function CreateSeasonPage() {
    const context = connectContext();

    const [selectedGame, setGame] = React.useState<SelectedGame>();
    const [selectedGameType, setGameType] = React.useState<SelectedGameType>();
    const [numWeeks, setNumWeeks] = React.useState<number>(10);
    const [startDate, setStartDate] = React.useState<Date>(new Date());
    const [seasonName, setName] = React.useState<string>("");
    const selectGame = (game?: Game) => setGame(game);
    const selectGameType = (gameType?: GameType) => setGameType(gameType);
    const selectWeeks = (value: string) => setNumWeeks(parseInt(value));
    const selectDate = (value: Date | null) => {
        if (!value) return;
        setStartDate(value);
    };
    const handleName = (value: string) => setName(value);
    const handleSeason = async () => {
        const ready = isReady(selectedGame, selectedGameType);
        if (!ready) {
            window.alert("Please select game and game type");
            return;
        }
        const GameId = selectedGame ? selectedGame.id : null;
        const GameTypeId = selectedGameType ? selectedGameType.id : null;
        await createSeason(seasonName, startDate, numWeeks, GameId, GameTypeId);
        window.alert("Success!");
    };

    return (
        <div>
            <h1>Create Season</h1>
            <GameSelector
                games={context.games}
                game={selectedGame}
                gameType={selectedGameType}
                setGame={selectGame}
                setGameType={selectGameType}
            />
            <br />
            <TextField
                label={"Season Name"}
                value={seasonName}
                onChange={handleName}
                botPad
            />
            <br />
            <TextField
                label={"Number of Weeks"}
                value={numWeeks}
                type={"number"}
                onChange={selectWeeks}
                botPad
            />
            <br />
            <Datepicker
                label={"Start Date"}
                value={startDate}
                onChange={selectDate}
            />
            <br />
            <Button color={"blue-500"} onClick={handleSeason}>
                Create Season
            </Button>
        </div>
    );
}

function isReady(
    selectedGame: SelectedGame,
    selectedGameType: SelectedGameType
): boolean {
    if (!selectedGame) return false;
    const gameTypes = selectedGame.gameTypes;
    if (gameTypes.length === 0) return true;
    if (!selectedGameType) return false;
    return true;
}
