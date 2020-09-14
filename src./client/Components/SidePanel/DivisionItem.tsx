import React from "react";
import { Division } from "../../types/types";

interface Props {
    selectedDivision: Division | undefined;
    division: Division;
    changeDivision: (division: Division) => void;
}
export default function DivisionItem({
    division,
    selectedDivision,
    changeDivision,
}: Props) {
    const active =
        selectedDivision && selectedDivision.id === division.id ? "active" : "";
    const onClick = () => changeDivision(division);
    return (
        <div className={`menu-item ${active}`} onClick={onClick}>
            <span>{division.name}</span>
        </div>
    );
}
