import React, { useState, useEffect } from "react";
import { Team } from "../../../types/types";
import Card from "@material-ui/core/Card";
import { connectContext } from "../../Context";

interface Props {
    team: Team;
}
export default function TeamImage({ team }: Props) {
    const context = connectContext()!;

    const editTeam = () => {
        if (context.user) {
            context.history.push(`/Team/edit/${team.id}`);
        }
    };

    return (
        <Card className={"team"} onClick={editTeam}>
            <img className={"img"} src={team.imageSrc} />
            <div className={"name"}>{team.name}</div>
        </Card>
    );
}
