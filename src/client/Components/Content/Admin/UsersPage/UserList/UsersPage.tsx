import { Button } from "ebrap-ui";
import React from "react";
import { fetchUsers } from "../../../../../Api";
import { ById } from "../../../../../utils/sort";
import UsersList from "./UsersList";

interface Props {
    redirect: (path: string) => void;
}
export default function UsersPage({ redirect }: Props) {
    const [users, setUsers] = React.useState<Array<User>>([]);

    React.useEffect(() => {
        async function onMount() {
            const data = await fetchUsers();
            data.sort(ById);
            setUsers(data);
        }
        onMount();
    }, []);

    const selectUser = (userId: number) => {
        redirect(`/Admin/Users/${userId}`);
    };

    const goToNewUser = () => {
        redirect(`/Admin/Users/new`);
    };

    return (
        <div>
            <div className={"flex-row vert-center pos-rel"}>
                <h2>Users</h2>
                <Button
                    className={"create-user-btn"}
                    colorHex={"#80ae10"}
                    hoverHex={"#99BE3F"}
                    textHex={"white"}
                    onClick={goToNewUser}
                >
                    Create User
                </Button>
            </div>
            <UsersList users={users} selectUser={selectUser} />
        </div>
    );
}
