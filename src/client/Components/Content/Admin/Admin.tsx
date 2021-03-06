import React from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import { connectContext, connectRouter } from "../../../Store/Store";

import AdminGamePage from "./AdminGamePage/AdminGamePage";
import AdminPagePage from "./AdminPagePage/AdminPagePage";
import AdminImagePage from "./AdminImagePage/AdminImagePage";
import EditWeeksPage from "./EditWeeksPage/EditWeeksPage";
import CreateSeasonPage from "./CreateSeasonPage/CreateSeasonPage";
import NewOrgPage from "./AdminCreateOrg/NewOrgPage";
import NewMatchPage from "./NewMatchPage/NewMatchPage";
import AdminRouteHandler from "./AdminRouteHandler";
import EditMatchPage from "./EditMatchPage/EditMatchPage";
import UserRouter from "./UsersPage/UserRouter";

export default function Admin() {
    const context = connectContext()!;
    const router = connectRouter()!;

    const redirect = (path: string) => {
        context.setContext({ selectedGame: undefined });
        router.navigate(path);
    };

    return (
        <div>
            <h1>Admin Management</h1>
            <Route path={"/Admin"} exact>
                <AdminRouteHandler redirect={redirect} />
            </Route>
            <Route
                path={"/Admin/Game/:gameId?"}
                exact
                component={renderAdminGamePage}
            />
            <Route
                path={"/Admin/Page/:pageId?"}
                exact
                component={renderAdminPagePage}
            />
            <Route path={"/Admin/images"} exact component={AdminImagePage} />
            <Route
                path={"/Admin/Season/edit"}
                exact
                component={EditWeeksPage}
            />
            <Route
                path={"/Admin/Season/new"}
                exact
                component={CreateSeasonPage}
            />
            <Route path={"/Admin/Users"} component={UserRouter} />
            <Route path={"/Admin/Org/new"} component={NewOrgPage} />
            <Route path={"/Admin/Match/new"} exact component={NewMatchPage} />
            <Route
                path={"/Admin/Match/edit/:matchId"}
                exact
                component={renderEditMatchPage}
            />
        </div>
    );
}

interface MatchProps {
    gameId?: string;
    matchId?: string;
    pageId?: string;
    userId?: string;
}

function renderAdminGamePage(props: RouteComponentProps<MatchProps>) {
    const {
        match: {
            params: { gameId },
        },
    } = props;
    if (!gameId) return <AdminGamePage gameId={undefined} />;
    return <AdminGamePage gameId={gameId} />;
}

function renderAdminPagePage(props: RouteComponentProps<MatchProps>) {
    const {
        match: {
            params: { pageId },
        },
    } = props;
    if (pageId === "new") return <AdminPagePage isNewPage />;
    const id = pageId ? parseInt(pageId) : undefined;
    return <AdminPagePage pageId={id} />;
}

function renderEditMatchPage(props: RouteComponentProps<MatchProps>) {
    const {
        match,
        match: {
            params: { matchId },
        },
    } = props;
    if (!matchId) return null;
    return <EditMatchPage match={match} />;
}
