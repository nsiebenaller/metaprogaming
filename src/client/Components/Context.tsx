import React from "react";
import { RouteComponentProps } from "react-router-dom";

interface MatchProps {
    game?: string;
}
interface ContextType extends RouteComponentProps<MatchProps> {
    user: any;
    setUser: (user: any) => void;
}
const initContext = {
    user: null,
};
const Context = React.createContext<ContextType | undefined>(undefined);

interface Props extends RouteComponentProps<MatchProps> {
    children: React.ReactNode;
}
export default function ContextWrapper({ children, ...routerProps }: Props) {
    const [context, setContext] = React.useState(initContext);
    const setUser = (user: any) => setContext({ ...context, user });
    return (
        <Context.Provider value={{ ...context, ...routerProps, setUser }}>
            {children}
        </Context.Provider>
    );
}

export const connectContext = () => React.useContext(Context);
