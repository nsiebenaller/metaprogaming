import React from "react";
import { Button } from "ebrap-ui";

interface Props {
    season: Season;
    game?: Game;
    removeSeason: (seasonId: number) => void;
    setActive: (seasonId: number) => void;
}
export default function SeasonItem({
    season,
    game,
    removeSeason,
    setActive,
}: Props) {
    const seasonGameType = findGameType(season, game);
    const handleRemove = () => removeSeason(season.id);
    const handleActive = () => setActive(season.id);

    return (
        <div className={"season-item"}>
            <div>{season.name}</div>
            <div>Variant: {seasonGameType}</div>
            <div>Number of Weeks: {season.weeks.length}</div>
            <div>Active?: {season.active ? "Yes" : "No"}</div>
            <Button color={"blue"} onClick={handleActive}>
                Set Active
            </Button>
            <Button color={"red"} onClick={handleRemove}>
                Delete
            </Button>
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
