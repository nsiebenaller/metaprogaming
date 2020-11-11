import config from "../config";

export const Bucket = config.bucket;

export function extractFile(
    event: React.FormEvent<HTMLInputElement>
): File | undefined {
    const target = event.target as HTMLInputElement;
    if (!target.files) return undefined;
    const file = Array.from(target.files)[0];
    return file;
}

export function setBanner(
    file: File,
    ref: React.MutableRefObject<HTMLDivElement | null>
) {
    const { current } = ref;
    if (!current) return;
    const reader = new FileReader();
    reader.onload = () => {
        current.style.backgroundImage = `url(${reader.result})`;
    };
    reader.readAsDataURL(file);
}

export function setImage(
    file: File,
    ref: React.MutableRefObject<HTMLImageElement | null>
) {
    const { current } = ref;
    if (!current) return;
    const reader = new FileReader();
    reader.onload = () => {
        if (!reader.result) return;
        current.setAttribute("src", reader.result.toString());
    };
    reader.readAsDataURL(file);
}

export function removeImage(
    ref: React.MutableRefObject<HTMLImageElement | null>
) {
    const { current } = ref;
    if (!current) return;
    current.setAttribute("src", "");
}

export function findOne(images: Array<Image>, type: string): Image | undefined {
    return images.find((x) => x.type === type);
}

export function findAll(images: Array<Image>, type: string): Array<Image> {
    return images.filter((x) => x.type === type);
}
