import React from "react";
import Button from "@material-ui/core/Button";

export default function TopBar() {
    return (
        <div className={"top-bar"}>
            <Button variant={"outlined"}>Login</Button>
            <Button>Register</Button>
        </div>
    );
}
