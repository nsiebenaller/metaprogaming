import React from "react";
import { Route } from "react-router-dom";
import OrgPage from "./OrgPage";
import EditOrgPage from "./EditOrgPage";
import AddPlayerPage from "./AddPlayerPage";

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
            <Route
                path={"/Organization/:orgId/add_player"}
                exact
                component={({ match }: any) => <AddPlayerPage match={match} />}
            />
        </React.Fragment>
    );
}
