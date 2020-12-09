import {
    checkUser,
    fetchGames,
    fetchImages,
    fetchOrganizations,
    fetchPages,
    fetchRoles,
} from "../Api";
import { IContextActions, IContextReducerProps } from "./Types";

type Dispatch = React.Dispatch<IContextReducerProps>;

const Actions = {
    initialize,
    loadOrganizations,
    loadRoles,
    loadGames,
    loadPages,
    loadUser,
    loadImages,
    setContext,
};
export function wireActions(dispatch: Dispatch): IContextActions {
    let actions: any = {};
    Object.entries(Actions).forEach(([key, fn]) => {
        actions[key] = fn(dispatch);
    });
    return actions;
}

function initialize(dispatch: Dispatch) {
    return async () => {
        console.log("initialize");
        await Promise.all([
            loadOrganizations(dispatch)(),
            loadRoles(dispatch)(),
            loadGames(dispatch)(),
            loadPages(dispatch)(),
            loadUser(dispatch)(),
            loadImages(dispatch)(),
        ]);
    };
}
function loadOrganizations(dispatch: Dispatch) {
    return async () => {
        const organizations = await fetchOrganizations();
        dispatch({ organizations });
    };
}
function loadRoles(dispatch: Dispatch) {
    return async () => {
        const roles = await fetchRoles();
        dispatch({ roles });
    };
}
function loadGames(dispatch: Dispatch) {
    return async () => {
        const games = await fetchGames();
        dispatch({ games });
    };
}
function loadPages(dispatch: Dispatch) {
    return async () => {
        const pages = await fetchPages();
        dispatch({ pages });
    };
}
function loadUser(dispatch: Dispatch) {
    return async () => {
        const check = await checkUser();
        dispatch({ user: check.verified ? check.user : null });
    };
}
function loadImages(dispatch: Dispatch) {
    return async () => {
        const images = await fetchImages();
        dispatch({ images });
    };
}
function setContext(dispatch: Dispatch) {
    return (props: IContextReducerProps) => {
        dispatch(props);
    };
}
