import React from "react";
import { TextField, Button, command } from "ebrap-ui";
import { saveGame, fetchGames } from "../../../Api";
import { connectContext } from "../../Context";
import ImageInput from "./ImageInput";
import GameTypes from "./GameTypes";
import * as Util from "../../../utils/file";

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
    const refreshGame = async () => {
        const games = await fetchGames();
        context.setContext({ games });
    };

    return (
        <div className={"manage-game-form"}>
            <h1>Manage {game.name}</h1>
            <div className={"banner-container"}>
                {game.banner && (
                    <div
                        ref={bannerRef}
                        className={"banner-img"}
                        style={{
                            backgroundImage: `url(${bucket}${game.banner})`,
                        }}
                    />
                )}
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
            <Button onClick={handleSave} color={"blue"}>
                Save
            </Button>
        </div>
    );
}
