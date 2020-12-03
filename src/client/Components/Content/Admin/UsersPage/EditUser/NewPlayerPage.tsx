import React from "react";
import {
    Button,
    command,
    Dropdown,
    Multiselect,
    OptionFormat,
    TextField,
} from "ebrap-ui";
import { addPlayer, fetchRoles } from "../../../../../Api";
import Convert from "../../../../../utils/convert";
import { connectContext, connectRouter } from "../../../../../Store/Store";
import { ByName } from "../../../../../utils/sort";

const defaultPlayer: Player = {
    id: -1,
    createdAt: "",
    updatedAt: "",
    games: [],
    roles: [],
    name: "",
    gamerTag: "",
    discord: "",
};
interface Props {
    user: User;
    loadUser: () => void;
}
export default function NewPlayerPage({ user, loadUser }: Props) {
    const { games, organizations } = connectContext();
    const router = connectRouter()!;
    const [player, setPlayer] = React.useState<Player>(defaultPlayer);
    const [roles, setRoles] = React.useState<Array<Role>>([]);

    React.useEffect(() => {
        async function onMount() {
            const data = await fetchRoles();
            setRoles(data);
        }
        onMount();
    }, []);
    React.useEffect(() => {
        organizations.sort(ByName);
        games.sort(ByName);
    }, [organizations, games]);

    const handleOrganization = (option: OptionFormat) => {
        setPlayer({
            ...player,
            organizations: new Array<Organization>(Convert.to<Game>(option)),
        });
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

    const handleSave = async () => {
        if (player?.organizations?.length === 0) {
            return await command.alert("Must have an organization");
        }
        if (!player.name) {
            return await command.alert("Must have a name");
        }
        if (player?.roles?.length === 0) {
            return await command.alert("Must have at least 1 role");
        }
        const resp = await addPlayer(user.id, player);
        if (!resp.success) {
            console.log(resp);
            return await command.alert("Error Saving User");
        }
        loadUser();
        router.navigate(`/Admin/Users/${user.id}`);
    };

    const organization = player?.organizations
        ? player.organizations[0]
        : undefined;

    return (
        <div className={"flex-col children--margin-bot-10"}>
            <h2>Add Role for {user ? `'${user.username}'` : ""}</h2>
            <div className={"user-item selected children--margin-bot-10"}>
                <div>
                    <b>Organization: </b>
                    <Dropdown
                        selected={organization?.name || ""}
                        options={Convert.toOptionFormat(organizations)}
                        onChange={handleOrganization}
                    />
                </div>
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
                <Button color={"blue"} onClick={handleSave}>
                    Add Role
                </Button>
            </div>
        </div>
    );
}
