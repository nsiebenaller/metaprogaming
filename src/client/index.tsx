import React from "react";
import ReactDOM from "react-dom";
import RouterContextWrapper from "./Components/Router";
import App from "./Components/app";

ReactDOM.render(
    <RouterContextWrapper>
        <App />
    </RouterContextWrapper>,
    document.getElementById("root")
);
