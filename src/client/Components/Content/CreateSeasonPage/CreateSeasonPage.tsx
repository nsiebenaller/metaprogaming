import React from "react";
import { TextField, Datepicker, Button } from "ebrap-ui";
import { connectContext, connectRouter } from "../../Context";
import Axios from "axios";

interface Props {
    match: any;
}
export default function CreateSeasonPage(props: Props) {
    const context = connectContext();
    const router = connectRouter()!;

    const { selectedDivision, selectedSubConference } = context;
    const gameId = parseInt(props.match.params.gameId);
    const DivisionId = (selectedDivision && selectedDivision.id) || null;

    const [game, setGame] = React.useState<Game | undefined>();
    const [numWeeks, setNumWeeks] = React.useState<number>(10);
    const handleNumWeeks = (value: string) => setNumWeeks(parseInt(value));
    const [startDate, setStartDate] = React.useState<Date>(new Date());
    const handleStartDate = (value: Date | null) => {
        if (!value) return;
        setStartDate(value);
    };

    React.useEffect(() => {
        const game = context.games.find((x) => x.id === gameId);
        setGame(game);
    }, [gameId, context.games]);

    const createSeason = async () => {
        const requests = [];
        let start = startDate;
        for (let i = 0; i < numWeeks; i++) {
            const data = {
                name: `Week ${i + 1}`,
                start: start,
                end: nextweek(start),
                GameId: gameId,
                DivisionId: null,
            };
            requests.push(Axios.post("/api/Week", data));
            start = nextweek(start);
        }
        await Promise.all(requests);
        window.alert("success!");
        router.history.goBack();
    };

    if (!game) return null;
    return (
        <div>
            <h1>Create Season</h1>
            <h4>
                {game.name} {"NECC Conference"}
            </h4>
            <TextField
                value={numWeeks}
                label="Number of Weeks"
                type="number"
                onChange={handleNumWeeks}
                botPad
            />
            <br />
            <Datepicker
                label="Start Date"
                value={startDate}
                onChange={handleStartDate}
            />
            <br />
            <Button color={"blue-500"} onClick={createSeason}>
                Create Season
            </Button>
        </div>
    );
}

function nextweek(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
}
