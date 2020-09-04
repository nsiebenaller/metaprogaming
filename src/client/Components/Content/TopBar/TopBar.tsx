import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowBack from "@material-ui/icons/ArrowBackIos";
import ArrowForward from "@material-ui/icons/ArrowForwardIos";
import { connectContext } from "../../Context";

interface Props {}
export default function TopBar(props: Props) {
    const context = connectContext()!;

    const login = async () => {
        context.history.push("/login");
    };

    const back = () => {
        if (context.location.pathname === "/") return;
        context.history.goBack();
    };
    const forward = () => context.history.goForward();

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
            {context.user && <div>Current User: {context.user}</div>}
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
