import { command } from "ebrap-ui";
import React from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import { fetchUser } from "../../../../Api";
import { connectContext, connectRouter } from "../../../../Store/Store";
import NewPlayerPage from "./EditUser/NewPlayerPage";
import NewUserPage from "./NewUser/NewUserPage";
import SingleUserPage from "./EditUser/SingleUserPage";
import UsersPage from "./UserList/UsersPage";

export default function UserRouter() {
    const context = connectContext()!;
    const router = connectRouter()!;

    const redirect = (path: string) => {
        context.setContext({
            selectedGame: undefined,
            selectedPage: undefined,
        });
        router.navigate(path);
    };

    return (
        <div>
            <Route path={"/Admin/Users/new"} exact component={NewUserPage} />
            <Route path={"/Admin/Users"} exact>
                <UsersPage redirect={redirect} />
            </Route>
            <Route path={"/Admin/Users/:userId"} component={singleUser} />
        </div>
    );
}

interface MatchProps {
    userId?: string;
}
function singleUser(props: RouteComponentProps<MatchProps>) {
    const { userId } = props.match.params;
    if (!userId) return null;
    const id = parseInt(userId);

    const [user, setUser] = React.useState<User>();
    async function loadUser() {
        const data = await fetchUser(id);
        if (!data) {
            await command.alert("Error fetching user");
            return;
        }
        setUser(data);
    }
    React.useEffect(() => {
        loadUser();
    }, [id]);

    if (!user) return null;
    return (
        <React.Fragment>
            <Route path={"/Admin/Users/:userId"} exact>
                <SingleUserPage user={user} loadUser={loadUser} />
            </Route>
            <Route path={"/Admin/Users/:userId/new"} exact>
                <NewPlayerPage user={user} loadUser={loadUser} />
            </Route>
        </React.Fragment>
    );
}
