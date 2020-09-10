import React from "react";
import { Button } from "ebrap-ui";
import { connectContext } from "../../Context";
import { Game, Week } from "../../../types/types";
import Axios from "axios";
import WeekItem from "./WeekItem";

interface Props {}
export default function EditWeeksPage(props: Props) {
    const context = connectContext()!;
    const { selectedDivision, selectedSubConference } = context;
    const DivisionId = (selectedDivision && selectedDivision.id) || null;

    const [gameId, setGame] = React.useState<number | undefined>();
    const [weeks, setWeeks] = React.useState(new Array<Week>());

    const createSeason = () => context.history.push(`/Season/${gameId}`);

    const findWeeks = async (GameId: number) => {
        const { data: weeks } = await Axios.get("/api/Week", {
            params: {
                GameId,
                DivisionId,
            },
        });
        setWeeks(weeks);
    };

    const selectGame = (gameId: number) => () => {
        setGame(gameId);
        findWeeks(gameId);
    };

    React.useEffect(() => {
        if (context && context.games.length > 0) {
            selectGame(context.games[0].id)();
        }
    }, [context.games, context.selectedDivision]);

    const removeSeason = async () => {
        if (!gameId) return;
        await Axios.delete("/api/Week", {
            params: {
                GameId: gameId,
                DivisionId,
            },
        });
        findWeeks(gameId);
    };

    const currentGame = context.games.find((x) => x.id === gameId);
    const currentGameName = currentGame ? currentGame.name : "";

    return (
        <div>
            <h1>Edit Season</h1>
            <h2>
                {currentGameName} {selectedDivision && selectedDivision.name}{" "}
                {selectedSubConference && selectedSubConference.name}
            </h2>
            <h4>Select a Game:</h4>
            {context.games.map((game: Game, idx: number) =>
                gameId === game.id ? (
                    <div key={idx}>
                        <b>{game.name}</b>
                    </div>
                ) : (
                    <div key={idx} onClick={selectGame(game.id)}>
                        {game.name}
                    </div>
                )
            )}
            <h4>Current Season:</h4>
            {weeks.length === 0 && (
                <div>
                    <div>
                        No current season for {currentGameName}{" "}
                        {selectedDivision && selectedDivision.name}
                    </div>
                    <br />
                    <Button color={"blue-500"} onClick={createSeason}>
                        Create a Season
                    </Button>
                </div>
            )}
            {weeks.map((week: Week, idx: number) => (
                <WeekItem key={idx} week={week} />
            ))}
            {weeks.length !== 0 && (
                <Button color={"red-500"} onClick={removeSeason}>
                    Delete Season
                </Button>
            )}
        </div>
    );
}
