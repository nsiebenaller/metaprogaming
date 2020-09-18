import React from "react";
import axios from "axios";
import SidePanel from "./SidePanel/SidePanel";
import Content from "./Content/Content";
import { connectContext } from "./Context";
import { sortConferences } from "../utils/sort";

export default function App() {
    const context = connectContext()!;

    React.useEffect(() => {
        onMount();
    }, []);
    async function onMount() {
        const { data: securityCheck } = await axios.get("/api/check");
        const user = securityCheck.verified ? securityCheck.username : null;

        const requests = [
            axios.get("/api/Game"),
            axios.get("/api/Organization"),
            axios.get("/api/Conference"),
        ];
        const [
            { data: games },
            { data: organizations },
            { data: conferences },
        ] = await Promise.all(requests);

        const imageRequests = [
            populateImages(games),
            populateImages(organizations),
        ];
        const [gameList, orgList] = await Promise.all(imageRequests);

        sortConferences(conferences);
        const selectedSubConference = conferences[0].subconferences[0];
        const selectedDivision = selectedSubConference.divisions[0];

        context.setProperty({
            games: gameList as Array<Game>,
            organizations: orgList as Array<Organization>,
            conferences,
            selectedDivision,
            selectedSubConference,
            user,
        });
    }

    return (
        <div className="app">
            <SidePanel />
            <Content />
        </div>
    );
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
