import React from "react";
import { Check } from "@material-ui/icons";
import * as Util from "../../../../utils/file";

interface TeamImageProps {
    image?: string;
    checkedIn: boolean;
}
export default function TeamImage({ image, checkedIn }: TeamImageProps) {
    if (!image) return null;
    return (
        <div className={"team-img-container"}>
            <img className={"team-img"} src={`${Util.Bucket}${image}`} />
            {checkedIn && (
                <div className={"team-checkedin"}>
                    <Check />
                </div>
            )}
        </div>
    );
}
