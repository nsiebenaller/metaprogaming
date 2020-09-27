export {};
declare global {
    interface Game {
        id: number;
        createdAt: string;
        updatedAt: string;
        name: string;
        image: string;
        imageSrc?: string;
        banner: string;
        gameTypes: Array<GameType>;
        ConferenceId: number;
    }

    interface GameType {
        id: number;
        createdAt: string;
        updatedAt: string;
        name: string;
        GameId: number;
    }

    interface Organization {
        id: number;
        name: string;
        image: string;
        imageSrc?: string;
        players?: Array<Player>;
        teams?: Array<Team>;
    }

    interface Team {
        id: number;
        name: string;
    }

    interface Match {
        id: number;
        awayOrg: Organization;
        firstTeamScore: number;
        awayTeam: Team;
        homeOrg: Organization;
        secondTeamScore: number;
        homeTeam: Team;
        date: Date;
        winner: number | null;
        notes: string;
        DivisionId: number;
        GameId: number;
        type: string;
        GameTypeId: number;
    }

    interface Player {
        createdAt: string;
        id: number;
        name: string;
        gamerTag: string;
        discord: string;
        updatedAt: string;
        games?: Array<Game>;
        roles?: Array<Role>;
    }

    interface Week {
        id: number;
        name: string;
        start: Date;
        end: Date;
        createdAt: string;
        updatedAt: string;
    }

    interface Conference {
        id: number;
        name: string;
        createdAt: string;
        updatedAt: string;
        subconferences?: Array<SubConference>;
    }

    interface SubConference {
        id: number;
        name: string;
        createdAt: string;
        updatedAt: string;
        organizations?: Array<Organization>;
        divisions?: Array<Division>;
    }

    interface Division {
        id: number;
        name: string;
        createdAt: string;
        updatedAt: string;
        matches: Array<Match>;
        weeks: Array<Week>;
    }

    interface Role {
        id: number;
        createdAt: string;
        updatedAt: string;
        name: string;
    }
}
