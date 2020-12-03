import { OptionFormat } from "ebrap-ui/dist/types/types";

function to<T>(option: OptionFormat): T {
    return (option as unknown) as T;
}
function all<T>(options: Array<OptionFormat>): Array<T> {
    return (options as Array<unknown>) as Array<T>;
}

type Named = Organization | Team | GameType | Game;
const Convert = {
    to: to,
    all: all,
    toOrganization: (option: OptionFormat) => to<Organization>(option),
    toTeam: (option: OptionFormat) => to<Team>(option),
    toGame: (option: OptionFormat) => to<Game>(option),
    toGameType: (option: OptionFormat) => to<GameType>(option),
    toOptionFormat: (items: Array<Named>): Array<OptionFormat> =>
        items.map((x) => ({ ...x, value: x.name })),
};
export default Convert;
