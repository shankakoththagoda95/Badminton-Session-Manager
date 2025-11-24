import React, { useState } from 'react';

export function Court({ activeMatch, onFinishMatch }) {
    const [team1Score, setTeam1Score] = useState('');
    const [team2Score, setTeam2Score] = useState('');

    if (!activeMatch) {
        return (
            <div className="card court-section empty">
                <h2>Current Match</h2>
                <p className="placeholder-text">Waiting for players...</p>
            </div>
        );
    }

    const { players } = activeMatch;
    const team1 = [players[0], players[1]];
    const team2 = [players[2], players[3]];

    const handleFinish = () => {
        const s1 = parseInt(team1Score);
        const s2 = parseInt(team2Score);

        if (isNaN(s1) || isNaN(s2)) return;

        onFinishMatch({
            team1Ids: team1.map(p => p.id),
            team2Ids: team2.map(p => p.id),
            score1: s1,
            score2: s2
        });
        setTeam1Score('');
        setTeam2Score('');
    };

    return (
        <div className="card court-section">
            <h2>Current Match</h2>

            <div className="match-display">
                <div className="team team-1">
                    <h3>Team 1</h3>
                    <div className="team-players">
                        {team1.map(p => <div key={p.id} className="player-chip">{p.name}</div>)}
                    </div>
                    <input
                        type="number"
                        value={team1Score}
                        onChange={(e) => setTeam1Score(e.target.value)}
                        placeholder="Score"
                        className="score-input"
                    />
                </div>

                <div className="vs-divider">VS</div>

                <div className="team team-2">
                    <h3>Team 2</h3>
                    <div className="team-players">
                        {team2.map(p => <div key={p.id} className="player-chip">{p.name}</div>)}
                    </div>
                    <input
                        type="number"
                        value={team2Score}
                        onChange={(e) => setTeam2Score(e.target.value)}
                        placeholder="Score"
                        className="score-input"
                    />
                </div>
            </div>

            <button
                onClick={handleFinish}
                className="finish-btn"
                disabled={!team1Score || !team2Score}
            >
                Finish Match
            </button>
        </div>
    );
}
