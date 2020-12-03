import { Icon } from "ebrap-ui";
import React from "react";

interface Props {
    users: Array<User>;
    selectUser: (userId: number) => void;
}
export default function UsersList({ users, selectUser }: Props) {
    return (
        <div className={"flex-col children--bot-pad-10"}>
            {users.map((user) => (
                <UserItem key={user.id} user={user} selectUser={selectUser} />
            ))}
        </div>
    );
}

interface UserItemProps {
    user: User;
    selectUser: (userId: number) => void;
}
function UserItem({ user, selectUser }: UserItemProps) {
    const handleClick = () => selectUser(user.id);
    return (
        <div className={"user-item"} onClick={handleClick}>
            <div>
                <b>ID: </b>
                {user.id}
            </div>
            <div>
                <b>Created At: </b>
                {user.createdAt}
            </div>
            <div>
                <b>Updated At: </b>
                {user.updatedAt}
            </div>
            <div>
                <b>Username: </b>
                {user.username}
            </div>
            <div>
                <b>Email: </b>
                {user.email || <em>no email provided</em>}
            </div>
            <div>
                <b>Roles: </b>
                {user.players.length === 0 && <em>no roles</em>}
                {user.players.length > 0 && user.players.length}
            </div>
            <div>
                <b>Admin: </b>
                {!!user.admin ? "Yes" : "No"}
            </div>
            <Icon className={"icon"} iconName={"ChevronRight"} />
        </div>
    );
}
