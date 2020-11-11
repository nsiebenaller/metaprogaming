import Axios from "axios";

export async function fetchOrganizations(): Promise<Array<Organization>> {
    const { data: organizations } = await Axios.get("/api/Organization");
    return organizations as Array<Organization>;
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

export async function createOrganization(
    name: string,
    image: File
): Promise<any> {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);

    const { data } = await Axios.post("/api/Organization", formData);
    return data;
}

export async function deleteOrganization(id: number): Promise<any> {
    const { data } = await Axios.delete("/api/Organization", {
        params: { id },
    });
    return data;
}
