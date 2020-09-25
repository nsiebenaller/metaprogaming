import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowBack from "@material-ui/icons/ArrowBackIos";
import ArrowForward from "@material-ui/icons/ArrowForwardIos";
import Home from "@material-ui/icons/Home";
import Avatar from "@material-ui/icons/AccountCircle";
import { connectContext, connectRouter } from "../../Context";
import Axios from "axios";
import Navigation from "./Navigation/Navigation";

interface Props {}
export default function TopBar(props: Props) {
    const context = connectContext()!;
    const router = connectRouter()!;

    const login = () => {
        router.history.push("/login");
    };
    const createMatch = () => {
        router.history.push("/Match/new");
    };
    const editWeeks = () => {
        router.history.push("/Weeks/edit");
    };
    const manageGames = () => {
        context.setContext({ selectedGame: undefined });
        router.history.push("/Admin/Game/");
    };

    const goBack = () => {
        if (router.location.pathname === "/") return;
        router.history.goBack();
    };
    const goForward = () => router.history.goForward();
    const goHome = () => router.history.push("/");

    const logout = async () => {
        await Axios.get("/api/logout");
        context.setContext({ user: null });
        router.history.push("/");
    };

    return (
        <div className={"top-bar"}>
            <Navigation goBack={goBack} goForward={goForward} goHome={goHome} />
            <div className={"right-side"}>
                {context.user && (
                    <Button onClick={manageGames}>Manage Games</Button>
                )}
                {context.user && (
                    <Button onClick={editWeeks}>Edit Seasons</Button>
                )}
                {context.user && (
                    <Button onClick={createMatch}>Create Match</Button>
                )}
                {context.user && (
                    <div className="user-container">
                        <Avatar />
                        <span>{context.user}</span>
                    </div>
                )}
                {context.user && <Button onClick={logout}>Logout</Button>}

                {!context.user && (
                    <React.Fragment>
                        <Button variant={"outlined"} onClick={login}>
                            Login
                        </Button>
                        <Button>Register</Button>
                    </React.Fragment>
                )}
            </div>
        </div>
    );
}
