import React from "react";
import OrgImage from "./OrgImage";
import { connectContext } from "../../../Store/Store";
import { ByName } from "../../../utils/sort";
import MainBanner from "./MainBanner";

export default function MainPage() {
    const { organizations, images, setContext } = connectContext();

    if (!organizations) {
        return <div>Loading...</div>;
    }

    React.useEffect(() => {
        setContext({ selectedGame: undefined, selectedPage: undefined });
    }, []);

    organizations.sort(ByName);

    return (
        <div className={"main-page"}>
            <MainBanner images={images} />
            <div>
                <h1>Organizations</h1>
                <div className={"orgs-container"}>
                    {organizations.map((org: Organization, idx: number) => (
                        <OrgImage key={idx} org={org} />
                    ))}
                </div>
            </div>
        </div>
    );
}
