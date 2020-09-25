import React from "react";
import SideBar from "./SidePanel/SideBar";
import Content from "./Content/Content";
import { connectContext } from "./Context";
import { sortConferences } from "../utils/sort";
import {
    fetchOrganizations,
    fetchGames,
    fetchConferences,
    checkUser,
} from "../Api";

export default function App() {
    const context = connectContext()!;
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        refreshContext();
    }, []);
    async function refreshContext() {
        const [
            securityCheck,
            games,
            organizations,
            conferences,
        ] = await Promise.all([
            checkUser(),
            fetchGames(),
            fetchOrganizations(),
            fetchConferences(),
        ]);
        const user = securityCheck.verified ? securityCheck.username : null;

        sortConferences(conferences);

        const selectedSubConference = getFirstSubConference(conferences);
        const selectedDivision = getFirstDivision(selectedSubConference);

        context.setContext({
            games,
            organizations,
            conferences,
            selectedDivision,
            selectedSubConference,
            user,
        });
        setLoading(false);
    }

    if (loading) return <div>loading...</div>;

    return (
        <div className="app">
            <SideBar />
            <Content />
        </div>
    );
}

/**
 * const handleFile = (event: React.FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        if (!target.files) return;
        const file = Array.from(target.files)[0];
        setFile(file);
    };
 * const upload = () => {
        if (!file) return;
        uploadFile(file);
    };
    const fetchFile = async () => {
        const file = await getFile(text);
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e: any) => {
            document
                .getElementById("img")
                ?.setAttribute("src", e.target.result);
        };
        reader.readAsDataURL(file);
    };
 * <div>
                <input type={"file"} onInput={handleFile} />
                <button onClick={upload}>upload</button>
                <input
                    type={"text"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setText(e.target.value)
                    }
                />
                <button onClick={fetchFile}>fetch</button>
                <img
                    id="img"
                    src={"https://metaprogaming.s3.amazonaws.com/anchor.jpg"}
                />
            </div>
 */

function getFirstSubConference(
    conferences: Array<Conference> | undefined
): SubConference | undefined {
    if (!conferences || conferences.length === 0) return undefined;
    const conference = conferences[0];
    if (
        !conference ||
        !conference.subconferences ||
        conference.subconferences.length === 0
    ) {
        return undefined;
    }

    const subConference = conference.subconferences[0];
    if (!subConference) return undefined;
    return subConference;
}
function getFirstDivision(
    subConference: SubConference | undefined
): Division | undefined {
    if (
        !subConference ||
        !subConference.divisions ||
        subConference.divisions.length === 0
    ) {
        return undefined;
    }

    return subConference.divisions[0];
}
