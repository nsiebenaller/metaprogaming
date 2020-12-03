import React from "react";
import { TextField, Button, command } from "ebrap-ui";
import { saveGame, fetchGames, deleteGame } from "../../../../Api";
import { connectContext, connectRouter } from "../../../../Store/Store";
import ImageInput from "./ImageInput";
import GameTypes from "./GameTypes";
import * as Util from "../../../../utils/file";

const bucket = Util.Bucket;
const initState = {
    banner: null,
    image: null,
    name: null,
};
const reduce = (prevState: any, params: any) => ({ ...prevState, ...params });
interface Props {
    game: Game;
}
export default function ManageGameForm({ game }: Props) {
    const context = connectContext();
    const router = connectRouter()!;

    const [state, setState] = React.useReducer(reduce, initState);
    const bannerRef = React.useRef<HTMLDivElement | null>(null);
    const imageRef = React.useRef<HTMLImageElement | null>(null);

    const handleBanner = (event: React.FormEvent<HTMLInputElement>) => {
        const file = Util.extractFile(event);
        setState({ banner: file });
        if (!file) return;
        Util.setBanner(file, bannerRef);
    };
    const handleImage = (event: React.FormEvent<HTMLInputElement>) => {
        const file = Util.extractFile(event);
        setState({ image: file });
        if (!file) return;
        Util.setImage(file, imageRef);
    };

    const handleSave = async () => {
        await saveGame(
            game.id,
            state.name || game.name,
            state.banner,
            state.image
        );
        refreshGame();
        await command.alert("Game Saved!");
    };
    const handleDelete = async () => {
        if (
            window.confirm(
                "Are you sure you'd like to permanently delete this game?"
            )
        ) {
            const response = await deleteGame(game.id);
            if (!response.success) {
                return window.alert("Error deleting game");
            }
            refreshGame();
            router.navigate("/Admin/Game");
        }
    };
    const refreshGame = async () => {
        const games = await fetchGames();
        context.setContext({ games });
    };

    return (
        <div className={"manage-game-form"}>
            <h1>Manage {game.name}</h1>
            <div className={"banner-container"}>
                <div
                    ref={bannerRef}
                    className={"banner-img"}
                    style={{
                        backgroundImage: `url(${game.banner})`,
                    }}
                />
            </div>
            <input type={"file"} onInput={handleBanner} />
            <br />
            <br />

            <div className={"flex-row --right-pad-10"}>
                <ImageInput
                    imageRef={imageRef}
                    image={game.image || ""}
                    name={state.name || game.name}
                    onInput={handleImage}
                />
                <GameTypes game={game} refreshGame={refreshGame} />
            </div>
            <br />
            <TextField
                label={"Game Name"}
                value={state.name || game?.name || ""}
                onChange={(e: string) => setState({ name: e })}
            />
            <br />
            <br />
            <div className={"flex-row --right-pad-10"}>
                <Button onClick={handleSave} color={"blue"}>
                    Save
                </Button>
                <Button onClick={handleDelete} color={"red"}>
                    Delete
                </Button>
            </div>
        </div>
    );
}
