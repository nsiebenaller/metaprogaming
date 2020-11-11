import React from "react";

interface Props {
    page: Page;
    selected: boolean;
    selectPage: (page: Page) => void;
}
export default function PageItem({ page, selected, selectPage }: Props) {
    const handleClick = () => selectPage(page);
    return (
        <div
            className={`menu-item ${selected ? "active" : ""}`}
            onClick={handleClick}
        >
            <span>{page.name}</span>
        </div>
    );
}
