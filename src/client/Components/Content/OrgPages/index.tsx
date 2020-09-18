import React from "react";
import { Route } from "react-router-dom";
import OrgPage from "./OrgPage";
import EditOrgPage from "./EditOrgPage";

export default function index() {
    return (
        <React.Fragment>
            <Route
                path={"/Organization/:orgId"}
                exact
                component={({ match }: any) => <OrgPage match={match} />}
            />
            <Route
                path={"/Organization/edit/:orgId"}
                exact
                component={({ match }: any) => <EditOrgPage match={match} />}
            />
        </React.Fragment>
    );
}
