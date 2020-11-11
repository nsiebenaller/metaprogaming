import React from "react";
import { Dropdown, OptionFormat } from "ebrap-ui";
import Axios from "axios";
import { fetchLeaderboard } from "../../../Api";
//import Convert from "../../../utils/convert";

type SelectedSeason = Season | undefined;
type SelectedOption = OptionFormat | undefined;
interface Props {
    gameId: number;
    gameTypeId?: number;
    currentWeek: SelectedOption;
    loading: boolean;
    setCurrentWeek: React.Dispatch<React.SetStateAction<SelectedOption>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setLeaderboard: React.Dispatch<React.SetStateAction<Array<any>>>;
}
export default function SeasonPicker({
    gameId,
    gameTypeId,
    currentWeek,
    loading,
    setCurrentWeek,
    setLoading,
    setLeaderboard,
}: Props) {
    const [currentSeason, setSeason] = React.useState<SelectedSeason>();
    const [allWeeks, setAllWeeks] = React.useState<Array<OptionFormat>>([]);

    React.useEffect(() => {
        onMount();
    }, [gameId, gameTypeId]);
    async function onMount() {
        // Reset Selections
        setAllWeeks([]);
        setCurrentWeek(undefined);
        setSeason(undefined);
        setLoading(true);

        // Fetch Season
        const { data } = await Axios.get("/api/Season", {
            params: {
                GameId: gameId,
                GameTypeId: gameTypeId || null,
                active: true,
            },
        });
        if (!data || data.length === 0) {
            setAllWeeks([]);
            setCurrentWeek(undefined);
            setSeason(undefined);
            setLoading(false);
            return;
        }
        const currentSeason = data[0];
        setSeason(currentSeason);

        const leaderboard = await fetchLeaderboard(currentSeason.id);
        setLeaderboard(leaderboard);

        const { weeks } = currentSeason;
        if (weeks.length > 0) {
            weeks.sort(sortByDate);
            const newWeeks = [{ value: "All" }].concat(
                weeks.map((x: Week) => ({ ...x, value: x.name }))
            );
            setAllWeeks(newWeeks);
            const curr = findCurrentWeek(newWeeks);
            if (curr) {
                setCurrentWeek(curr);
            } else {
                setCurrentWeek(newWeeks[0]);
            }
        } else {
            setAllWeeks([]);
            setCurrentWeek(undefined);
        }
        setLoading(false);
    }

    const handleChange = (option: OptionFormat) => setCurrentWeek(option);

    const placeholder = allWeeks.length === 0 ? "No Season" : "Select Week";
    const current = (currentWeek as unknown) as Week;
    const showDate = current && current.start && current.end;

    if (loading) return <hr />;

    return (
        <React.Fragment>
            <div className={"season-picker"}>
                {currentSeason && <div>{currentSeason.name}</div>}
                <Dropdown
                    placeholder={placeholder}
                    selected={currentWeek}
                    options={allWeeks}
                    disabled={allWeeks.length === 0}
                    onChange={handleChange}
                />
                {showDate && (
                    <div>
                        {getDate(current.start)} - {getDate(current.end)}
                    </div>
                )}
            </div>
            <hr />
        </React.Fragment>
    );
}

function sortByDate(a: Week, b: Week) {
    const aT = new Date(a.start).getTime();
    const bT = new Date(b.start).getTime();

    if (aT < bT) return -1;
    if (aT > bT) return 1;
    return 0;
}
function findCurrentWeek(
    options: Array<OptionFormat>
): OptionFormat | undefined {
    const weeks = (options as unknown) as Array<Week>;
    const today = new Date().getTime();
    for (let i = 0; i < weeks.length; i++) {
        const w = weeks[i];
        const s = new Date(w.start).getTime();
        const e = new Date(w.end).getTime();
        if (s < today && today < e) {
            return (w as unknown) as OptionFormat;
        }
    }
    return undefined;
}
function getDate(date: string | Date): string | undefined {
    if (!date) return undefined;
    return new Date(date).toLocaleDateString();
}
