import {
    Button,
    command,
    Multiselect,
    OptionFormat,
    TextField,
} from "ebrap-ui";
import React from "react";
import {
    addPlayer,
    createUser,
    fetchRoles,
    fetchUserByEmail,
} from "../../../Api";
import Convert from "../../../utils/convert";
import { connectContext } from "../../../Store/Store";
import * as Sec from "../../../utils/security";

function useOrgIdState(match: any): number {
    const init = match?.params?.orgId || -1;
    const [orgId, setOrgId] = React.useState<number>(parseInt(init));
    React.useEffect(() => {
        const id = match?.params?.orgId;
        if (id) {
            setOrgId(parseInt(id));
        }
    }, [match]);
    return orgId;
}

const defaultUser: User = {
    id: -1,
    createdAt: "",
    updatedAt: "",
    email: "",
    password: "",
    players: [],
    username: "",
    admin: false,
};

const defaultPlayer: Player = {
    id: -1,
    createdAt: "",
    updatedAt: "",
    name: "",
    gamerTag: "",
    discord: "",
    games: [],
    organizations: [],
    roles: [],
};

interface Props {
    match: any;
}
export default function AddPlayerPage({ match }: Props) {
    const { games, user: currentUser, roles: allRoles } = connectContext();

    const orgId = useOrgIdState(match);
    const [searchEmail, setSearchEmail] = React.useState<string>("");
    const [user, setUser] = React.useState<User>();
    const [password, setPassword] = React.useState<string>("");
    const [player, setPlayer] = React.useState<Player>(defaultPlayer);
    const [roles, setRoles] = React.useState<Array<Role>>([]);

    React.useEffect(() => {
        const roles = getRelevantRoles(currentUser, orgId, allRoles);
        setRoles(roles);
    }, [allRoles, currentUser]);

    const setPropery = (property: string) => (value: string) => {
        setUser({ ...user!, [property]: value });
    };
    const handleGames = (options: Array<OptionFormat>) => {
        setPlayer({ ...player, games: Convert.all<Game>(options) });
    };
    const handleRoles = (options: Array<OptionFormat>) => {
        setPlayer({ ...player, roles: Convert.all<Role>(options) });
    };
    const handleText = (property: string) => (text: string) => {
        setPlayer({ ...player, [property]: text });
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = await fetchUserByEmail(searchEmail);
        if (!data) {
            setUser({ ...defaultUser, email: searchEmail });
        } else {
            setUser(data);
        }
    };

    const handleSave = async () => {
        // Validate form
        if (user?.id === -1) {
            if (!user?.username) {
                return await command.alert("Username is required!");
            }
            if (!user?.email) {
                return await command.alert("Email is required!");
            }
            if (!user?.password) {
                return await command.alert("Password is required!");
            }
            if (user?.password !== password) {
                return await command.alert("Passwords must match!");
            }
        }
        if (!player.name) {
            return await command.alert("Player name is required!");
        }
        if (!player.roles || player.roles.length === 0) {
            return await command.alert("At least one role is required!");
        }

        // Check if User needs to be created
        let iUser = user;
        if (user?.id === -1) {
            const userResp = await createUser(user);
            if (!userResp.success) {
                return await command.alert(
                    `Error: ${userResp.messages.join(", ")}`
                );
            }
            const data = await fetchUserByEmail(user?.email || "");
            if (!data) {
                return await command.alert("An error has occurred");
            }
            iUser = data;
        }
        if (!iUser) {
            return await command.alert("An error has occurred");
        }

        // Add Player to User
        const org: Organization = {
            id: orgId,
            name: "",
            image: "",
        };
        const iPlayer = { ...player, organizations: [org] };
        const playerResp = await addPlayer(iUser.id, iPlayer);
        if (!playerResp.success) {
            return await command.alert(
                `Error: ${playerResp.messages.join(", ")}`
            );
        }
        await command.alert("Player created!");
    };

    return (
        <div>
            <h2>Add Player</h2>
            <h4>Search by Email:</h4>
            <form
                className={"row children--margin-right-10"}
                onSubmit={handleSearch}
            >
                <TextField value={searchEmail} onChange={setSearchEmail} />
                <Button color={"blue"} onClick={handleSearch}>
                    Search
                </Button>
            </form>
            {user?.id === -1 && (
                <UserForm
                    user={user}
                    password={password}
                    setPassword={setPassword}
                    setPropery={setPropery}
                />
            )}
            {user?.id !== -1 && user?.id !== undefined && (
                <UserDisplay user={user} />
            )}
            {user?.id !== undefined && (
                <PlayerForm
                    player={player}
                    games={games}
                    roles={roles}
                    handleGames={handleGames}
                    handleRoles={handleRoles}
                    handleText={handleText}
                />
            )}
            <br />
            {user?.id !== undefined && (
                <Button color={"blue"} onClick={handleSave}>
                    Add Player
                </Button>
            )}
        </div>
    );
}

function getRelevantRoles(
    currentUser: User | undefined,
    orgId: number,
    roles: Array<Role>
): Array<Role> {
    if (!currentUser) return [];
    if (Sec.isAdmin(currentUser)) return roles;
    if (Sec.isOrgDirector(orgId, currentUser)) return roles;
    if (Sec.isOrgCoach(orgId, currentUser)) {
        return roles.filter((x) => x.name !== "Director");
    }
    return [];
}

interface UserFormProps {
    user: User;
    password: string;
    setPassword: (value: string) => void;
    setPropery: (property: string) => (value: string) => void;
}
function UserForm({ user, password, setPassword, setPropery }: UserFormProps) {
    return (
        <div>
            <h4>User not found!</h4>
            <h4>Create User Account</h4>
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
                </div>
            </div>
        </div>
    );
}

interface UserDisplayProps {
    user: User;
}
function UserDisplay({ user }: UserDisplayProps) {
    return (
        <div>
            <h4>Is this the right user?</h4>
            <div className={"user-item selected"}>
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
            </div>
        </div>
    );
}

interface PlayerFormProps {
    player: Player;
    games: Array<Game>;
    roles: Array<Role>;
    handleGames: (options: Array<OptionFormat>) => void;
    handleRoles: (options: Array<OptionFormat>) => void;
    handleText: (property: string) => (value: string) => void;
}
function PlayerForm({
    player,
    games,
    roles,
    handleGames,
    handleRoles,
    handleText,
}: PlayerFormProps) {
    return (
        <div>
            <h4>Define Player</h4>
            <div className={"user-item selected children--margin-bot-10"}>
                <div>
                    <b>Game(s): </b>
                    <Multiselect
                        selected={Convert.toOptionFormat(player?.games || [])}
                        options={Convert.toOptionFormat(games)}
                        onChange={handleGames}
                    />
                </div>
                <div>
                    <b>Role(s): </b>
                    <Multiselect
                        selected={Convert.toOptionFormat(player?.roles || [])}
                        options={Convert.toOptionFormat(roles)}
                        onChange={handleRoles}
                    />
                </div>
                <div>
                    <b>Name: </b>
                    <TextField
                        value={player.name}
                        onChange={handleText("name")}
                    />
                </div>
                <div>
                    <b>Gamer Tag: </b>
                    <TextField
                        value={player.gamerTag}
                        onChange={handleText("gamerTag")}
                    />
                </div>
                <div>
                    <b>Discord: </b>
                    <TextField
                        value={player.discord}
                        onChange={handleText("discord")}
                    />
                </div>
            </div>
        </div>
    );
}
