import Axios from "axios";

export async function updatePlayer(player: Player): Promise<ApiResponse> {
    const { data } = await Axios.patch("/api/Player", player);
    return data;
}
