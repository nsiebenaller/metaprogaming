import React from "react";
import SideBar from "./SidePanel/SideBar";
import Content from "./Content/Content";
import { connectContext } from "./Context";
import {
    fetchOrganizations,
    fetchGames,
    checkUser,
    fetchPages,
    fetchImages,
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
            pages,
            images,
        ] = await Promise.all([
            checkUser(),
            fetchGames(),
            fetchOrganizations(),
            fetchPages(),
            fetchImages(),
        ]);
        const user = securityCheck.verified ? securityCheck.user : null;

        context.setContext({
            games,
            pages,
            images,
            organizations,
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
