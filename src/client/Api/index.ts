import Axios from "axios";

export * from "./game";
export * from "./image";
export * from "./match";
export * from "./org";
export * from "./page";
export * from "./player";
export * from "./role";
export * from "./template";
export * from "./user";

export async function fetchLeaderboard(SeasonId: number): Promise<any> {
    const params = { params: { SeasonId } };
    const { data } = await Axios.get("/api/Leaderboard", params);
    return data;
}

export async function fetchConferences(): Promise<Array<Conference>> {
    const { data } = await Axios.get("/api/Conference");
    return data as Array<Conference>;
}

export async function checkUser(): Promise<any> {
    const { data } = await Axios.get("/api/check");
    return data;
}

export async function getSeasons(
    GameId: number,
    GameTypeId?: number | null
): Promise<any> {
    const params = { params: { GameId, GameTypeId } };
    const { data } = await Axios.get("/api/Season", params);
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

export async function setActiveSeason(
    GameId: number,
    GameTypeId?: number,
    id?: number
): Promise<any> {
    const { data } = await Axios.patch("/api/Season", {
        GameId,
        GameTypeId,
        id,
    });
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
}

export async function uploadFile(file: File): Promise<any> {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await Axios.post("/api/upload", formData);
    console.log(data);
}

// interface ImageRef {
//     image: string;
//     [key: string]: any;
// }
// async function populateImages(
//     objects: Array<ImageRef>
// ): Promise<Array<ImageRef>> {
//     const promises: Array<Promise<string>> = [];
//     objects.forEach((g) => {
//         promises.push(
//             new Promise(async (resolve: (value?: string) => void) => {
//                 const raw = await fetch(g.image);
//                 const blob = await raw.blob();
//                 const url = URL.createObjectURL(blob);
//                 resolve(url.toString());
//             })
//         );
//     });
//     const images = await Promise.all(promises);
//     return objects.map((g, i) => ({ ...g, imageSrc: images[i] }));
// }
// function downloadFile(data: string, filename: string) {
//     if (navigator.appVersion.toString().indexOf(".NET") > 0) {
//         window.navigator.msSaveBlob(data, filename);
//     } else {
//         const url = (<any>window).URL.createObjectURL(new Blob([data]));
//         const link = document.createElement("a");
//         link.href = url;
//         link.setAttribute("download", filename);
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     }
// }
