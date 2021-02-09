import React from "react";

interface Props {
    className?: string;
    id?: string;
    src?: string;
    style?: React.CSSProperties;
}
export default function Image(props: Props) {
    const [loaded, setLoaded] = React.useState<boolean>(false);
    const ref = React.useRef<HTMLImageElement>(null);
    const onLoad = () => setLoaded(true);
    const style = { ...props.style };
    if (!loaded) style.visibility = "hidden";
    return (
        <img
            ref={ref}
            id={props.id}
            className={props.className}
            src={props.src}
            style={style}
            onLoad={onLoad}
        />
    );
}
