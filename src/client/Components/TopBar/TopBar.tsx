import React from "react";
import { Button, Icon } from "ebrap-ui";
import { connectContext } from "@Store";
import Axios from "axios";
import Navigation from "./Navigation/Navigation";

export default function TopBar() {
    const context = connectContext();

    const login = () => {
        context.navigate("/login");
        context.setContext({
            selectedGame: undefined,
            selectedPage: undefined,
        });
    };
    const goBack = () => {
        if (context?.router?.location.pathname === "/") return;
        context.goBack();
    };
    const goForward = () => {
        context.goForward();
    };
    const goHome = () => {
        context.navigate("/");
        context.setContext({
            selectedGame: undefined,
            selectedPage: undefined,
        });
    };
    const goAdmin = () => {
        context.navigate("/Admin");
        context.setContext({
            selectedGame: undefined,
            selectedPage: undefined,
        });
    };
    const goMyProfile = () => {
        context.navigate("/MyProfile");
        context.setContext({
            selectedGame: undefined,
            selectedPage: undefined,
        });
    };

    const logout = async () => {
        context.navigate("/");
        context.setContext({
            user: undefined,
            selectedGame: undefined,
            selectedPage: undefined,
        });
        await Axios.get("/api/logout");
    };

    const openMobileMenu = () => {
        const sidePanel = document.getElementsByClassName("side-panel")[0];
        sidePanel.className = "side-panel mobile-side-panel";
        const content = document.getElementsByClassName("content")[0];
        content.className = "content mobile-content";
        const handleSidePanelClick = () => {
            sidePanel.removeEventListener("click", handleSidePanelClick);
            content.removeEventListener("click", handleContentClick);
            sidePanel.className = "side-panel";
            content.className = "content";
        };
        const handleContentClick = () => {
            sidePanel.removeEventListener("click", handleSidePanelClick);
            content.removeEventListener("click", handleSidePanelClick);
            sidePanel.className = "side-panel";
            content.className = "content";
        };
        sidePanel.addEventListener("click", handleSidePanelClick);
        content.addEventListener("click", handleContentClick);
    };

    return (
        <div className={"top-bar"}>
            <Button
                className={"main-menu-btn"}
                colorHex={"#424242"}
                textHex={"white"}
                hoverHex={"#616161"}
                onClick={openMobileMenu}
            >
                <Icon iconName={"Menu"} />
            </Button>
            <Navigation goBack={goBack} goForward={goForward} goHome={goHome} />
            <div className={"right-side"}>
                <div className={"action-btns"}>
                    {context.user?.admin && (
                        <button onClick={goAdmin}>Admin</button>
                    )}
                    {context.user && (
                        <button onClick={goMyProfile}>My Profile</button>
                    )}
                    {context.user && (
                        <div className="user-container">
                            <span>{context.user.username}</span>
                        </div>
                    )}
                    {context.user && <button onClick={logout}>Logout</button>}
                </div>

                {!context.user && (
                    <React.Fragment>
                        <Button className={"top-bar-btn"} color={"grey-800"} onClick={login}>
                            Login
                        </Button>
                    </React.Fragment>
                )}
            </div>
        </div>
    );
}
