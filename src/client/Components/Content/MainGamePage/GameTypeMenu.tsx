import React from "react";

interface Props {
    gameTypes: Array<GameType>;
    selectedId?: number;
    setGameType: React.Dispatch<React.SetStateAction<GameType | undefined>>;
}
export default function GameTypeMenu({
    gameTypes,
    selectedId,
    setGameType,
}: Props) {
    if (gameTypes.length === 0) return null;
    return (
        <div className={"game-variants"}>
            {gameTypes.map((type, key) => (
                <MenuItem
                    key={key}
                    gameType={type}
                    selected={type.id === selectedId}
                    setGameType={setGameType}
                />
            ))}
        </div>
    );
}

interface GameTypeProps {
    gameType: GameType;
    selected: boolean;
    setGameType: React.Dispatch<React.SetStateAction<GameType | undefined>>;
}
function MenuItem({ gameType, selected, setGameType }: GameTypeProps) {
    const handleClick = () => setGameType(gameType);
    return (
        <div
            className={`game-var ${selected ? "active" : ""}`}
            onClick={handleClick}
        >
            {gameType.name}
        </div>
    );
}
