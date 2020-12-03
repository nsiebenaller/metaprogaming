export function isOrgDirector(orgId: number, user?: User): boolean {
    if (!user) return false;
    return hasOrgRole(orgId, "Director", user);
}
export function isOrgCoach(orgId: number, user?: User): boolean {
    if (!user) return false;
    return hasOrgRole(orgId, "Coach", user);
}
export function isOrgGameCoach(
    orgId: number,
    gameId: number,
    user?: User
): boolean {
    if (!user) return false;
    const isCoach = hasOrgRole(orgId, "Coach", user);
    if (isCoach) {
        return hasGame(user, gameId);
    }
    return false;
}
export function isOrgCaptain(orgId: number, user?: User): boolean {
    if (!user) return false;
    return hasOrgRole(orgId, "Captain", user);
}
export function isOrgPlayer(orgId: number, user?: User): boolean {
    if (!user) return false;
    return hasOrgRole(orgId, "Player", user);
}
export function isAdmin(user?: User): boolean {
    if (!user) return false;
    return user.admin === true;
}

function hasOrgRole(orgId: number, roleName: string, user: User): boolean {
    const assocations = getOrganizationAssociations(user, orgId);
    return assocations.some((player) => {
        const { roles } = player;
        if (!roles || roles.length === 0) return false;
        return roles.some((role) => role.name === roleName);
    });
}
function getOrganizationAssociations(user: User, orgId: number): Array<Player> {
    const associations = new Array<Player>();
    const { players } = user;
    if (!players || players.length === 0) {
        return players;
    }
    players.forEach((player) => {
        const { organizations } = player;
        if (!organizations || organizations.length === 0) return;
        if (organizations.some((org) => org.id === orgId)) {
            associations.push(player);
        }
    });
    return associations;
}
function hasGame(user: User, gameId: number) {
    const { players } = user;
    if (!players || players.length === 0) {
        return false;
    }
    for (let i = 0; i < players.length; i++) {
        const games = players[i].games;
        if (!games || games.length === 0) {
            continue;
        }
        for (let j = 0; j < games.length; j++) {
            if (games[j].id === gameId) {
                return true;
            }
        }
    }
    return false;
}
