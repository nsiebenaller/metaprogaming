export {};
declare global {
    interface User {
        id: number;
        createdAt: string;
        updatedAt: string;
        username: string;
        password: string | null;
        email: string | null;
        players: Array<Player>;
        admin?: boolean;
    }

    interface Season {
        id: number;
        createdAt: string;
        updatedAt: string;
        active: boolean;
        name: string;
        weeks: Array<Week>;
        GameId: number | null;
        GameTypeId: number | null;
    }

    interface Week {
        id: number;
        createdAt: string;
        updatedAt: string;
        name: string;
        start: Date;
        end: Date;
    }

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
        awayCheckedIn: boolean | null;
        homeCheckedIn: boolean | null;
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

    interface Page {
        id: number;
        createdAt: string;
        updatedAt: string;
        name: string;
        content: string;
        hidden?: boolean;
    }

    interface Image {
        id: number;
        createdAt: string;
        updatedAt: string;
        src: string;
        type: string;
    }

    interface ApiResponse {
        success: boolean;
        messages: Array<string>;
    }
}
