import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowBack from "@material-ui/icons/ArrowBackIos";
import ArrowForward from "@material-ui/icons/ArrowForwardIos";
import Avatar from "@material-ui/icons/AccountCircle";
import { connectContext } from "../../Context";
import Axios from "axios";

interface Props {}
export default function TopBar(props: Props) {
    const context = connectContext()!;

    const login = () => {
        context.history.push("/login");
    };
    const createMatch = () => {
        context.history.push("/Match/new");
    };
    const editWeeks = () => {
        context.history.push("/Weeks/edit");
    };

    const back = () => {
        if (context.location.pathname === "/") return;
        context.history.goBack();
    };
    const forward = () => context.history.goForward();

    const logout = async () => {
        await Axios.get("/api/logout");
        context.setUser(null);
        context.history.push("/");
    };

    return (
        <div className={"top-bar"}>
            <ButtonGroup className={"arrow-container"}>
                <Button onClick={back}>
                    <ArrowBack fontSize="small" />
                </Button>
                <Button onClick={forward}>
                    <ArrowForward fontSize="small" />
                </Button>
            </ButtonGroup>
            {context.user && <Button onClick={editWeeks}>Edit Seasons</Button>}
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
    );
}
