import React from "react";
import Axios from "axios";
import { command } from "ebrap-ui";
import PlayerItem from "./PlayerItem";

interface Props {
    match: any;
}
export default function OrgPage({ match }: Props) {
    const orgId = parseInt(match.params.orgId);

    const [org, setOrg] = React.useState<Organization | undefined>(undefined);

    React.useEffect(() => {
        onMount();
    }, []);
    async function onMount() {
        const { data: orgs } = await Axios.get("/api/Organization", {
            params: { id: orgId },
        });
        if (orgs.length === 0) {
            return await command.alert("error fetching organization");
        }
        setOrg(orgs[0] as Organization);
    }

    if (!org) {
        return (
            <div className="org-page">
                <h1>Organization</h1>
                <div>Loading...</div>
            </div>
        );
    }

    let allPlayers = new Array<Player>();
    if (org.players) allPlayers = org.players;

    const [coaches, captains, players] = sortPlayers(allPlayers);

    return (
        <div className="org-page">
            <h1>Organization</h1>
            <div className="title">{org.name}</div>
            <hr />
            <h4>Roster</h4>
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
    );
}

function sortPlayers(
    allPlayers: Array<Player>
): [Array<Player>, Array<Player>, Array<Player>] {
    const coaches = new Array<Player>();
    const captains = new Array<Player>();
    const players = new Array<Player>();

    allPlayers.forEach((player: Player) => {
        const { roles } = player;
        if (!roles) {
            players.push(player);
        } else if (roles.some((r) => r.name === "Coach")) {
            coaches.push(player);
        } else if (roles.some((r) => r.name === "Captain")) {
            captains.push(player);
        } else if (roles.some((r) => r.name === "Player")) {
            players.push(player);
        }
    });

    return [coaches, captains, players];
}
