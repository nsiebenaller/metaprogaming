import Axios from "axios";

export async function fetchUsers(): Promise<Array<User>> {
    const { data } = await Axios.get("/api/User");
    return data;
}

export async function fetchUser(id: number): Promise<User | null> {
    const { data } = await Axios.get("/api/User", { params: { id } });
    if (!data || data.length === 0) return null;
    return data[0];
}

export async function fetchUserByEmail(email: string): Promise<User | null> {
    const { data } = await Axios.get("/api/User", { params: { email } });
    if (!data || data.length === 0) return null;
    return data[0];
}

export async function updateUser(user: User): Promise<ApiResponse> {
    const { data } = await Axios.patch("/api/User", user);
    return data;
}

export async function createUser(user: User): Promise<ApiResponse> {
    const { data } = await Axios.post("/api/User", user);
    return data as ApiResponse;
}

export async function deleteUser(userId: number): Promise<ApiResponse> {
    const { data } = await Axios.delete("/api/User", {
        params: { id: userId },
    });
    return data as ApiResponse;
}

export async function addPlayer(
    userId: number,
    player: Player
): Promise<ApiResponse> {
    const { data } = await Axios.post("/api/UserPlayer", { userId, player });
    return data as ApiResponse;
}

export async function removePlayer(playerId: number): Promise<ApiResponse> {
    const { data } = await Axios.delete("/api/UserPlayer", {
        params: { id: playerId },
    });
    return data as ApiResponse;
}
