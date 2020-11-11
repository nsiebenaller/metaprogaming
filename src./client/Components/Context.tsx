import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { MatchProps, ContextType, ContextReducerType } from "./ContextTypes";

const initContext: ContextType = {
    user: undefined,
    organizations: new Array<Organization>(),
    games: new Array<Game>(),
    pages: new Array<Page>(),
    images: new Array<Image>(),
    selectedPage: undefined,
    selectedGame: undefined,
    setContext: () => {},
};
const Context = React.createContext<ContextType>(initContext);

type RouterType = RouteComponentProps | undefined;
const RouterContext = React.createContext<RouterType>(undefined);
const reduce = (prevState: any, props: ContextReducerType) => {
    return {
        ...prevState,
        ...props,
    };
};

interface Props extends RouteComponentProps<MatchProps> {
    children: React.ReactNode;
}
function ContextWrapper({ children, ...routerProps }: Props) {
    const [context, setContext] = React.useReducer(reduce, initContext);

    const contextValue: ContextType = {
        ...context,
        setContext,
    };
    return (
        <RouterContext.Provider value={routerProps}>
            <Context.Provider value={contextValue}>{children}</Context.Provider>
        </RouterContext.Provider>
    );
}

export default withRouter(ContextWrapper);
export const connectContext = () => React.useContext(Context);
export const connectRouter = () => React.useContext(RouterContext);
