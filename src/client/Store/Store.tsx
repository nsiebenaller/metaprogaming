import React, { useReducer, useState } from "react";
import {
    BrowserRouter,
    RouteComponentProps,
    withRouter,
} from "react-router-dom";
import {
    IContext,
    IContextReducerProps,
    IContextRouter,
    IContextState,
    IContextActions,
    MatchProps,
} from "./Types";
import { state, context } from "./State";
import { wireActions } from "./Actions";

const Context = React.createContext<IContext>(context);

const reduce = (prevState: IContextState, props: IContextReducerProps) => {
    return {
        ...prevState,
        ...props,
    };
};
function wireRouter(router: RouteComponentProps<MatchProps>): IContextRouter {
    return {
        router,
        navigate: (path: string) => router.history.push(path),
        goForward: () => router.history.goForward(),
        goBack: () => router.history.goBack(),
    };
}
function setupContext(router: RouteComponentProps<MatchProps>): IContext {
    const [context, dispatch] = useReducer(reduce, state);
    const [contextActions] = useState<IContextActions>(wireActions(dispatch));
    return { ...context, ...contextActions, ...wireRouter(router) };
}

interface StoreProps extends RouteComponentProps<MatchProps> {
    children: React.ReactNode;
}
const Store = withRouter(({ children, ...router }: StoreProps) => {
    const context = setupContext(router);
    return <Context.Provider value={context}>{children}</Context.Provider>;
});

interface Props {
    children: React.ReactNode;
}
export default ({ children }: Props) => (
    <BrowserRouter>
        <Store>{children}</Store>
    </BrowserRouter>
);
export const connectContext = () => React.useContext(Context);
export const connectRouter = () => {
    const context = connectContext();
    return {
        router: context.router,
        navigate: context.navigate,
        goBack: context.goBack,
        goForward: context.goForward,
    };
};
