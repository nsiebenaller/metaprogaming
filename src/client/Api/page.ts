import Axios from "axios";

export async function fetchPages(): Promise<Array<Page>> {
    const { data } = await Axios.get("/api/Page");
    return data;
}

export async function createPage(
    name: string,
    content: string,
    hidden: boolean
): Promise<CreateResponse> {
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

export async function addPageComponent(
    pageComponent: PageComponent
): Promise<CreateResponse> {
    const { data } = await Axios.post("/api/PageComponent", pageComponent);
    return data;
}
export async function updatePageComponent(
    pageComponent: PageComponent
): Promise<ApiResponse> {
    const { data } = await Axios.patch("/api/PageComponent", pageComponent);
    return data;
}
export async function deletePageComponent(id: number): Promise<ApiResponse> {
    const { data } = await Axios.delete("/api/PageComponent", {
        params: { id },
    });
    return data;
}
