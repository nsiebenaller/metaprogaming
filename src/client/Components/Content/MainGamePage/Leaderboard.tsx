import React from "react";

interface Props {
    leaderboard: Array<any>;
    refreshLeaderboard: () => void;
}
export default function Leaderboard({
    leaderboard,
    refreshLeaderboard,
}: Props) {
    if (leaderboard.length === 0) return null;
    leaderboard.sort(sortScores);
    return (
        <div className={"leaderboard"}>
            <div className={"flex-row"}>
                <div className={"leaderboard-title"}>Standings</div>
                <div className={"refresh-btn"} onClick={refreshLeaderboard}>
                    refresh
                </div>
            </div>
            <table className={"leaderboard-list"}>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th className={"text-align-left"}>Team</th>
                        <th>Win</th>
                        <th>Loss</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((team, idx) => (
                        <LeaderboardItem
                            key={idx}
                            number={idx + 1}
                            team={team}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function LeaderboardItem({ team, number }: any) {
    return (
        <tr className={"leaderboard-item"}>
            <td>
                <h2>{number}</h2>
            </td>
            <td className={"children--text-align-left"}>
                <div>
                    <b>{team.teamName}</b>
                </div>
                <div>{team.orgName}</div>
            </td>
            <td>
                <b>{team.win}</b>
            </td>
            <td>
                <b>{team.loss}</b>
            </td>
        </tr>
    );
}

function sortScores(a: any, b: any): number {
    const aPoints = a.win - a.loss;
    const bPoints = b.win - b.loss;
    if (aPoints < bPoints) return 1;
    if (aPoints > bPoints) return -1;
    const aTotal = a.win + a.loss;
    const bTotal = b.win + b.loss;
    if (aTotal < bTotal) return 1;
    if (aTotal > bTotal) return -1;
    return 0;
}
