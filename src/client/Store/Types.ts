import { RouteComponentProps } from "react-router-dom";

export interface MatchProps {
    [key: string]: any;
}
export type ContextAction = () =>
    | void
    | Promise<void>
    | Promise<() => void>
    | Promise<() => Promise<void>>;

export interface IContextActions {
    initialize: ContextAction;
    loadOrganizations: ContextAction;
    loadRoles: ContextAction;
    loadGames: ContextAction;
    loadPages: ContextAction;
    loadUser: ContextAction;
    loadImages: ContextAction;
    setContext: (props: IContextReducerProps) => void;
}
export interface IContextState {
    user: User | undefined;
    organizations: Array<Organization>;
    games: Array<Game>;
    pages: Array<Page>;
    images: Array<Image>;
    roles: Array<Role>;
    selectedPage: Page | undefined;
    selectedGame: Game | undefined;
}
export interface IContextRouter {
    router: RouteComponentProps | undefined;
    navigate: (path: string) => void;
    goBack: () => void;
    goForward: () => void;
}

export interface IContext
    extends IContextActions,
        IContextState,
        IContextRouter {}

export interface IContextReducerProps {
    user?: User;
    organizations?: Array<Organization>;
    games?: Array<Game>;
    pages?: Array<Page>;
    images?: Array<Image>;
    roles?: Array<Role>;
    selectedPage?: Page;
    selectedGame?: Game;
}
