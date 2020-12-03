import React from "react";
import { Link } from "react-router-dom";

interface Props {
    page: Page;
    selected: boolean;
    selectPage: (page: Page) => void;
}
export default function PageItem({ page, selected, selectPage }: Props) {
    const handleClick = () => selectPage(page);
    return (
        <Link
            className={`menu-item ${selected ? "active" : ""}`}
            onClick={handleClick}
            to={`/Page/${page.id}`}
        >
            <span>{page.name}</span>
        </Link>
    );
}
