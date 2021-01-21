import React from "react";
import axios from "axios";
import { TextField, Button, Multiselect, command } from "ebrap-ui";
import { connectContext } from "../../../Store/Store";
import { updatePlayer } from "../../../Api";

interface Props {
    player: Player;
    orgId: number;
    roles: Array<Role>;
    refreshOrg: () => void;
}
export default function EditPlayerItem({
    player,
    orgId,
    roles,
    refreshOrg,
}: Props) {
    const context = connectContext()!;

    const [currentPlayer, setPlayer] = React.useState(player);
    const setPlayerParam = (param: string) => (value: any) =>
        setPlayer({ ...currentPlayer, [param]: value });

    const save = async () => {
        let GameIds = new Array();
        if (currentPlayer.games) GameIds = currentPlayer.games.map(getId);
        let RoleIds = new Array();
        if (currentPlayer.roles) RoleIds = currentPlayer.roles.map(getId);

        const response = await updatePlayer(currentPlayer);
        if (!response.success) {
            await command.alert("Error saving player");
            return;
        }
        await command.snackbar("Player Saved!");
        refreshOrg();
    };
    const remove = async () => {
        await axios.delete("/api/OrganizationPlayers", {
            params: { OrganizationId: orgId, PlayerId: player.id },
        });
        await axios.delete("/api/Player", { params: { id: player.id } });
        refreshOrg();
    };

    let selectedGames = new Array();
    if (currentPlayer.games) selectedGames = currentPlayer.games.map(addValue);

    let allGames = new Array();
    if (context.games) allGames = context.games.map(addValue);

    let selectedRoles = new Array();
    if (currentPlayer.roles) selectedRoles = currentPlayer.roles.map(addValue);

    const allRoles = roles.map(addValue);

    return (
        <div className="edit-player-item">
            <TextField
                label={"Name"}
                value={currentPlayer.name || ""}
                onChange={setPlayerParam("name")}
            />
            <TextField
                label={"Gamer Tag"}
                value={currentPlayer.gamerTag || ""}
                onChange={setPlayerParam("gamerTag")}
            />
            <TextField
                label={"Discord"}
                value={currentPlayer.discord || ""}
                onChange={setPlayerParam("discord")}
            />
            <Multiselect
                label={"Games"}
                placeholder={"Select Games"}
                selected={selectedGames}
                options={allGames}
                onChange={setPlayerParam("games")}
            />
            <Multiselect
                label={"Roles"}
                placeholder={"Select Roles"}
                selected={selectedRoles}
                options={allRoles}
                onChange={setPlayerParam("roles")}
            />
            <Button topPad onClick={save} color="blue-500">
                Save
            </Button>
            <Button topPad onClick={remove} color="red-500">
                Remove
            </Button>
        </div>
    );
}

function addValue(a: Game | Role) {
    return { ...a, value: a.name };
}

function getId(a: Game | Role) {
    return a.id;
}
