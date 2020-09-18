import React from "react";
import logo from "../../Assets/logo.png";
import neccLogo from "../../Assets/necc-logo.png";
import DivisionItem from "./DivisionItem";
import { connectContext } from "../Context";
import { sortConference } from "../../utils/sort";

export default function SidePanel() {
    const context = connectContext()!;

    let shouldDisplay = true;
    if (context.conferences.length === 0) shouldDisplay = false;
    const neccConference = context.conferences[0];

    const goHome = () => {
        context.history.push("/");
    };

    const changeDivision = (subconference: SubConference) => (
        division: Division
    ) => {
        context.setSelectedDivision(division, subconference);
    };

    sortConference(neccConference);

    return (
        <div className="side-panel">
            <div className={"logo-container"} onClick={goHome}>
                <img className={"side-panel-logo"} src={logo} />
            </div>
            <div className={"conference-item active"}>
                <img className={"conference-logo"} src={neccLogo} />
            </div>
            {shouldDisplay &&
                neccConference.subconferences &&
                neccConference.subconferences.map(
                    (sub: SubConference, idx: number) => (
                        <div key={idx} className="subconference-header">
                            <b className="subconference-name">{sub.name}</b>
                            {sub.divisions &&
                                sub.divisions.map(
                                    (division: Division, idx: number) => (
                                        <DivisionItem
                                            key={idx}
                                            division={division}
                                            selectedDivision={
                                                context.selectedDivision
                                            }
                                            changeDivision={changeDivision(sub)}
                                        />
                                    )
                                )}
                        </div>
                    )
                )}
        </div>
    );
}
