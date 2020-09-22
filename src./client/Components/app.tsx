import React from "react";
import SidePanel from "./SidePanel/SidePanel";
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

        context.setProperty({
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
            <SidePanel />
            <Content />
        </div>
    );
}

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
