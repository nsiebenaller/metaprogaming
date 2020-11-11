import React from "react";
import { Button } from "ebrap-ui";
import Avatar from "@material-ui/icons/AccountCircle";
import { connectContext, connectRouter } from "../../Context";
import Axios from "axios";
import Navigation from "./Navigation/Navigation";

interface Props {}
export default function TopBar(props: Props) {
    const context = connectContext()!;
    const router = connectRouter()!;

    const login = () => {
        context.setContext({ selectedGame: undefined });
        router.history.push("/login");
    };
    const goBack = () => {
        context.setContext({ selectedGame: undefined });
        if (router.location.pathname === "/") return;
        router.history.goBack();
    };
    const goForward = () => {
        context.setContext({ selectedGame: undefined });
        router.history.goForward();
    };
    const goHome = () => {
        context.setContext({ selectedGame: undefined });
        router.history.push("/");
    };
    const goAdmin = () => {
        context.setContext({ selectedGame: undefined });
        router.history.push("/Admin");
    };

    const logout = async () => {
        await Axios.get("/api/logout");
        context.setContext({ user: undefined });
        router.history.push("/");
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
                        <div className="user-container">
                            <Avatar />
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
