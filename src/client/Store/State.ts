import {
    IContext,
    IContextActions,
    IContextState,
    IContextRouter,
} from "./Types";

export const state: IContextState = {
    user: undefined,
    organizations: new Array<Organization>(),
    games: new Array<Game>(),
    pages: new Array<Page>(),
    images: new Array<Image>(),
    roles: new Array<Role>(),
    selectedPage: undefined,
    selectedGame: undefined,
};

export const actions: IContextActions = {
    initialize: () => {},
    loadOrganizations: () => {},
    loadRoles: () => {},
    loadGames: () => {},
    loadPages: () => {},
    loadUser: () => {},
    loadImages: () => {},
    setContext: () => {},
};

export const router: IContextRouter = {
    router: undefined,
    navigate: () => {},
    goBack: () => {},
    goForward: () => {},
};

export const context: IContext = { ...state, ...actions, ...router };
