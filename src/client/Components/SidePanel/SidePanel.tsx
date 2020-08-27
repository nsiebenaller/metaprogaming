import React from "react";
import logo from "../../Assets/logo.png";
import DNS from "@material-ui/icons/Dns";
import Group from "@material-ui/icons/Group";

export default function SidePanel() {
    return (
        <div className="side-panel">
            <div className={"logo-container"}>
                <img className={"side-panel-logo"} src={logo} />
            </div>
            <div className={"menu-item active"}>
                <Group />
                <span>Divisons</span>
            </div>
            <div className={"menu-item"}>
                <DNS />
                <span>Teams</span>
            </div>
        </div>
    );
}
