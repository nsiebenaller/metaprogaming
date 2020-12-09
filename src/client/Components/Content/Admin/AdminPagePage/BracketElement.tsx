import { TextField } from "ebrap-ui";
import React from "react";

interface Props {
    element: BracketElement;
    handleChange: (value: string) => void;
}
export default function BracketElement(props: Props) {
    const { element, handleChange } = props;

    if (element.type === "SPACE") {
        return <SpaceElement />;
    }
    if (element.type === "TEAM") {
        return <TeamElement value={element.content} onChange={handleChange} />;
    }
    if (element.type === "TEXT") {
        return <TextElement value={element.content} onChange={handleChange} />;
    }
    return null;
}

interface ElementProps {
    value: string;
    onChange: (value: string) => void;
}
function SpaceElement() {
    return <hr className={"spacer"} />;
}
function TeamElement(props: ElementProps) {
    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        props.onChange(e.currentTarget.textContent || "");
    };

    return React.useMemo(
        () => (
            <div
                className={"page-bracket-team"}
                onInput={handleInput}
                dangerouslySetInnerHTML={{ __html: props.value }}
                contentEditable
            />
        ),
        []
    );
}
function TextElement(props: ElementProps) {
    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        props.onChange(e.currentTarget.textContent || "");
    };

    return React.useMemo(
        () => (
            <div
                onInput={handleInput}
                dangerouslySetInnerHTML={{ __html: props.value }}
                contentEditable
            />
        ),
        []
    );
}
