import React from "react";
import { Button, command } from "ebrap-ui";
import * as FileUtil from "../../../../utils/file";
import { createImage, fetchImages } from "../../../../Api";
import { connectContext } from "../../../../Store/Store";

interface Props {
    type: string;
}
export default function NewImageItem({ type }: Props) {
    const context = connectContext();
    const imageRef = React.useRef<HTMLImageElement | null>(null);
    const [banner, setBanner] = React.useState<File | undefined>();
    const [disabled, setDisabled] = React.useState<boolean>(false);

    const handleFile = (event: React.FormEvent<HTMLInputElement>) => {
        const file = FileUtil.extractFile(event);
        setBanner(file);
        if (!file) return;
        FileUtil.setImage(file, imageRef);
    };

    const uploadFile = async () => {
        setDisabled(true);
        if (!banner) {
            setDisabled(false);
            await command.alert("Please Choose a File!");
            return;
        }
        const { success, messages } = await createImage(type, banner);
        if (!success) {
            setDisabled(false);
            await command.alert(`Error: ${messages.join(", ")}`);
            return;
        }

        const images = await fetchImages();
        context.setContext({
            images,
        });
        setDisabled(false);
        setBanner(undefined);
        FileUtil.removeImage(imageRef);
        const input = document.getElementById(
            "image-input"
        ) as HTMLInputElement;
        if (!input || !input.value) return;
        input.value = "";
    };

    return (
        <div className={"image-item"}>
            <img ref={imageRef} />
            <input id={"image-input"} type={"file"} onInput={handleFile} />
            <Button color={"blue"} onClick={uploadFile} disabled={disabled}>
                {disabled ? "Uploading..." : "Upload"}
            </Button>
        </div>
    );
}
