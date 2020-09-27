import React from "react";
import * as Util from "../../../utils/file";

interface Props {
    banner: string;
    gameName: string;
    gameTypeName: string;
}
export default function Banner({ banner, gameName, gameTypeName }: Props) {
    return (
        <div className={"banner-container"}>
            <div
                className={"banner-img"}
                style={{
                    backgroundImage: `url(${Util.Bucket}${banner})`,
                }}
            />
            <div className={"banner-title-container"}>
                <div className={"banner-title"}>{gameName}</div>
                <div className={"banner-subtitle"}>{gameTypeName}</div>
            </div>
        </div>
    );
}
