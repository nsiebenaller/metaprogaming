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

export const Bucket = "https://metaprogaming.s3.amazonaws.com/";
