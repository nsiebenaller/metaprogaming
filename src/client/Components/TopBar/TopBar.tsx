import React from "react";
import { Button } from "ebrap-ui";
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

    return (
        <div className={"top-bar"}>
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
                        <Button color={"grey-800"} onClick={login}>
                            Login
                        </Button>
                    </React.Fragment>
                )}
            </div>
        </div>
    );
}
