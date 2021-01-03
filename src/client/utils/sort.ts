type HasName = Organization | Team | Game | GameType;
type HasId = Organization | Team | Game | GameType | User | Image;

export function ByName(a: HasName, b: HasName): number {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

export function ById(a: HasId, b: HasId): number {
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
