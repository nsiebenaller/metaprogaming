import React from "react";
import { TextField, Button, command } from "ebrap-ui";
import Axios from "axios";

interface Props {
    team: Team;
    refreshOrg: () => void;
}
export default function EditTeamItem({ team, refreshOrg }: Props) {
    const [currentTeam, setTeam] = React.useState(team);
    const handleTeamName = (value: string) =>
        setTeam({ ...currentTeam, name: value });

    const save = async () => {
        const { data } = await Axios.patch("/api/Team", currentTeam);
        if (data.success) {
            //await command.alert("Success!");
        } else {
            await command.alert("Error saving Team");
        }
    };
    const remove = async () => {
        const { data } = await Axios.delete("/api/Team", {
            params: { id: currentTeam.id },
        });
        if (data.success) {
            //await command.alert("Success!");
            refreshOrg();
        } else {
            await command.alert("Error deleting Team");
        }
    };

    return (
        <div className="flex-row --right-pad-10">
            <TextField
                label={"Team Name"}
                value={currentTeam.name}
                onChange={handleTeamName}
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
