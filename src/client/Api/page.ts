import Axios from "axios";

export async function fetchPages(): Promise<Array<Page>> {
    const { data } = await Axios.get("/api/Page");
    return data;
}

export async function createPage(
    name: string,
    content: string,
    hidden: boolean
): Promise<any> {
    const { data } = await Axios.post("/api/Page", { name, content, hidden });
    return data;
}

export async function updatePage(page: Page): Promise<any> {
    const { data } = await Axios.patch("/api/Page", { ...page });
    return data;
}

export async function deletePage(id: number): Promise<any> {
    const { data } = await Axios.delete("/api/Page", { params: { id } });
    return data;
}
