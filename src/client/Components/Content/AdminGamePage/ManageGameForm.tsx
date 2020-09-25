import React from "react";
import { TextField, Button } from "ebrap-ui";
import { saveGame, fetchGames } from "../../../Api";
import { connectContext } from "../../Context";

const bucket = "https://metaprogaming.s3.amazonaws.com/";
const initState = {
    banner: null,
    image: null,
    name: null,
};
const reduce = (prevState: any, params: any) => ({ ...prevState, ...params });
interface Props {
    game?: Game;
}
export default function ManageGameForm({ game }: Props) {
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
        if (!game) return;
        await saveGame(
            game.id,
            state.name || game.name,
            state.banner,
            state.image
        );
        const games = await fetchGames();
        context.setContext({ games });
    };

    const header = game ? `Manage ${game.name}` : "Create New Game";

    return (
        <div className={"manage-game-form"}>
            <h1>{header}</h1>
            <div className={"banner-container"}>
                {game?.banner && (
                    <div
                        className={"banner-img"}
                        style={{
                            backgroundImage: `url(${bucket}${game.banner})`,
                        }}
                    />
                )}
            </div>
            <div className={"game"}>
                <img className={"img"} src={game?.image || ""} />
                <div className={"name"}>{state.name || game?.name}</div>
            </div>
            <TextField
                label={"Game Name"}
                value={state.name || game?.name || ""}
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
