import React from "react";

export default function PlayerItem({ player }: any) {
    return (
        <div className="card depth-1 background--grey-800 hover-background--grey-700">
            <div className="flex-row vert-center children--right-pad-10">
                <div className="card-title">{player.name}</div>
                <div className="color--grey-400">
                    {player.roles.map((x: any) => x.name).join(", ")}
                </div>
            </div>
            <div className="flex-row children--right-pad-10">
                <div>
                    Gamer Tag:{" "}
                    <span className="color--grey-400">
                        {player.gamerTag || "-none-"}
                    </span>
                </div>
                <div>
                    Discord:{" "}
                    <span className="color--grey-400">
                        {player.discord || "-none-"}
                    </span>
                </div>
                <div>
                    Games:{" "}
                    <span className="color--grey-400">
                        {player.games &&
                            player.games.map((x: Game) => x.name).join(", ")}
                        {(!player.games || player.games.length === 0) &&
                            "-none-"}
                    </span>
                </div>
            </div>
        </div>
    );
}
