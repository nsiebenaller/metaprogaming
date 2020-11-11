import { OptionFormat } from "ebrap-ui/dist/types/types";

type Named = Organization | Team | GameType | Game;
const Convert = {
    toOrganization: (option: OptionFormat): Organization =>
        (option as unknown) as Organization,
    toTeam: (option: OptionFormat): Team => (option as unknown) as Team,
    toGame: (option: OptionFormat): Game => (option as unknown) as Game,
    toGameType: (option: OptionFormat): GameType =>
        (option as unknown) as GameType,
    toOptionFormat: (items: Array<Named>): Array<OptionFormat> =>
        items.map((x) => ({ ...x, value: x.name })),
};
export default Convert;
