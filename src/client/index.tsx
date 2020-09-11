import React from "react";
import ReactDOM from "react-dom";
import "./Less/index.less";
import RouterContextWrapper from "./Components/Router";
import App from "./Components/app";

ReactDOM.render(
    <RouterContextWrapper>
        <App />
    </RouterContextWrapper>,
    document.getElementById("root")
);
