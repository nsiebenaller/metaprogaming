import { Button, Checkbox, command, TextField } from "ebrap-ui";
import React from "react";
import { createUser } from "../../../../../Api";

const newUser: User = {
    id: -1,
    createdAt: "",
    updatedAt: "",
    email: "",
    username: "",
    password: "",
    players: [],
    admin: false,
};
export default function NewUserPage() {
    const [user, setUser] = React.useState<User>(newUser);
    const setPropery = (property: string) => (value: string) => {
        setUser({ ...user, [property]: value });
    };
    const handleAdmin = () => {
        setUser({ ...user, admin: !user.admin });
    };
    const [password, setPassword] = React.useState<string>("");
    const [saving, setSaving] = React.useState<boolean>(false);
    const handleSave = async () => {
        if (user.password !== password) {
            await command.alert("Passwords must match!");
            return;
        }

        const response = await createUser(user);
        if (!response.success) {
            await command.alert(response.messages.join(", "));
            return;
        }
        await command.alert("Success!");
        setUser(newUser);
        setPassword("");
    };

    return (
        <div>
            <h2>Create User</h2>
            <div className={"flex-col children--bot-pad-10"}>
                <div className={"user-item selected children--bot-pad-10"}>
                    <div>
                        <b className={"lg-width"}>Username: </b>
                        <TextField
                            value={user.username || ""}
                            onChange={setPropery("username")}
                        />
                    </div>
                    <div>
                        <b className={"lg-width"}>Email: </b>
                        <TextField
                            value={user.email || ""}
                            onChange={setPropery("email")}
                        />
                    </div>
                    <div>
                        <b className={"lg-width"}>Password: </b>
                        <TextField
                            value={user.password || ""}
                            onChange={setPropery("password")}
                            type={"password"}
                        />
                    </div>
                    <div>
                        <b className={"lg-width"}>Confirm Password: </b>
                        <TextField
                            value={password}
                            onChange={setPassword}
                            type={"password"}
                        />
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
            </div>
        </div>
    );
}
