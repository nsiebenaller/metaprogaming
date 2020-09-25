import React from "react";
import { TextField, Button } from "ebrap-ui";
import { createGame, fetchGames } from "../../../Api";
import { connectContext } from "../../Context";

const bucket = "https://metaprogaming.s3.amazonaws.com/";
const initState = {
    banner: null,
    image: null,
    name: null,
};
const reduce = (prevState: any, params: any) => ({ ...prevState, ...params });
interface Props {}
export default function NewGameForm({}: Props) {
    const context = connectContext();

    const [state, setState] = React.useReducer(reduce, initState);

    const handleBanner = (event: React.FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        if (!target.files) return;
        const file = Array.from(target.files)[0];
        setState({ banner: file });
    };
    const handleImage = (event: React.FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        if (!target.files) return;
        const file = Array.from(target.files)[0];
        setState({ image: file });
    };

    const handleSave = async () => {
        await createGame(state.name, state.banner, state.image);
        const games = await fetchGames();
        context.setContext({ games });
    };

    return (
        <div className={"manage-game-form"}>
            <h1>Create New Game</h1>
            {/* <div className={"banner-container"}>
                {game?.banner && (
                    <div
                        className={"banner-img"}
                        style={{
                            backgroundImage: `url(${bucket}${game.banner})`,
                        }}
                    />
                )}
            </div> */}
            {/* <div className={"game"}>
                <img className={"img"} src={game?.image || ""} />
                <div className={"name"}>{state.name || game?.name}</div>
            </div> */}
            <TextField
                label={"Game Name"}
                value={state.name || ""}
                onChange={(e: string) => setState({ name: e })}
            />
            <br />
            <br />
            <div>Banner</div>
            <input type={"file"} onInput={handleBanner} />
            <br />
            <br />
            <div>Image</div>
            <input type={"file"} onInput={handleImage} />

            <br />
            <br />
            <Button onClick={handleSave} color={"blue"}>
                Save
            </Button>
        </div>
    );
}
