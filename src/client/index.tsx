import React from "react";
import ReactDOM from "react-dom";
import "./Less/index.less";
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
