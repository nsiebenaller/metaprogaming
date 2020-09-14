export interface Game {
    id: number;
    name: string;
    image: string;
    imageSrc?: string;
}

export interface Team {
    id: number;
    name: string;
    image: string;
    imageSrc?: string;
    players?: Array<Player>;
}

export interface Match {
    id: number;
    firstTeam: Team;
    firstTeamScore: number;
    secondTeam: Team;
    secondTeamScore: number;
    date: Date;
    winner: number | null;
    notes: string;
    DivisionId: number;
    GameId: number;
    type: string;
}

export interface Player {
    createdAt: string;
    id: number;
    name: string;
    gamerTag: string;
    discord: string;
    updatedAt: string;
    games?: Array<Game>;
    roles?: Array<Role>;
}

export interface Week {
    id: number;
    name: string;
    start: Date;
    end: Date;
    createdAt: string;
    updatedAt: string;
}

export interface Conference {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    subconferences?: Array<SubConference>;
}

export interface SubConference {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    teams?: Array<Team>;
    divisions?: Array<Division>;
}

export interface Division {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    matches: Array<Match>;
    weeks: Array<Week>;
}

export interface Role {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
}

export enum Side {
    LEFT,
    RIGHT,
}
