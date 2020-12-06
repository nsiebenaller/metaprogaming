import Axios from "axios";

export async function fetchTemplates(): Promise<Array<Template>> {
    const { data } = await Axios.get("/api/Template");
    return data;
}

export async function createTemplate(template: Template): Promise<ApiResponse> {
    try {
        const { data } = await Axios.post("/api/Template", template);
        return data;
    } catch (err) {
        return {
            success: false,
            messages: ["Error saving template"],
        };
    }
}

export async function deleteTemplate(id: number): Promise<ApiResponse> {
    const { data } = await Axios.delete("/api/Template", {
        params: { id },
    });
    return data;
}
