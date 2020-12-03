import React from "react";
import PlayerItem from "./PlayerItem";
import * as Sec from "../../../utils/security";
import EditPlayerItem from "./EditPlayerItem";
import { Button } from "ebrap-ui";
import { connectRouter } from "../../../Store/Store";
import { fetchRoles } from "../../../Api";

interface Props {
    user: User | undefined;
    organization: Organization;
    loadOrganization: () => void;
}
export default function PlayerList({
    organization,
    user,
    loadOrganization,
}: Props) {
    if (!organization.players) return null;
    const router = connectRouter()!;
    const [roles, setRoles] = React.useState<Array<Role>>(new Array<Role>());
    const [directors, coaches, captains, players] = sortPlayers(
        organization.players
    );

    const loadRoles = async () => setRoles(await fetchRoles());
    React.useEffect(() => {
        loadRoles();
    }, []);

    if (canEdit(organization.id, user)) {
        const handleAddPlayer = () => {
            router.navigate(`/Organization/${organization.id}/add_player`);
        };
        return (
            <div>
                <h4>Roster</h4>
                {organization.players.length === 0 && <div>No Players</div>}
                {directors.map((player: Player, key: number) => (
                    <EditPlayerItem
                        key={`directors-${rand(key)}`}
                        player={player}
                        orgId={organization.id}
                        roles={roles}
                        refreshOrg={loadOrganization}
                    />
                ))}
                {coaches.map((player: Player, key: number) => (
                    <EditPlayerItem
                        key={`coaches-${rand(key)}`}
                        player={player}
                        orgId={organization.id}
                        roles={roles}
                        refreshOrg={loadOrganization}
                    />
                ))}
                {captains.map((player: Player, key: number) => (
                    <EditPlayerItem
                        key={`captains-${rand(key)}`}
                        player={player}
                        orgId={organization.id}
                        roles={roles}
                        refreshOrg={loadOrganization}
                    />
                ))}
                {players.map((player: Player, key: number) => (
                    <EditPlayerItem
                        key={`players-${rand(key)}`}
                        player={player}
                        orgId={organization.id}
                        roles={roles}
                        refreshOrg={loadOrganization}
                    />
                ))}
                <br />
                <Button color={"blue"} onClick={handleAddPlayer}>
                    Add Player
                </Button>
            </div>
        );
    }

    return (
        <div>
            <h4>Roster</h4>
            <div className={"flex-col children--bot-pad-10"}>
                {organization.players.length === 0 && <div>no players</div>}
                {directors.map((player: Player, key: number) => (
                    <PlayerItem key={key} player={player} />
                ))}
                {coaches.map((player: Player, key: number) => (
                    <PlayerItem key={key} player={player} />
                ))}
                {captains.map((player: Player, key: number) => (
                    <PlayerItem key={key} player={player} />
                ))}
                {players.map((player: Player, key: number) => (
                    <PlayerItem key={key} player={player} />
                ))}
            </div>
        </div>
    );
}

function rand(key: number): string {
    return `${key}-${Math.random() * 100}`;
}

function canEdit(orgId: number, user: User | undefined) {
    if (Sec.isAdmin(user)) return true;
    if (Sec.isOrgDirector(orgId, user)) return true;
    if (Sec.isOrgCoach(orgId, user)) return true;
    return false;
}

function sortPlayers(
    allPlayers: Array<Player>
): [Array<Player>, Array<Player>, Array<Player>, Array<Player>] {
    const directors = new Array<Player>();
    const coaches = new Array<Player>();
    const captains = new Array<Player>();
    const players = new Array<Player>();

    allPlayers.forEach((player: Player) => {
        const { roles } = player;
        if (!roles) {
            players.push(player);
        } else if (roles.some((r) => r.name === "Director")) {
            directors.push(player);
        } else if (roles.some((r) => r.name === "Coach")) {
            coaches.push(player);
        } else if (roles.some((r) => r.name === "Captain")) {
            captains.push(player);
        } else if (roles.some((r) => r.name === "Player")) {
            players.push(player);
        }
    });

    return [directors, coaches, captains, players];
}
