/**
 * Generates the next match based on player history.
 * 
 * Strategy:
 * 1. Prioritize players who have played the fewest games.
 * 2. Break ties by prioritizing players who have sat out the longest (consecutive rests).
 * 3. Return 4 players for the match and the remaining players.
 * 
 * @param {Array} players - List of player objects { id, name, gamesPlayed, consecutiveRests }
 * @returns {Object} { nextMatch: [p1, p2, p3, p4], sittingOut: [p5, ...] }
 */
export function generateNextMatch(players) {
    if (players.length < 4) {
        return { nextMatch: [], sittingOut: players };
    }

    // Sort players to find the best candidates for the next game
    // Lower gamesPlayed is better. Higher consecutiveRests is better.
    const sortedPlayers = [...players].sort((a, b) => {
        if (a.gamesPlayed !== b.gamesPlayed) {
            return a.gamesPlayed - b.gamesPlayed; // Ascending games played
        }
        return b.consecutiveRests - a.consecutiveRests; // Descending rests
    });

    const nextMatch = sortedPlayers.slice(0, 4);
    const sittingOut = sortedPlayers.slice(4);

    return { nextMatch, sittingOut };
}

/**
 * Updates player stats after a match is generated.
 * Increments gamesPlayed for active players.
 * Increments consecutiveRests for sitting players, resets for active players.
 * 
 * @param {Array} allPlayers 
 * @param {Array} activePlayerIds 
 * @returns {Array} Updated players list
 */
export function updatePlayerStatsForMatchStart(allPlayers, activePlayerIds) {
    return allPlayers.map(player => {
        if (activePlayerIds.includes(player.id)) {
            return {
                ...player,
                gamesPlayed: player.gamesPlayed + 1,
                consecutiveRests: 0
            };
        } else {
            return {
                ...player,
                consecutiveRests: player.consecutiveRests + 1
            };
        }
    });
}
