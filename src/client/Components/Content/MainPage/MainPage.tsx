import React from "react";
import GameImage from "./GameImage";
import OrgImage from "./OrgImage";
import { connectContext } from "../../Context";
import { ByName } from "../../../utils/sort";

export default function MainPage() {
    const context = connectContext()!;
    const {
        games,
        organizations,
        selectedDivision,
        selectedSubConference,
    } = context;

    if (!selectedDivision || !selectedSubConference)
        return <div>Loading...</div>;

    const selectedOrgs = getSelectedOrgs(selectedSubConference, organizations);
    selectedOrgs.sort(ByName);

    return (
        <div className={"main-page"}>
            <h1>
                {selectedSubConference.name} {selectedDivision.name}
            </h1>
            <div className={"games-container"}>
                {games.map((game: Game, idx: number) => (
                    <GameImage key={idx} game={game} />
                ))}
            </div>
            <div>
                <h1>{selectedSubConference.name} Organizations</h1>
                <div className={"orgs-container"}>
                    {selectedOrgs.map((org: Organization, idx: number) => (
                        <OrgImage key={idx} org={org} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function getSelectedOrgs(
    subconference: SubConference | undefined,
    allOrganizations: Array<Organization>
): Array<Organization> {
    if (!subconference || !subconference.organizations)
        return new Array<Organization>();
    const ids = subconference.organizations.map((x) => x.id);
    return allOrganizations.filter((x) => ids.includes(x.id));
}
