import React from "react";
import OrgImage from "./OrgImage";
import { connectContext } from "../../Context";
import { ByName } from "../../../utils/sort";

export default function MainPage() {
    const context = connectContext()!;
    const { organizations } = context;

    if (!organizations) {
        return <div>Loading...</div>;
    }

    organizations.sort(ByName);

    return (
        <div className={"main-page"}>
            <div
                className={"main-banner"}
                style={{ backgroundImage: "url(/images/main-banner.jpg)" }}
            />
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
