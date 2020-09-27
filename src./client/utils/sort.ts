export function sortConferences(conferences: Array<Conference>) {
    if (!conferences) return;
    conferences.forEach((conference) => {
        sortConference(conference);
    });
}

export function sortConference(conference: Conference) {
    if (!conference || !conference.subconferences) return;
    conference.subconferences.sort(ByName);
    conference.subconferences.map((s) => ({
        ...s,
        divisions:
            (s.divisions && s.divisions.sort(ById)) || new Array<Division>(),
    }));
}

type Sortable = Conference | SubConference | Division | Organization | Team;
export function ByName(a: Sortable, b: Sortable): number {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

export function ById(a: Sortable, b: Sortable): number {
    if (a.id < b.id) {
        return -1;
    }
    if (a.id > b.id) {
        return 1;
    }
    return 0;
}

export function ByDate(a: Match, b: Match): number {
    if (!a.date) return -1;
    if (!b.date) return 1;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
}
