import React from "react";
import { Dropdown, OptionFormat } from "ebrap-ui";
import Convert from "../../utils/convert";
import { ByName } from "../../utils/sort";

interface Props {
    games: Array<Game>;
    game?: Game;
    gameType?: GameType;
    setGame: (game?: Game) => void;
    setGameType: (gameType?: GameType) => void;
}
export default function GameSelector(props: Props) {
    const [games, setGames] = React.useState<Array<OptionFormat>>([]);
    const [gameTypes, setGameTypes] = React.useState<Array<OptionFormat>>([]);

    React.useEffect(() => {
        props.games.sort(ByName);
        setGames(Convert.toOptionFormat(props.games));
    }, [props.games]);

    React.useEffect(() => {
        if (!props.game) {
            setGameTypes([]);
            return;
        }
        props.game.gameTypes.sort(ByName);
        setGameTypes(Convert.toOptionFormat(props.game.gameTypes));
    }, [props.game]);

    const handleGame = (option: OptionFormat) => {
        const game = Convert.toGame(option);
        if (game.id === props.game?.id) return;
        const types = Convert.toOptionFormat(game.gameTypes);
        setGameTypes(types);
        props.setGame(game);
        props.setGameType();
    };

    const handleGameType = (option: OptionFormat) => {
        const type = Convert.toGameType(option);
        if (type.id === props.gameType?.id) return;
        props.setGameType(type);
    };

    let gameTypePlaceholder = "Select a Game Variant";
    if (gameTypes.length === 0) {
        gameTypePlaceholder = "No Variants";
    }

    return (
        <div className={"flex-row children--right-pad-10"}>
            <Dropdown
                label={"Game"}
                placeholder={"Select a Game"}
                selected={props.game?.name || ""}
                options={games}
                onChange={handleGame}
                botPad
            />
            <Dropdown
                label={"Game Variant"}
                placeholder={gameTypePlaceholder}
                selected={props.gameType?.name || ""}
                options={gameTypes}
                onChange={handleGameType}
                noOptionsText={"No Variants"}
                botPad
            />
        </div>
    );
}
