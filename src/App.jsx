import React, { useState, useEffect } from 'react';
import { PlayerList } from './components/PlayerList';
import { Court } from './components/Court';
import { Leaderboard } from './components/Leaderboard';
import { generateNextMatch, updatePlayerStatsForMatchStart } from './utils/matchmaking';

function App() {
    // Load initial state from localStorage if available
    const [players, setPlayers] = useState(() => {
        const saved = localStorage.getItem('badminton_players');
        return saved ? JSON.parse(saved) : [];
    });

    const [activeMatch, setActiveMatch] = useState(() => {
        const saved = localStorage.getItem('badminton_active_match');
        return saved ? JSON.parse(saved) : null;
    });

    // Persist state changes
    useEffect(() => {
        localStorage.setItem('badminton_players', JSON.stringify(players));
    }, [players]);

    useEffect(() => {
        localStorage.setItem('badminton_active_match', JSON.stringify(activeMatch));
    }, [activeMatch]);

    const addPlayer = (name) => {
        const newPlayer = {
            id: Date.now().toString(),
            name,
            gamesPlayed: 0,
            wins: 0,
            consecutiveRests: 0
        };
        setPlayers([...players, newPlayer]);
    };

    const removePlayer = (id) => {
        setPlayers(players.filter(p => p.id !== id));
    };

    const startNextMatch = () => {
        if (players.length < 4) {
            alert("Need at least 4 players to start a match!");
            return;
        }

        const { nextMatch, sittingOut } = generateNextMatch(players);
        const activeIds = nextMatch.map(p => p.id);

        // Update stats for game start (increment games played, reset rests)
        const updatedPlayers = updatePlayerStatsForMatchStart(players, activeIds);
        setPlayers(updatedPlayers);

        setActiveMatch({
            players: nextMatch,
            startTime: Date.now()
        });
    };

    const finishMatch = ({ team1Ids, team2Ids, score1, score2 }) => {
        const winners = score1 > score2 ? team1Ids : team2Ids;

        const updatedPlayers = players.map(p => {
            if (winners.includes(p.id)) {
                return { ...p, wins: p.wins + 1 };
            }
            return p;
        });

        setPlayers(updatedPlayers);
        setActiveMatch(null);
    };

    return (
        <div className="app-container">
            <header>
                <h1>Badminton Session Manager</h1>
            </header>

            <main className="dashboard-grid">
                <div className="left-column">
                    <PlayerList
                        players={players}
                        onAddPlayer={addPlayer}
                        onRemovePlayer={removePlayer}
                    />
                </div>

                <div className="center-column">
                    <Court
                        activeMatch={activeMatch}
                        onFinishMatch={finishMatch}
                    />

                    {!activeMatch && players.length >= 4 && (
                        <button
                            onClick={startNextMatch}
                            className="start-match-btn"
                        >
                            Start Next Match
                        </button>
                    )}

                    {!activeMatch && players.length < 4 && (
                        <div className="waiting-message">
                            Add {4 - players.length} more player{4 - players.length > 1 ? 's' : ''} to start.
                        </div>
                    )}
                </div>

                <div className="right-column">
                    <Leaderboard players={players} />
                </div>
            </main>
        </div>
    );
}

export default App;
