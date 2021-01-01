import React, { useState } from "react";
import { connectContext } from "../../../Store/Store";
import {
    updateMatch,
    deleteMatch,
    fetchLeaderboard,
    getMatchesForGame,
} from "../../../Api";
import Banner from "./Banner";
import GameTypeMenu from "./GameTypeMenu";
import SeasonPicker from "./SeasonPicker";
import MatchList from "./MatchList";
import Leaderboard from "./Leaderboard";
import { OptionFormat } from "ebrap-ui";
import OptionUtil from "ebrap-ui/dist/helpers/OptionUtil";
import Axios from "axios";

type SelectedOption = OptionFormat | undefined;
interface Props {
    gameId: number;
}
export default function MainGamePage({ gameId }: Props) {
    const context = connectContext();
    const { selectedGame, games, user } = context;

    const [gameType, setGameType] = useState<GameType | undefined>();
    const [matches, setMatches] = useState<Array<Match>>([]);
    const [currentWeek, setCurrentWeek] = useState<SelectedOption>();
    const [leaderboard, setLeaderboard] = useState<Array<any>>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // Set selected game if not set
    React.useEffect(() => {
        setLoading(true);
        if (!selectedGame) {
            const game = games.find((x) => x.id === gameId);
            if (game) {
                context.setContext({ selectedGame: game });
                if (game.gameTypes.length > 0) setGameType(game.gameTypes[0]);
            }
            return;
        }
        const loadMatches = async () => {
            setMatches([]);
            const data = await getMatchesForGame(selectedGame.id, gameType?.id);
            setMatches(data);
            setLoading(false);
        };
        loadMatches();
    }, [gameId, games, selectedGame, gameType]);
    React.useEffect(() => {
        if (selectedGame) {
            if (selectedGame.gameTypes.length > 0) {
                setGameType(selectedGame.gameTypes[0]);
            } else {
                setGameType(undefined);
            }
        }
    }, [selectedGame]);
    if (!selectedGame) return null;

    const handleChange = async (match: Match) => {
        const m = matches.map((x) => (x.id === match.id ? match : x));
        setMatches(m);
        await updateMatch(match);
    };
    const handleDelete = async (match: Match) => {
        const m = matches.filter((x) => x.id !== match.id);
        setMatches(m);
        await deleteMatch(match.id);
    };

    const refreshLeaderboard = async () => {
        const { data } = await Axios.get("/api/Season", {
            params: {
                GameId: selectedGame.id,
                GameTypeId: gameType ? gameType.id : null,
                active: true,
            },
        });
        if (!data || data.length === 0) {
            setLeaderboard([]);
            return;
        }
        const currentSeason = data[0];
        const leaderboard = await fetchLeaderboard(currentSeason.id);
        setLeaderboard(leaderboard);
    };

    const gameMatches = loading ? [] : filterMatches(matches, currentWeek);
    const loggedIn = !!user;

    return (
        <div>
            <Banner
                banner={selectedGame.banner}
                gameName={selectedGame.name}
                gameTypeName={gameType?.name || ""}
            />
            <GameTypeMenu
                gameTypes={selectedGame.gameTypes || []}
                selectedId={gameType?.id}
                setGameType={setGameType}
            />
            <SeasonPicker
                setCurrentWeek={setCurrentWeek}
                currentWeek={currentWeek}
                gameId={selectedGame.id}
                gameTypeId={gameType?.id}
                loading={loading}
                setLoading={setLoading}
                setLeaderboard={setLeaderboard}
            />
            <div className={"flex-row flex-wrap"}>
                <MatchList
                    matches={gameMatches}
                    loggedIn={loggedIn}
                    loading={loading}
                    changeMatch={handleChange}
                    deleteMatch={handleDelete}
                />
                <Leaderboard
                    leaderboard={leaderboard}
                    refreshLeaderboard={refreshLeaderboard}
                />
            </div>
        </div>
    );
}

function filterMatches(
    matches: Array<Match>,
    currentWeek?: SelectedOption
): Array<Match> {
    if (!currentWeek) return matches;
    if (OptionUtil.valueOf(currentWeek) === "All") return matches;

    const week = (currentWeek as unknown) as Week;
    return matches.filter((match) => {
        const date = match.date ? new Date(match.date).getTime() : null;
        const start = new Date(week.start).getTime();
        const end = new Date(week.end).getTime();

        const weekFlag = !date || (start < date && date < end);
        return weekFlag;
    });
}
