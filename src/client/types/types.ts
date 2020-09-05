export interface Game {
    id: Number;
    name: string;
    image: string;
    imageSrc?: string;
}

export interface Team {
    id: Number;
    name: string;
    image: string;
    imageSrc?: string;
    players?: Array<Player>;
}

export interface Match {
    id: number;
    teams: Array<Team>;
    date: Date;
    winner: number | null;
}

export interface Player {
    createdAt: string;
    id: number;
    name: string;
    updatedAt: string;
}
