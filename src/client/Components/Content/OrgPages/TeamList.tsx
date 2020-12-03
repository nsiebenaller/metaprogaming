import { Button, TextField } from "ebrap-ui";
import React from "react";
import EditTeamItem from "./EditTeamItem";
import * as Sec from "../../../utils/security";

interface Props {
    orgId: number;
    user: User | undefined;
    teams: Array<Team>;
    newTeam: string;
    loadOrganization: () => void;
    handleNewTeam: (teamName: string) => void;
    createTeam: () => void;
}
export default function TeamList(props: Props) {
    if (canEdit(props.orgId, props.user)) {
        return (
            <div>
                <h4>Teams</h4>
                {props.teams.map((team: Team, key: number) => (
                    <EditTeamItem
                        key={rand(key)}
                        team={team}
                        refreshOrg={props.loadOrganization}
                    />
                ))}
                {props.teams.length === 0 && <div>No Teams</div>}
                <div className="flex-row --right-pad-10">
                    <TextField
                        label={"New Team Name"}
                        value={props.newTeam}
                        onChange={props.handleNewTeam}
                    />
                    <Button onClick={props.createTeam} color="blue-500" topPad>
                        Create
                    </Button>
                </div>
            </div>
        );
    }
    return (
        <div>
            <h4>Teams</h4>
            <div className={"flex-col children--bot-pad-10"}>
                {props.teams.map((team: Team, key: number) => (
                    <div
                        className={
                            "card background--grey-800 hover-background--grey-700"
                        }
                        key={key}
                    >
                        {team.name}
                    </div>
                ))}
            </div>
        </div>
    );
}

function canEdit(orgId: number, user: User | undefined) {
    if (Sec.isAdmin(user)) return true;
    if (Sec.isOrgDirector(orgId, user)) return true;
    if (Sec.isOrgCoach(orgId, user)) return true;
    return false;
}

function rand(key: number): string {
    return `${key}-${Math.random() * 100}`;
}
