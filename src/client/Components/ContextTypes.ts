export interface MatchProps {
    [key: string]: any;
}

export interface ContextType {
    user?: User;
    organizations: Array<Organization>;
    games: Array<Game>;
    pages: Array<Page>;
    images: Array<Image>;
    selectedPage: Page | undefined;
    selectedGame: Game | undefined;
    setContext: (props: ContextReducerType) => void;
}

export interface ContextReducerType {
    user?: User;
    organizations?: Array<Organization>;
    games?: Array<Game>;
    pages?: Array<Page>;
    images?: Array<Image>;
    selectedPage?: Page;
    selectedGame?: Game;
}
