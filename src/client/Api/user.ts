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

export async function updateUser(user: User): Promise<boolean> {
    const { data } = await Axios.patch("/api/User", user);
    return data.success;
}

export async function createUser(user: User): Promise<ApiResponse> {
    const { data } = await Axios.post("/api/User", user);
    return data as ApiResponse;
}
