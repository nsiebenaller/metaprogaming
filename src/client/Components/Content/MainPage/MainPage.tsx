import React from "react";
import OrgImage from "./OrgImage";
import { connectContext } from "../../Context";
import { ByName } from "../../../utils/sort";
import * as FileUtil from "../../../utils/file";

let index = 0;
let interval: number | null = null;
export default function MainPage() {
    const context = connectContext()!;
    const { organizations } = context;

    if (!organizations) {
        return <div>Loading...</div>;
    }

    const [mainBanner, setMainBanner] = React.useState<string>("");

    React.useEffect(() => {
        const iBanners = FileUtil.findAll(context.images, "MAIN_BANNER");

        if (iBanners.length > 0) {
            setMainBanner(iBanners[0].src);

            if (iBanners.length > 1) {
                interval = setInterval(() => {
                    console.log("Change Banner!");
                    index++;
                    if (!iBanners[index]) index = 0;
                    setMainBanner(iBanners[index].src);
                }, 8000);
            }
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [context]);

    React.useEffect(() => {
        organizations.sort(ByName);
    }, [organizations]);

    const showBanner = mainBanner !== "";

    return (
        <div className={"main-page"}>
            <img
                className={"main-banner"}
                src={mainBanner}
                style={{ display: showBanner ? "inline" : "none" }}
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
