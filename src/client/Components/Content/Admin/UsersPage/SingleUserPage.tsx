import { Button, Checkbox, command, TextField } from "ebrap-ui";
import React from "react";
import { fetchUser, updateUser } from "../../../../Api";

let messageIndex = 0;
interface Message {
    text: string;
    id: number;
}
let messages = new Array<Message>();

interface Props {
    userId: number;
}
const timeouts = new Array<number>();
export default function SingleUserPage({ userId }: Props) {
    const [user, setUser] = React.useState<User | undefined>();
    const [password, setPassword] = React.useState<string>("");
    const [saving, setSaving] = React.useState<boolean>(false);
    const [msgs, setMsgs] = React.useState<Array<Message>>([]);
    const syncMessages = () => setMsgs(messages);

    const removeMessage = (id: number) => {
        messages = messages.filter((x) => x.id !== id);
        syncMessages();
    };
    const addMessage = (text: string) => {
        const message: Message = {
            text,
            id: messageIndex++,
        };
        messages = messages.concat(message);
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

    React.useEffect(() => {
        async function onMount() {
            const data = await fetchUser(userId);
            if (!data) {
                await command.alert("Error fetching user");
                return;
            }
            setUser(data);
        }
        onMount();
    }, [userId]);

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
        const success = await updateUser(user);
        if (!success) {
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
        const success = await updateUser({ ...user, password: password });
        if (!success) {
            await command.alert("Error updating password");
            addMessage("Error Updating Password!");
        } else {
            addMessage("Updated Password!");
        }
        setPassword("");
        setSaving(false);
    };

    return (
        <div className={"flex-col children--bot-pad-10"}>
            <h2>Manager User</h2>
            <div className={"user-item selected children--bot-pad-10"}>
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
                <Button
                    color={"blue"}
                    disabled={saving}
                    onClick={handleSave}
                    topPad
                >
                    {saving ? "Saving..." : "Save"}
                </Button>
            </div>
            <h2>Change Password</h2>
            <div className={"user-item selected children--bot-pad-10"}>
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
                    topPad
                >
                    {saving ? "Saving..." : "Confirm"}
                </Button>
            </div>
            {msgs.map((message, key) => (
                <div key={key}>{message.text}</div>
            ))}
        </div>
    );
}
