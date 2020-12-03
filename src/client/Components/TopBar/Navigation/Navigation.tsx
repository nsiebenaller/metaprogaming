import React from "react";
import { Icon } from "ebrap-ui";

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
                    <Icon
                        iconName={"NavigateBefore"}
                        color={"white"}
                        cursorPointer
                    />
                </button>
                <button
                    className={
                        "cursor-pointer background--grey-800 hover-background--grey-700"
                    }
                    onClick={goForward}
                >
                    <Icon
                        iconName={"NavigateNext"}
                        color={"white"}
                        cursorPointer
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
                    <Icon
                        iconName={"Home"}
                        color={"white"}
                        className={"width-18"}
                        cursorPointer
                    />
                </button>
            </div>
        </div>
    );
}
