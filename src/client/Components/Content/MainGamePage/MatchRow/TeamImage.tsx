import React from "react";
import { Icon } from "ebrap-ui";

interface TeamImageProps {
    image?: string;
    checkedIn: boolean;
    side: string;
}
export default function TeamImage({ image, checkedIn, side }: TeamImageProps) {
    if (!image) return null;
    const className = side === "left" ? "left-icon" : "right-icon";

    return (
        <div className={"team-img-container"}>
            <img className={"team-img"} src={image} />
            {true && (
                <div className={`team-checkedin ${className}`}>
                    <Icon iconName={"Check"} color={"white"} />
                </div>
            )}
        </div>
    );
}
