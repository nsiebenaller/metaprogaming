import "./types/global";
import React from "react";
import ReactDOM from "react-dom";
import config, { configure } from "./config";
import styleLoader from "./styleLoader";
import App from "./Components/app";
import Store from "./Store/Store";

async function initialize() {
    await configure();

    styleLoader.load(config.theme || "");

    ReactDOM.render(
        <Store>
            <App />
        </Store>,
        document.getElementById("root")
    );
}
initialize();
