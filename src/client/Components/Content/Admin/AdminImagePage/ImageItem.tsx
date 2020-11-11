import { Button } from "ebrap-ui";
import React from "react";

interface Props {
    image: Image;
    deleteImage: (id: number) => void;
}
export default function ImageItem({ image, deleteImage }: Props) {
    const handleDelete = () => deleteImage(image.id);
    return (
        <div className={"image-item"}>
            <img src={image.src} />
            <div className={"flex-row --right-pad-10"}>
                <Button color={"red"} onClick={handleDelete}>
                    Delete
                </Button>
            </div>
        </div>
    );
}
