import React from 'react';

export function Leaderboard({ players }) {
    const sortedPlayers = [...players].sort((a, b) => {
        if (b.wins !== a.wins) return b.wins - a.wins;
        return b.gamesPlayed - a.gamesPlayed;
    });

    return (
        <div className="card leaderboard-section">
            <h2>Leaderboard</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Player</th>
                            <th>Wins</th>
                            <th>Games</th>
                            <th>Win Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedPlayers.map((player, index) => {
                            const winRate = player.gamesPlayed > 0
                                ? Math.round((player.wins / player.gamesPlayed) * 100)
                                : 0;

                            return (
                                <tr key={player.id}>
                                    <td>{index + 1}</td>
                                    <td>{player.name}</td>
                                    <td>{player.wins}</td>
                                    <td>{player.gamesPlayed}</td>
                                    <td>{winRate}%</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
