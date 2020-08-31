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
}

export interface Match {
    id: number;
    teams: Array<Team>;
    date: Date;
    winner: number | null;
}
