import React from "react";
import logo from "../../Assets/logo.png";
import neccLogo from "../../Assets/necc-logo-2.png";
import DivisionItem from "./DivisionItem";

interface Props {
    selectedDivision: string;
    changeDivision: (changeDivision: string) => void;
}
export default function SidePanel({ selectedDivision, changeDivision }: Props) {
    return (
        <div className="side-panel">
            <div className={"logo-container"}>
                <img className={"side-panel-logo"} src={logo} />
            </div>
            <div className={"conference-item active"}>
                <img className={"conference-logo"} src={neccLogo} />
            </div>
            <DivisionItem
                division={"Division 1"}
                selectedDivision={selectedDivision}
                changeDivision={changeDivision}
            />
            <DivisionItem
                division={"Division 2"}
                selectedDivision={selectedDivision}
                changeDivision={changeDivision}
            />
        </div>
    );
}
