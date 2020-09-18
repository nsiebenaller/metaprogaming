import React from "react";

export default function PlayerItem({ player }: any) {
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
