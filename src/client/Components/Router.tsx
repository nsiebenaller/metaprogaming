import React from "react";
import {
    BrowserRouter as Router,
    Route,
    RouteComponentProps,
} from "react-router-dom";
import ContextWrapper from "./Context";

interface Props {
    children: React.ReactNode;
}
export default function RouterContextWrapper({ children }: Props) {
    return (
        <Router>
            <Route
                path={"/"}
                component={(routerProps: RouteComponentProps) => (
                    <ContextWrapper {...routerProps}>{children}</ContextWrapper>
                )}
            />
        </Router>
    );
}
