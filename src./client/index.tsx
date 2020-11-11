import React from "react";
import ReactDOM from "react-dom";
import config from "./config.js";

if (config.theme === "necc") {
    console.log("Load necc theme");
    import("./Less/necc_theme/index.less");
} if(config.theme === "army") {
    console.log("Load army theme");
    import("./Less/army_theme/index.less");
}else {
    console.log("Load meta theme");
    import("./Less/meta_theme/index.less");
}

import "./types/global";
import { BrowserRouter } from "react-router-dom";
import ContextWrapper from "./Components/Context";
import App from "./Components/app";

ReactDOM.render(
    <BrowserRouter>
        <ContextWrapper>
            <App />
        </ContextWrapper>
    </BrowserRouter>,
    document.getElementById("root")
);
