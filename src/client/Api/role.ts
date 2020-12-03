import Axios from "axios";

export async function fetchRoles(): Promise<Array<Role>> {
    const { data } = await Axios.get("/api/Role");
    return data;
}
