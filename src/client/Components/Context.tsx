import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { MatchProps, ContextType, ContextStateType } from "./ContextTypes";

const initContext: ContextStateType = {
    user: null,
    conferences: new Array<Conference>(),
    organizations: new Array<Organization>(),
    games: new Array<Game>(),
    selectedDivision: undefined,
    selectedSubConference: undefined,
};
const Context = React.createContext<ContextType | undefined>(undefined);
export const connectContext = () => React.useContext(Context);

interface Props extends RouteComponentProps<MatchProps> {
    children: React.ReactNode;
}
function ContextWrapper({ children, ...routerProps }: Props) {
    const [context, setContext] = React.useState(initContext);
    const setProperty = (property: any) =>
        setContext({ ...context, ...routerProps, ...property });
    const setUser = (user: any) =>
        setContext({ ...context, ...routerProps, user });
    const setOrganizations = (organizations: Array<Organization>) =>
        setContext({ ...context, ...routerProps, organizations });
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
        setOrganizations,
        setGames,
        setSelectedDivision,
    };
    return <Context.Provider value={value}>{children}</Context.Provider>;
}
export default withRouter(ContextWrapper);
