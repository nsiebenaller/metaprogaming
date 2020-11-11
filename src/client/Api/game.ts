import Axios from "axios";

export async function fetchGames(): Promise<Array<Game>> {
    const { data: games } = await Axios.get("/api/Game");
    return games as Array<Game>;
}
export async function createGame(
    name: string,
    banner?: File,
    image?: File
): Promise<any> {
    const formData = new FormData();
    if (banner) formData.append("banner", banner);
    if (image) formData.append("image", image);
    formData.append("name", name);
    const { data } = await Axios.post("/api/Game", formData);
    return data;
}
export async function saveGame(
    id: number,
    name: string,
    banner?: File,
    image?: File
): Promise<any> {
    const formData = new FormData();
    if (banner) formData.append("banner", banner);
    if (image) formData.append("image", image);
    formData.append("id", id.toString());
    formData.append("name", name);

    const { data } = await Axios.patch("/api/Game", formData);
    return data;
}
export async function deleteGame(id: number): Promise<any> {
    const { data } = await Axios.delete("/api/Game", { params: { id } });
    return data;
}

// Game Type
export async function addGameType(params: any): Promise<any> {
    const { data } = await Axios.post("/api/GameType", params);
    return data;
}
export async function editGameType(params: any): Promise<any> {
    const { data } = await Axios.patch("/api/GameType", params);
    return data;
}
export async function deleteGameType(id: number): Promise<any> {
    const { data } = await Axios.delete("/api/GameType", { params: { id } });
    return data;
}
