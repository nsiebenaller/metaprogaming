import React from "react";
import { Team } from "../../../types/types";

interface Props {
    team?: Team;
}
export default function TeamMatch({ team }: Props) {
    if (!team)
        return (
            <div className="bracket-match">
                <span>No Team</span>
            </div>
        );
    return (
        <div className="bracket-match">
            <img src={team.image} />
            <span>{team.name}</span>
        </div>
    );
}
