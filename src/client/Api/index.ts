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
