import React from "react";
import { Button, command, Icon } from "ebrap-ui";

interface Props {
    season: Season;
    game?: Game;
    removeSeason: (seasonId: number) => void;
    toggleActive: (
        GameId: number,
        GameTypeId?: number,
        seasonId?: number
    ) => void;
}
export default function SeasonItem({
    season,
    game,
    removeSeason,
    toggleActive,
}: Props) {
    const seasonGameType = findGameType(season, game);
    const handleRemove = () => removeSeason(season.id);
    const handleToggleClick = (alreadyActive: boolean) => async () => {
        let query =
            "Are you sure you'd like to toggle this season to active? (this will make any other season within this game & variant inactive)";
        if (alreadyActive) {
            query =
                "Are you sure you'd like to toggle this season to inactive? (this will make no active season within this game & variant)";
        }
        if (await command.confirm(query)) {
            toggleActive(
                season.GameId || 0,
                season.GameTypeId || undefined,
                alreadyActive ? undefined : season.id
            );
        }
    };

    const [start, end] = findStartAndEnd(season);
    const seasonStart = new Date(start).toLocaleDateString();
    const seasonEnd = new Date(end).toLocaleDateString();

    return (
        <div className={"season-item"}>
            <div>
                <div>
                    <b>Season: </b>
                    {season.name}
                </div>
                <div>
                    <b>Variant: </b>
                    {seasonGameType}
                </div>
                <div>
                    <b>Weeks: </b>
                    {season.weeks.length}
                </div>
                <div>
                    <b>Range: </b>
                    {seasonStart} - {seasonEnd}
                </div>
                <Button color={"red"} onClick={handleRemove} topPad>
                    Delete
                </Button>
            </div>
            <div
                className={`season-active-indicator ${
                    season.active ? "active" : "inactive"
                }`}
                onClick={handleToggleClick(season.active)}
            >
                <div>
                    {season.active ? (
                        <Icon iconName={"CheckCircleOutline"} cursorPointer />
                    ) : (
                        <Icon iconName={"RadioButtonUnchecked"} cursorPointer />
                    )}
                </div>
                <div>{season.active ? "Currently Active" : "Inactive"}</div>
            </div>
        </div>
    );
}

function findGameType(season: Season, game?: Game): string {
    if (!game) return "default";
    if (!season.GameTypeId) return "default";
    const type = game.gameTypes.find((x) => x.id === season.GameTypeId);
    if (!type) return "default";
    return type.name;
}

function findStartAndEnd(season: Season): [number, number] {
    let start = Infinity;
    let end = 0;

    season.weeks.forEach((week) => {
        const weekStart = new Date(week.start).getTime();
        const weekEnd = new Date(week.end).getTime();
        if (weekStart < start) {
            start = weekStart;
        }
        if (weekEnd > end) {
            end = weekEnd;
        }
    });

    return [start, end];
}
