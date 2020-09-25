import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowBack from "@material-ui/icons/ArrowBackIos";
import ArrowForward from "@material-ui/icons/ArrowForwardIos";
import Home from "@material-ui/icons/Home";

interface Props {
    goBack: () => void;
    goForward: () => void;
    goHome: () => void;
}
export default function Navigation({ goBack, goForward, goHome }: Props) {
    return (
        <div className={"navigation"}>
            <ButtonGroup>
                <Button onClick={goBack}>
                    <ArrowBack fontSize="small" />
                </Button>
                <Button onClick={goForward}>
                    <ArrowForward fontSize="small" />
                </Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button onClick={goHome}>
                    <Home fontSize="small" />
                </Button>
            </ButtonGroup>
        </div>
    );
}
