import { SubConference, Division, Conference, Team } from "../types/types";

export function sortConferences(conferences: Array<Conference> | undefined) {
    if (!conferences) return;
    conferences.forEach((conference) => {
        sortConference(conference);
    });
}

export function sortConference(conference: Conference | undefined) {
    if (!conference || !conference.subconferences) return;
    conference.subconferences.sort(sortByName);
    conference.subconferences.map((s) => ({
        ...s,
        divisions:
            (s.divisions && s.divisions.sort(sortByName)) ||
            new Array<Division>(),
    }));
}

type Sortable = Conference | SubConference | Division | Team;
export function sortByName(a: Sortable, b: Sortable): number {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}
