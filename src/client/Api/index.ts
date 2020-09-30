import Axios from "axios";

export async function fetchOrganizations(): Promise<Array<Organization>> {
    const { data: organizations } = await Axios.get("/api/Organization");
    //const organizations = await populateImages(data);
    return organizations as Array<Organization>;
}

export async function fetchGames(): Promise<Array<Game>> {
    const { data: games } = await Axios.get("/api/Game");
    //const games = await populateImages(data);
    return games as Array<Game>;
}

export async function fetchConferences(): Promise<Array<Conference>> {
    const { data } = await Axios.get("/api/Conference");
    return data as Array<Conference>;
}

export async function checkUser(): Promise<any> {
    const { data } = await Axios.get("/api/check");
    return data;
}

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

export async function deleteMatch(id: number): Promise<any> {
    const { data } = await Axios.delete("/api/Match", { params: { id } });
    return data;
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

export async function updateOrganization(
    id: number,
    name: string,
    image?: File
): Promise<any> {
    const formData = new FormData();
    if (image) formData.append("image", image);
    formData.append("id", id.toString());
    formData.append("name", name);

    const { data } = await Axios.patch("/api/Organization", formData);
    return data;
}

export async function getMatches(): Promise<Array<Match>> {
    const { data } = await Axios.get("/api/Match");
    return data as Array<Match>;
}

export async function updateMatch(props: any): Promise<any> {
    const { data } = await Axios.patch("/api/Match", props);
    return data;
}

export async function getSeasons(
    GameId: number,
    GameTypeId: number | null
): Promise<any> {
    const { data } = await Axios.get("/api/Season", {
        params: { GameId, GameTypeId },
    });
    return data;
}

export async function createSeason(
    name: string,
    startDate: Date,
    numWeeks: number,
    GameId: number | null,
    GameTypeId: number | null
): Promise<any> {
    const { data } = await Axios.post("/api/Season", {
        name,
        startDate,
        numWeeks,
        GameId,
        GameTypeId,
    });
    return data;
}

export async function setActiveSeason(id: number): Promise<any> {
    const { data } = await Axios.patch("/api/Season", { id });
    return data;
}

export async function deleteSeason(id: number): Promise<any> {
    const { data } = await Axios.delete("/api/Season", { params: { id } });
    return data;
}

// File test stuff
export async function getFile(fileName: string): Promise<File | undefined> {
    const { data } = await Axios({
        url: "/api/file",
        method: "GET",
        responseType: "blob",
        params: {
            fileName,
        },
    });
    const blob = new Blob([data]);
    if (blob.size === 0) {
        console.log("No File!");
        return;
    }
    const file = new File([data], fileName);
    console.log(file);
    return file;
    //downloadFile(data, fileName);
}

export async function uploadFile(file: File): Promise<any> {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await Axios.post("/api/upload", formData);
    console.log(data);
}

interface ImageRef {
    image: string;
    [key: string]: any;
}
async function populateImages(
    objects: Array<ImageRef>
): Promise<Array<ImageRef>> {
    const promises: Array<Promise<string>> = [];
    objects.forEach((g) => {
        promises.push(
            new Promise(async (resolve: (value?: string) => void) => {
                const raw = await fetch(g.image);
                const blob = await raw.blob();
                const url = URL.createObjectURL(blob);
                resolve(url.toString());
            })
        );
    });
    const images = await Promise.all(promises);
    return objects.map((g, i) => ({ ...g, imageSrc: images[i] }));
}
function downloadFile(data: string, filename: string) {
    if (navigator.appVersion.toString().indexOf(".NET") > 0) {
        window.navigator.msSaveBlob(data, filename);
    } else {
        const url = (<any>window).URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
