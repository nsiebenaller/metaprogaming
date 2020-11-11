import React, { useState, useEffect } from "react";
import { Dropdown, OptionFormat } from "ebrap-ui";
import Convert from "../../utils/convert";
import { ByName } from "../../utils/sort";

const noOrg: OptionFormat = {
    id: -1,
    value: "No Organization",
    name: "No Organization",
    image: "",
};
const noTeam: OptionFormat = {
    id: -1,
    value: "No Team",
    name: "No Team",
};

interface Props {
    type: string;
    organizations: Array<Organization>;
    organization?: Organization;
    team?: Team;
    setOrganization: (organization?: Organization) => void;
    setTeam: (team?: Team) => void;
}
export default function OrgTeamSelector(props: Props) {
    const [organizations, setOrganizations] = useState<Array<OptionFormat>>([]);
    const [teams, setTeams] = useState<Array<OptionFormat>>([]);

    useEffect(() => {
        props.organizations.sort(ByName);
        const options = [noOrg].concat(
            Convert.toOptionFormat(props.organizations)
        );
        setOrganizations(options);
    }, [props.organizations]);
    useEffect(() => {
        if (!props.organization || !props.organization.teams) {
            setTeams([]);
            return;
        }
        props.organization.teams.sort(ByName);
        const options = [noTeam].concat(
            Convert.toOptionFormat(props.organization.teams)
        );
        setTeams(options);
    }, [props.organization]);

    const handleOrganization = (option: OptionFormat) => {
        const org = Convert.toOrganization(option);
        if (org.id === props.organization?.id) return;
        setTeams(Convert.toOptionFormat(org.teams || []));
        props.setTeam();
        props.setOrganization(org);
    };
    const handleTeam = (option: OptionFormat) => {
        const team = Convert.toTeam(option);
        if (team.id === props.team?.id) return;
        props.setTeam(team);
    };

    let teamPlaceholder = "Select a Team";
    if (teams.length === 0) {
        teamPlaceholder = "No Teams";
    }

    return (
        <div className={"flex-row children--right-pad-10"}>
            <Dropdown
                label={`${props.type} Organization`}
                placeholder={"Select a Organization"}
                selected={props.organization?.name || ""}
                options={organizations}
                onChange={handleOrganization}
                botPad
            />
            <Dropdown
                label={`${props.type} Team`}
                placeholder={teamPlaceholder}
                selected={props.team?.name || ""}
                options={teams}
                onChange={handleTeam}
                noOptionsText={"No Teams"}
                botPad
            />
        </div>
    );
}
