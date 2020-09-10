import React from "react";
import { RouteComponentProps } from "react-router-dom";
import {
    Team,
    Game,
    Conference,
    Division,
    SubConference,
} from "../types/types";

interface MatchProps {
    [key: string]: any;
}
interface ContextType extends RouteComponentProps<MatchProps> {
    user: any;
    conferences: Array<Conference>;
    teams: Array<Team>;
    games: Array<Game>;
    selectedDivision: Division | undefined;
    selectedSubConference: SubConference | undefined;
    setProperty: (property: any) => void;
    setUser: (user: any) => void;
    setTeams: (teams: Array<Team>) => void;
    setGames: (games: Array<Game>) => void;
    setSelectedDivision: (
        selectedDivision: Division,
        selectedSubConference: SubConference
    ) => void;
}

interface ContextStateType {
    user: any;
    conferences: Array<Conference>;
    teams: Array<Team>;
    games: Array<Game>;
    selectedDivision: Division | undefined;
    selectedSubConference: SubConference | undefined;
}
const initContext: ContextStateType = {
    user: null,
    conferences: new Array<Conference>(),
    teams: new Array<Team>(),
    games: new Array<Game>(),
    selectedDivision: undefined,
    selectedSubConference: undefined,
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
    const setSelectedDivision = (
        selectedDivision: Division,
        selectedSubConference: SubConference
    ) => setContext({ ...context, selectedDivision, selectedSubConference });

    const value = {
        ...context,
        ...routerProps,
        setProperty,
        setUser,
        setTeams,
        setGames,
        setSelectedDivision,
    };
    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export const connectContext = () => React.useContext(Context);
