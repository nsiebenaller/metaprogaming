import React from "react";
import * as FileUtil from "../../../utils/file";

let index = 0;
let interval: number | null = null;

function useMainBannerState(images: Array<Image>) {
    const [mainBanner, setMainBanner] = React.useState<string>("");
    React.useEffect(() => {
        const iBanners = FileUtil.findAll(images, "MAIN_BANNER");
        if (iBanners.length > 0) {
            setMainBanner(iBanners[0].src);
            if (iBanners.length > 1) {
                interval = setInterval(() => {
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
    }, [images]);
    return mainBanner;
}

interface Props {
    images: Array<Image>;
}
export default function MainBanner({ images }: Props) {
    const mainBanner = useMainBannerState(images);
    const showBanner = mainBanner !== "";

    return (
        <img
            className={"main-banner"}
            src={mainBanner}
            style={{ display: showBanner ? "inline" : "none" }}
        />
    );
}
