import { Icon } from "ebrap-ui";
import React from "react";
import Image from "@/Shared/Image";
import * as FileUtil from "@/utils/file";
import * as css from "./styles";

let index = 0;
let interval: any | null = null;

type Func = () => void;
type Str = string | undefined;
function useMainBannerState(images: Array<Image>): [Str, Str, Func, Func] {
    const [mainBanner, setMainBanner] = React.useState<string>("");
    const [mainLink, setMainLink] = React.useState<string>();
    const clear = (): any => (interval ? clearInterval(interval) : null);
    const init = (index?: number) => {
        const mainBanners = FileUtil.findAll(images, "MAIN_BANNER");
        const defaultIndex = index !== undefined ? index : 0;
        const initBanner = mainBanners[defaultIndex];
        if (mainBanners.length > 0) {
            setMainBanner(initBanner.src);
            setMainLink(JSON.parse(initBanner.metadata)?.link);
        }
    };
    const start = () => {
        const mainBanners = FileUtil.findAll(images, "MAIN_BANNER");
        if (mainBanners.length > 1) {
            interval = setInterval(() => {
                index++;
                if (!mainBanners[index]) index = 0;
                setMainBanner(mainBanners[index].src);
                setMainLink(JSON.parse(mainBanners[index].metadata)?.link);
            }, 8000);
        }
    };
    React.useEffect(() => {
        init();
        start();
        return () => {
            clear();
        };
    }, [images]);
    const nextImage = () => {
        const mainBanners = FileUtil.findAll(images, "MAIN_BANNER");
        const numImages = mainBanners.length;
        index = index >= numImages - 1 ? 0 : index + 1;
        clear();
        init(index);
        start();
    };
    const prevImage = () => {
        const mainBanners = FileUtil.findAll(images, "MAIN_BANNER");
        const numImages = mainBanners.length;
        index = index <= 0 ? numImages - 1 : index - 1;
        clear();
        init(index);
        start();
    };
    return [mainBanner, mainLink, nextImage, prevImage];
}

interface Props {
    images: Array<Image>;
}
export default function MainBanner({ images }: Props) {
    const [mainBanner, mainLink, nextImage, prevImage] = useMainBannerState(
        images
    );
    const showBanner = mainBanner !== "";
    const showControls = showBanner && images.length > 1;

    const handlePrev = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        event.preventDefault();
        prevImage();
    };
    const handleNext = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        event.preventDefault();
        nextImage();
    };

    return (
        <css.Row>
            {showControls && (
                <Icon
                    className={"nav-arrow left"}
                    iconName={"ChevronLeft"}
                    color={"grey-200"}
                    onClick={handlePrev}
                    cursorPointer
                />
            )}

            <BannerLink link={mainLink}>
                <Image
                    className={"main-banner"}
                    src={mainBanner}
                    style={{ display: showBanner ? "inline" : "none" }}
                />
            </BannerLink>
            {showControls && (
                <Icon
                    className={"nav-arrow right"}
                    iconName={"ChevronRight"}
                    color={"grey-200"}
                    onClick={handleNext}
                    cursorPointer
                />
            )}
        </css.Row>
    );
}

interface BannerLinkProps {
    link: string | undefined;
    children: React.ReactNode;
}
function BannerLink({ link, children }: BannerLinkProps) {
    if (link) {
        return (
            <a
                href={link}
                style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "flex-start",
                }}
                title={link}
            >
                {children}
            </a>
        );
    }
    return <css.BannerLinkWrapper>{children}</css.BannerLinkWrapper>;
}
