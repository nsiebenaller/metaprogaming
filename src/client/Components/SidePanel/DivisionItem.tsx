import React from "react";

interface Props {
    selectedDivision: string;
    division: string;
    changeDivision: (changeDivision: string) => void;
}
export default function DivisionItem({
    division,
    selectedDivision,
    changeDivision,
}: Props) {
    const active = selectedDivision === division ? "active" : "";
    const onClick = () => changeDivision(division);
    return (
        <div className={`menu-item ${active}`} onClick={onClick}>
            <span>{division}</span>
        </div>
    );
}
