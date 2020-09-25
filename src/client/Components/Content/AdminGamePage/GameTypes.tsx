import React from "react";
import { TextField, Button } from "ebrap-ui";
import { addGameType, editGameType, deleteGameType } from "../../../Api";

interface Props {
    game: Game;
    refreshGame: () => void;
}
export default function GameTypes({ game, refreshGame }: Props) {
    const [gameType, setGameType] = React.useState<string>("");

    const createNewGameType = async () => {
        const params = {
            name: gameType,
            GameId: game.id,
        };
        await addGameType(params);
        refreshGame();
        setGameType("");
    };

    return (
        <div>
            <div className={"game-types-container"}>
                <b>Game Types</b>
                {game.gameTypes.map((gameType, key) => (
                    <GameVariant
                        key={key}
                        gameType={gameType}
                        refreshGame={refreshGame}
                    />
                ))}
                <hr />
                <div className={"flex-row --right-pad-10"}>
                    <TextField
                        label={"New Game Variant"}
                        value={gameType}
                        onChange={(e: string) => setGameType(e)}
                    />
                    <Button
                        topPad
                        color={"blue"}
                        variant={"outlined"}
                        onClick={createNewGameType}
                    >
                        Create
                    </Button>
                </div>
            </div>
        </div>
    );
}

interface GameVariantProps {
    gameType: GameType;
    refreshGame: () => void;
}
function GameVariant({ gameType, refreshGame }: GameVariantProps) {
    const [name, setName] = React.useState(gameType.name);
    const save = async () => {
        const params = {
            ...gameType,
            name,
        };
        await editGameType(params);
        refreshGame();
    };
    const remove = async () => {
        await deleteGameType(gameType.id);
        refreshGame();
    };
    return (
        <div className={"flex-row --right-pad-10 --bot-pad-10"}>
            <TextField value={name} onChange={(e: string) => setName(e)} />
            <Button color={"blue"} variant={"outlined"} onClick={save}>
                Save
            </Button>
            <Button color={"red"} variant={"outlined"} onClick={remove}>
                Remove
            </Button>
        </div>
    );
}
