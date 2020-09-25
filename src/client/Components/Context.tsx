import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { MatchProps, ContextType, ContextReducerType } from "./ContextTypes";

const initContext: ContextType = {
    user: null,
    conferences: new Array<Conference>(),
    organizations: new Array<Organization>(),
    games: new Array<Game>(),
    selectedGame: undefined,
    selectedDivision: undefined,
    selectedSubConference: undefined,
    setContext: () => {},
};
const Context = React.createContext<ContextType>(initContext);
const RouterContext = React.createContext<RouteComponentProps | undefined>(
    undefined
);
const reduce = (prevState: any, props: ContextReducerType) => ({
    ...prevState,
    ...props,
});

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
