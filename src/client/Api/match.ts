import Axios from "axios";

export async function deleteMatch(id: number): Promise<any> {
    const { data } = await Axios.delete("/api/Match", { params: { id } });
    return data;
}

export async function getMatches(): Promise<Array<Match>> {
    const { data } = await Axios.get("/api/Match");
    return data as Array<Match>;
}

export async function getMatchesForSeason(
    seasonId: number
): Promise<Array<Match>> {
    const { data } = await Axios.get("/api/Match", { params: { seasonId } });
    console.log("seasoned", data);
    return data as Array<Match>;
}

export async function getMatch(id: number): Promise<Match | null> {
    const { data } = await Axios.get("/api/Match", {
        params: { id },
    });
    if (data.length === 0) return null;
    return data[0] as Match;
}

export async function updateMatch(props: any): Promise<any> {
    const { data } = await Axios.patch("/api/Match", props);
    return data;
}
