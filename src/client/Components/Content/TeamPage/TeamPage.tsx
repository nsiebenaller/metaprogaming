import React from "react";
import Axios from "axios";
import { Team, Player } from "../../../types/types";

interface Props {
    match: any;
}
export default function TeamPage({ match }: Props) {
    const teamId = parseInt(match.params.teamId);

    const [team, setTeam] = React.useState<Team | undefined>(undefined);

    React.useEffect(() => {
        onMount();
    }, []);
    async function onMount() {
        const { data: teams } = await Axios.get("/api/Team", {
            params: { id: teamId },
        });
        if (teams.length === 0) {
            return window.alert("error fetching team");
        }
        const selectedTeam: Team = teams[0];
        setTeam(selectedTeam);
    }

    if (!team) {
        return (
            <div>
                <h1>Team</h1>
                <div>Loading...</div>
            </div>
        );
    }

    let teamMembers = new Array<Player>();
    if (team.players) teamMembers = team.players;

    const [coaches, captains, players] = sortPlayers(teamMembers);

    return (
        <div>
            <h1>Team</h1>
            <div className="team-title">{team.name}</div>
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
    teamMembers: Array<Player>
): [Array<Player>, Array<Player>, Array<Player>] {
    const coaches = new Array<Player>();
    const captains = new Array<Player>();
    const players = new Array<Player>();

    teamMembers.forEach((player: Player) => {
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

function PlayerItem({ player }: any) {
    return (
        <div className="player-card">
            <div className="title-row">
                <div className="title">{player.name}</div>
                <div className="roles">
                    {player.roles.map((x: any) => x.name).join(", ")}
                </div>
            </div>
            <div className="info">
                <div>
                    Gamer Tag:{" "}
                    <span className="info-value">
                        {player.gamerTag || "-none-"}
                    </span>
                </div>
                <div>
                    Discord:{" "}
                    <span className="info-value">
                        {player.discord || "-none-"}
                    </span>
                </div>
            </div>
        </div>
    );
}
