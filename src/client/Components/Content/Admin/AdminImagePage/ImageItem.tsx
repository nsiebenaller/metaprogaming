import { Icon, TextField } from "ebrap-ui";
import React from "react";
import * as css from "./styles";

interface Props {
    image: Image;
    deleteImage: (id: number) => void;
    saveMetaData: (id: number, metadata: string) => void;
}
export default function ImageItem({ image, deleteImage, saveMetaData }: Props) {
    const [link, setLink] = React.useState<string>(() => {
        const meta = JSON.parse(image.metadata);
        if (meta && meta.link) return meta.link;
        return "";
    });
    const handleDelete = () => deleteImage(image.id);
    const handleSave = () => saveMetaData(image.id, JSON.stringify({ link }));
    return (
        <div className={"image-item"}>
            <img src={image.src} />
            <css.Row>
                <TextField
                    placeholder={"Link (ex: https://google.com)"}
                    value={link}
                    onChange={setLink}
                />
                <Icon
                    className={"save-icon"}
                    iconName={"Save"}
                    onClick={handleSave}
                    cursorPointer
                />
            </css.Row>
            <css.Row>
                <Icon
                    className={"delete-icon"}
                    iconName={"Delete"}
                    onClick={handleDelete}
                    cursorPointer
                />
            </css.Row>
        </div>
    );
}
