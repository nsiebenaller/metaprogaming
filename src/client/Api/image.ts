import Axios from "axios";

export async function fetchImages(): Promise<Array<any>> {
    const { data } = await Axios.get("/api/Image");
    return data as Array<any>;
}

export async function createImage(type: string, src: File): Promise<any> {
    const formData = new FormData();
    formData.append("type", type);
    formData.append("src", src);

    const { data } = await Axios.post("/api/Image", formData);
    return data;
}

export async function deleteImage(id: number): Promise<any> {
    const { data } = await Axios.delete("/api/Image", { params: { id } });
    return data;
}

export async function updateImageMetaData(
    id: number,
    metadata: string
): Promise<any> {
    const { data } = await Axios.patch("/api/Image", { id, metadata });
    return data;
}
