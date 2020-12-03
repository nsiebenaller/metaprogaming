import { Button, Checkbox, command, TextField } from "ebrap-ui";
import React from "react";
import { deleteUser, removePlayer, updateUser } from "../../../../../Api";
import { connectRouter } from "../../../../../Store/Store";

interface Message {
    text: string;
    id: number;
}
let messageIndex = 0;
const timeouts = new Array<number>();
let msgs = new Array<Message>();
function useMessageState(): [Array<Message>, (text: string) => void] {
    const [messages, setMessages] = React.useState<Array<Message>>([]);
    const syncMessages = () => setMessages(msgs);
    const removeMessage = (id: number) => {
        msgs = msgs.filter((x) => x.id !== id);
        syncMessages();
    };
    const addMessage = (text: string) => {
        const message: Message = {
            text,
            id: messageIndex++,
        };
        msgs = msgs.concat(message);
        syncMessages();
        const t = setTimeout(() => {
            removeMessage(message.id);
        }, 5000);
        timeouts.push(t);
    };
    React.useEffect(() => {
        return () => {
            timeouts.forEach((t) => {
                clearTimeout(t);
            });
        };
    }, []);
    return [messages, addMessage];
}

function useUserState(
    user: User
): [User, React.Dispatch<React.SetStateAction<User>>] {
    const [userCopy, setUser] = React.useState<User>(user);
    React.useEffect(() => setUser(user), [user]);
    return [userCopy, setUser];
}

interface Props {
    user: User;
    loadUser: () => void;
}
export default function SingleUserPage({ user: iUser, loadUser }: Props) {
    const router = connectRouter()!;
    const [user, setUser] = useUserState(iUser);
    const [password, setPassword] = React.useState<string>("");
    const [saving, setSaving] = React.useState<boolean>(false);
    const [messages, addMessage] = useMessageState();

    if (!user) {
        return (
            <div>
                <h2>Manager User</h2>
                <div>loading...</div>
            </div>
        );
    }

    const handleUsername = (username: string) => {
        setUser({ ...user, username });
    };
    const handleEmail = (email: string) => {
        setUser({ ...user, email });
    };
    const handleAdmin = () => {
        setUser({ ...user, admin: !user.admin });
    };
    const handlePassword = (password: string) => {
        setPassword(password);
    };

    const handleSave = async () => {
        setSaving(true);
        const resp = await updateUser(user);
        if (!resp.success) {
            await command.alert("Error saving user");
            addMessage("Error Updating User!");
        } else {
            addMessage("Updated User!");
        }
        setSaving(false);
    };
    const handleSavePassword = async () => {
        if (!password || password === "") {
            return await command.alert("Password must not be blank!");
        }
        setSaving(true);
        const resp = await updateUser({ ...user, password: password });
        if (!resp.success) {
            await command.alert("Error updating password");
            addMessage("Error Updating Password!");
        } else {
            addMessage("Updated Password!");
        }
        setPassword("");
        setSaving(false);
    };
    const handleNewRole = () => {
        router.navigate(`/Admin/Users/${user.id}/new`);
    };
    const handleRemoveRole = async (id: number) => {
        await removePlayer(id);
        loadUser();
    };
    const handleDeleteUser = async () => {
        const confirmed = await command.confirm(
            "Are you sure you'd like to permanently delete this user? (This action cannot be undone)"
        );
        if (!confirmed) return;
        await deleteUser(user.id);
        router.navigate(`/Admin/Users`);
    };

    return (
        <div className={"flex-col children--margin-bot-10"}>
            <h2>Manage User</h2>
            <div className={"user-item selected children--margin-bot-10"}>
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
                    <TextField
                        value={user.username || ""}
                        onChange={handleUsername}
                    />
                </div>
                <div>
                    <b>Email: </b>
                    <TextField
                        value={user.email || ""}
                        onChange={handleEmail}
                        placeholder={!user.email ? "no email" : ""}
                    />
                </div>
                <div>
                    <b>Roles: </b>
                    {user.players.length === 0 && <em>no roles</em>}
                    {user.players.length > 0 &&
                        `${user.players.length} role(s)`}
                </div>
                <div className={"flex-row align-items-center"}>
                    <b>Admin?</b>
                    <Checkbox
                        value={!!user.admin}
                        label={!!user.admin ? "Yes" : "No"}
                        color={"blue"}
                        onChange={handleAdmin}
                    />
                </div>
                <Button color={"blue"} disabled={saving} onClick={handleSave}>
                    {saving ? "Saving..." : "Save"}
                </Button>
            </div>
            <h2>Roles</h2>
            <div className={"user-item selected children--margin-bot-10"}>
                <RolesList
                    players={user.players}
                    removeRole={handleRemoveRole}
                />
                <Button
                    color={"blue"}
                    disabled={saving}
                    onClick={handleNewRole}
                >
                    {saving ? "Saving..." : "Add Role"}
                </Button>
            </div>
            <h2>Change Password</h2>
            <div className={"user-item selected children--margin-bot-10"}>
                <div>
                    <b>Password: </b>
                    <TextField
                        value={password}
                        onChange={handlePassword}
                        type={"password"}
                    />
                </div>
                <Button
                    color={"blue"}
                    disabled={saving}
                    onClick={handleSavePassword}
                >
                    {saving ? "Saving..." : "Confirm"}
                </Button>
            </div>
            <Button color={"red"} onClick={handleDeleteUser}>
                Delete User
            </Button>
            {messages.map((message, key) => (
                <div key={key}>{message.text}</div>
            ))}
        </div>
    );
}

interface RolesListProps {
    players: Array<Player>;
    removeRole: (id: number) => void;
}
function RolesList({ players, removeRole }: RolesListProps) {
    if (players.length === 0) {
        return (
            <div>
                <em>no roles</em>
                <hr />
            </div>
        );
    }
    return (
        <div className={"children--margin-bot-10"}>
            {players.map((player, idx) => (
                <div
                    key={`user-player-${idx}`}
                    className={"user-item selected"}
                >
                    <div>
                        <b>ID: </b>
                        {player.id}
                    </div>
                    <div>
                        <b>Created At: </b>
                        {player.createdAt}
                    </div>
                    <div>
                        <b>Updated At: </b>
                        {player.updatedAt}
                    </div>
                    <div>
                        <b>Organization:</b>
                        {player.organizations?.map((x) => x.name).join(", ")}
                    </div>
                    <div>
                        <b>Role(s):</b>
                        {player.roles?.map((x) => x.name).join(", ")}
                    </div>
                    <div>
                        <b>Games(s):</b>
                        {player.games?.map((x) => x.name).join(", ")}
                    </div>
                    <div>
                        <b>Name: </b>
                        {player.name}
                    </div>
                    <div>
                        <b>Gamer Tag: </b>
                        {player.gamerTag}
                    </div>
                    <div>
                        <b>Discord: </b>
                        {player.discord}
                    </div>
                    <div className={"row children--margin-right-10"}>
                        {/* <Button color={"green-600"}>Edit</Button> */}
                        <Button
                            color={"red"}
                            onClick={() => removeRole(player.id)}
                        >
                            Remove
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
