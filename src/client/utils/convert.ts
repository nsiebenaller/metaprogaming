import { OptionFormat } from "ebrap-ui/dist/types/types";

type Named = Organization | Team;
const Convert = {
    toOrganization: (option: OptionFormat): Organization =>
        (option as unknown) as Organization,
    toTeam: (option: OptionFormat): Team => (option as unknown) as Team,
    toDivision: (option: OptionFormat): Division =>
        (option as unknown) as Division,
    toGame: (option: OptionFormat): Game => (option as unknown) as Game,
    toOptionFormat: (items: Array<Named>): Array<OptionFormat> =>
        items.map((x) => ({ ...x, value: x.name })),
};
export default Convert;
