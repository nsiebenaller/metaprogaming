import Axios from "axios";

let config = {
    theme: undefined,
    bucket: undefined,
};

export async function configure() {
    const { data } = await Axios.get("/api/env");
    config.theme = data.theme;
    config.bucket = data.bucket;
}

export default config;
