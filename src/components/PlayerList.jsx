import React, { useState } from 'react';

export function PlayerList({ players, onAddPlayer, onRemovePlayer }) {
    const [newName, setNewName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newName.trim()) {
            onAddPlayer(newName.trim());
            setNewName('');
        }
    };

    return (
        <div className="card player-list-section">
            <h2>Players ({players.length})</h2>

            <form onSubmit={handleSubmit} className="add-player-form">
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter player name"
                    className="player-input"
                />
                <button type="submit" disabled={!newName.trim()}>
                    Add
                </button>
            </form>

            <div className="players-grid">
                {players.map(player => (
                    <div key={player.id} className="player-card">
                        <div className="player-info">
                            <span className="player-name">{player.name}</span>
                            <div className="player-stats">
                                <span title="Games Played">🎮 {player.gamesPlayed}</span>
                                <span title="Wins">🏆 {player.wins}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => onRemovePlayer(player.id)}
                            className="remove-btn"
                            title="Remove player"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
