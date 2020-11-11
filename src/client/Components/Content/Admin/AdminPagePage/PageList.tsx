import React from "react";

interface Props {
    pages: Array<Page>;
    navCreatePage: () => void;
    navEditPage: (id: number) => void;
}
export default function PageList({ pages, navCreatePage, navEditPage }: Props) {
    const handleClick = (id: number) => () => navEditPage(id);
    return (
        <div className={"flex-row"}>
            {pages.map((p, idx) => (
                <div
                    key={idx}
                    className={"page-item"}
                    onClick={handleClick(p.id)}
                >
                    <div>{p.name}</div>
                    <em>{p.hidden === true ? "(Hidden)" : ""}</em>
                </div>
            ))}
            <div className={"page-item"} onClick={navCreatePage}>
                Create New Page
            </div>
        </div>
    );
}
