import { connectContext } from "@Store";
import { updateUser } from "../../../Api";
import { Button, command, TextField } from "ebrap-ui";
import React from "react";

export default function MyProfile() {
    const { user: contextUser } = connectContext();
    if (!contextUser) return null;

    const [user, setUser] = React.useState<User>(contextUser);
    const setProperty = (property: string) => (value: string) =>
        setUser({ ...user, [property]: value });
    React.useEffect(() => {
        setUser(contextUser);
    }, [contextUser]);

    const [saving, setSaving] = React.useState<boolean>(false);

    const handleSave = async () => {
        if (saving) return;
        setSaving(true);

        const resp = await updateUser(user);
        if (!resp.success) {
            await command.alert(`Error ${resp.messages.join(", ")}`);
            setSaving(false);
            return;
        }

        await command.alert("Saved!");
        setSaving(false);
    };

    return (
        <div>
            <h1>My Profile</h1>
            <div className={"user-item selected children--margin-bot-10"}>
                <div>
                    <b>Username: </b>
                    <TextField
                        value={user.username || ""}
                        onChange={setProperty("username")}
                    />
                </div>
                <div>
                    <b>Email: </b>
                    <TextField
                        value={user.email || ""}
                        onChange={setProperty("email")}
                        placeholder={!user.email ? "no email" : ""}
                    />
                </div>
                <div>
                    <b>Password: </b>
                    <TextField
                        value={user.password || ""}
                        onChange={setProperty("password")}
                        type={"password"}
                    />
                </div>
                <div>
                    <b>Roles: </b>
                    {user.players.length === 0 && <em>no roles</em>}
                    {user.players.length > 0 && displayRoles(user.players)}
                </div>
                <Button color={"blue"} disabled={saving} onClick={handleSave}>
                    {saving ? "Saving..." : "Save"}
                </Button>
            </div>
        </div>
    );
}

function displayRoles(players: Array<Player>): React.ReactNode {
    return players.map((x, idx) => (
        <span key={idx}>
            {x.roles?.map((r, ridx) => (
                <b key={ridx}>
                    {r.name}
                    {comma(ridx, x.roles?.length)}
                </b>
            ))}
            {" of "}
            {x.organizations?.map((o, oidx) => (
                <b key={oidx}>
                    {o.name}
                    {comma(oidx, x.organizations?.length)}
                </b>
            ))}
            {" for "}
            {x.games?.map((g, gidx) => (
                <b key={gidx}>
                    {g.name}
                    {comma(gidx, x.games?.length)}
                </b>
            )) || <em>no games</em>}
            {comma(idx, players.length)}
        </span>
    ));
}
function comma(index: number, length: number | undefined): string {
    if (!length) return "";
    if (index !== length - 1) return ", ";
    return "";
}
