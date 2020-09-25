import { RouteComponentProps } from "react-router-dom";

export interface MatchProps {
    [key: string]: any;
}
// export interface ContextType
//     extends RouteComponentProps<MatchProps>,
//         ContextStateType {
//     setProperty: (property: any) => void;
//     setUser: (user: any) => void;
//     setOrganizations: (teams: Array<Organization>) => void;
//     setGames: (games: Array<Game>) => void;
//     setSelectedDivision: (
//         selectedDivision: Division,
//         selectedSubConference: SubConference
//     ) => void;
// }

export interface ContextType {
    user: any;
    conferences: Array<Conference>;
    organizations: Array<Organization>;
    games: Array<Game>;
    selectedGame: Game | undefined;
    selectedDivision: Division | undefined;
    selectedSubConference: SubConference | undefined;
    setContext: (props: ContextReducerType) => void;
}

export interface ContextReducerType {
    user?: any;
    conferences?: Array<Conference>;
    organizations?: Array<Organization>;
    games?: Array<Game>;
    selectedGame?: Game;
    selectedDivision?: Division;
    selectedSubConference?: SubConference;
}
