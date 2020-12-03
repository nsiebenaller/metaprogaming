import React from "react";
import SideBar from "./SidePanel/SideBar";
import Content from "./Content/Content";
import { connectContext } from "@Store";

export default function App() {
    const context = connectContext();
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const init = async () => {
            await context.initialize();
            setLoading(false);
        };
        init();
    }, []);

    return React.useMemo(() => {
        if (loading) return <div>loading...</div>;
        return (
            <div className="app">
                <SideBar />
                <Content />
            </div>
        );
    }, [loading]);
}
