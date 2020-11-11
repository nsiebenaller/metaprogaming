import React from "react";
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
        <div className={"navigation children--right-pad-10"}>
            <div className={"btn-group fill--grey-100"}>
                <button
                    className={
                        "cursor-pointer background--grey-800 hover-background--grey-700"
                    }
                    onClick={goBack}
                >
                    <ArrowBack className={"fill--grey-100"} fontSize="small" />
                </button>
                <button
                    className={
                        "cursor-pointer background--grey-800 hover-background--grey-700"
                    }
                    onClick={goForward}
                >
                    <ArrowForward
                        className={"fill--grey-100"}
                        fontSize="small"
                    />
                </button>
            </div>
            <div className={"btn-group"}>
                <button
                    className={
                        "cursor-pointer background--grey-800 hover-background--grey-700"
                    }
                    onClick={goHome}
                >
                    <Home className={"fill--grey-100"} fontSize="small" />
                </button>
            </div>
        </div>
    );
}
