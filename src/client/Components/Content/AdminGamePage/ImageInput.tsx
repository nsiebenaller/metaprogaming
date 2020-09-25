import React from "react";
import * as Util from "../../../utils/file";

interface Props {
    imageRef: React.MutableRefObject<HTMLImageElement | null>;
    image: string;
    name: string;
    onInput: (event: React.FormEvent<HTMLInputElement>) => void;
}
export default function ImageInput({ imageRef, image, name, onInput }: Props) {
    return (
        <div className={"image-input"}>
            <div className={"game"}>
                <img
                    className={"img"}
                    ref={imageRef}
                    src={`${Util.Bucket}${image}`}
                    alt={"Game Image"}
                />
                <div className={"name"}>{name}</div>
            </div>
            <input type={"file"} onInput={onInput} />
        </div>
    );
}
