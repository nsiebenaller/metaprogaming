import { Game, Team, Match } from "../types/types";

const DateOf = (days: number) => {
    var date = new Date();
    date.setDate(date.getDate() + days);
    return date;
};
export const matches: Array<Match> = [
    {
        id: 1,
        teams: [
            {
                id: 1,
                name: "Bay Path University",
                image: "/images/mascot-1.jpeg",
            },
            {
                id: 2,
                name: "Becker College",
                image: "/images/mascot-2.jpeg",
            },
        ],
        date: DateOf(1),
        winner: null,
    },
    {
        id: 1,
        teams: [
            {
                id: 1,
                name: "Bay Path University",
                image: "/images/mascot-1.jpeg",
            },
            {
                id: 2,
                name: "Becker College",
                image: "/images/mascot-2.jpeg",
            },
        ],
        date: DateOf(3),
        winner: null,
    },
    {
        id: 1,
        teams: [
            {
                id: 1,
                name: "Bay Path University",
                image: "/images/mascot-1.jpeg",
            },
            {
                id: 2,
                name: "Becker College",
                image: "/images/mascot-2.jpeg",
            },
        ],
        date: DateOf(4),
        winner: null,
    },
    {
        id: 1,
        teams: [
            {
                id: 1,
                name: "Bay Path University",
                image: "/images/mascot-1.jpeg",
            },
            {
                id: 2,
                name: "Becker College",
                image: "/images/mascot-2.jpeg",
            },
        ],
        date: DateOf(7),
        winner: null,
    },
];

export const teams: Array<Team> = [
    {
        id: 1,
        name: "Bay Path University",
        image: "/images/mascot-1.jpeg",
    },
    {
        id: 2,
        name: "Becker College",
        image: "/images/mascot-2.jpeg",
    },
    {
        id: 3,
        name: "Dean College",
        image: "/images/mascot-3.jpg",
    },
    {
        id: 4,
        name: "Elms College",
        image: "/images/mascot-4.jpg",
    },
];

export const games: Array<Game> = [
    {
        id: 1,
        name: "Rocket League",
        image: "/images/rocket.jpg",
    },
    {
        id: 2,
        name: "League of Legends",
        image: "/images/league.jpg",
    },
    {
        id: 3,
        name: "Madden 2021",
        image: "/images/madden.jpg",
    },
    {
        id: 4,
        name: "Overwatch",
        image: "/images/overwatch.jpeg",
    },
    {
        id: 5,
        name: "Valorant",
        image: "/images/valorant.jpg",
    },
];
