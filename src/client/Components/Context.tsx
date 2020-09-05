import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Team, Game } from "../types/types";

interface MatchProps {
    [key: string]: any;
}
interface ContextType extends RouteComponentProps<MatchProps> {
    user: any;
    teams: Array<Team>;
    games: Array<Game>;
    setProperty: (property: any) => void;
    setUser: (user: any) => void;
    setTeams: (teams: Array<Team>) => void;
    setGames: (games: Array<Game>) => void;
}
const initContext = {
    user: null,
    teams: new Array<Team>(),
    games: new Array<Game>(),
};
const Context = React.createContext<ContextType | undefined>(undefined);

interface Props extends RouteComponentProps<MatchProps> {
    children: React.ReactNode;
}
export default function ContextWrapper({ children, ...routerProps }: Props) {
    const [context, setContext] = React.useState(initContext);
    const setProperty = (property: any) =>
        setContext({ ...context, ...routerProps, ...property });
    const setUser = (user: any) =>
        setContext({ ...context, ...routerProps, user });
    const setTeams = (teams: Array<Team>) =>
        setContext({ ...context, ...routerProps, teams });
    const setGames = (games: Array<Game>) =>
        setContext({ ...context, ...routerProps, games });

    const value = {
        ...context,
        ...routerProps,
        setProperty,
        setUser,
        setTeams,
        setGames,
    };
    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export const connectContext = () => React.useContext(Context);
