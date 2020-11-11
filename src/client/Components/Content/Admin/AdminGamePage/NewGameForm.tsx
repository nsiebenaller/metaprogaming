import React from "react";
import { TextField, Button } from "ebrap-ui";
import { createGame, fetchGames } from "../../../../Api";
import { connectContext, connectRouter } from "../../../Context";
import * as Util from "../../../../utils/file";
import ImageInput from "./ImageInput";

const initState = {
    banner: null,
    image: null,
    name: null,
};
const reduce = (prevState: any, params: any) => ({ ...prevState, ...params });
interface Props {}
export default function NewGameForm({}: Props) {
    const context = connectContext();
    const router = connectRouter()!;

    const [state, setState] = React.useReducer(reduce, initState);
    const bannerRef = React.useRef<HTMLDivElement | null>(null);
    const imageRef = React.useRef<HTMLImageElement | null>(null);
    const { name } = state;

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
        if (!state.banner) {
            window.alert("a banner image is required");
            return;
        }
        if (!state.image) {
            window.alert("a main image is required");
            return;
        }

        await createGame(state.name, state.banner, state.image);
        const games = await fetchGames();
        context.setContext({ games });
        router.history.push("/Admin/Game");
    };

    return (
        <div className={"manage-game-form"}>
            <h1>Create New Game</h1>
            <div className={"banner-container"}>
                <div ref={bannerRef} className={"banner-img"} />
            </div>
            <input type={"file"} onInput={handleBanner} />
            <br />
            <br />

            <div className={"flex-row --right-pad-10"}>
                <ImageInput
                    imageRef={imageRef}
                    image={""}
                    name={name}
                    onInput={handleImage}
                />
            </div>
            <br />
            <TextField
                label={"Game Name"}
                value={state.name || ""}
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
