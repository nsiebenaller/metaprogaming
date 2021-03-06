import React from "react";
import { connectContext } from "../../../../Store/Store";
import { command } from "ebrap-ui";
import { fetchImages, deleteImage, updateImageMetaData } from "../../../../Api";
import ImageItem from "./ImageItem";
import NewImageItem from "./NewImageItem";
import { ById } from "../../../../utils/sort";

type ImageMap = Map<string, Array<Image>>;

export default function AdminImagePage() {
    const context = connectContext();
    const { images } = context;

    const [imageMap, setImageMap] = React.useState<ImageMap>(new Map());

    React.useEffect(() => {
        const map: ImageMap = new Map();

        map.set("MAIN_BANNER", new Array<Image>());

        images.forEach((image) => {
            const type = image.type;
            const images = map.get(type);

            if (!images) {
                const newImages = new Array<Image>();
                newImages.push(image);
                map.set(type, newImages);
            } else {
                images.push(image);
                map.set(type, images);
            }
        });

        setImageMap(map);
    }, [images]);

    const handleDeleteImage = async (id: number) => {
        const confirmed = await command.confirm(
            "Are you sure you want to delete this image?"
        );
        if (!confirmed) {
            return;
        }

        await deleteImage(id);
        const images = await fetchImages();
        context.setContext({
            images,
        });
    };

    const handleSaveMetaData = async (id: number, metadata: string) => {
        await updateImageMetaData(id, metadata);
        context.loadImages();
    };

    images.sort(ById);

    return (
        <div>
            <h2>Manage Images</h2>

            {Array.from(imageMap.keys()).map((type, index) => {
                const images = imageMap.get(type) || new Array<Image>();
                return (
                    <React.Fragment key={index}>
                        <h4>Type: {type}</h4>
                        <div className={"flex-row --right-pad-10"}>
                            {images.map((image, idx) => (
                                <ImageItem
                                    key={image.id}
                                    image={image}
                                    deleteImage={handleDeleteImage}
                                    saveMetaData={handleSaveMetaData}
                                />
                            ))}
                            <NewImageItem type={type} />
                        </div>
                    </React.Fragment>
                );
            })}
            {/* <img className={"main-banner"} src={mainBanner} ref={imageRef} />
            <input type={"file"} onInput={handleFile} />
            <br />
            <Button onClick={saveMainBanner} color="blue-500" topPad>
                Save
            </Button> */}
        </div>
    );
}
