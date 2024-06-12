import React, { useState } from 'react';

const mbtiTypes = [
  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
  'ISTP', 'ISFP', 'INFP', 'INTP',
  'ESTP', 'ESFP', 'ENFP', 'ENTP',
  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
];

const GuessInput = ({ players, submitGuesses, selectedPlayer }) => {
  const [guesses, setGuesses] = useState({});

  const handleChange = (playerId, mbti) => {
    setGuesses({ ...guesses, [playerId]: mbti });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitGuesses(guesses, selectedPlayer);
  };

  return (
    <div className="card">
      <h2>Guess Players' MBTI</h2>
      <form onSubmit={handleSubmit}>
        {players.map(player => (
          <div key={player.id} className="guess">
            <span>{player.name}</span>
            <select
              value={guesses[player.id] || ''}
              onChange={(e) => handleChange(player.id, e.target.value)}
              required
            >
              <option value="" disabled>Select MBTI Type</option>
              {mbtiTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        ))}
        <button type="submit">Submit Guesses</button>
      </form>
    </div>
  );
};

export default GuessInput;