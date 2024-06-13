import React, { useState } from "react";

const mbtiTypes = [
  "ISTJ",
  "ISFJ",
  "INFJ",
  "INTJ",
  "ISTP",
  "ISFP",
  "INFP",
  "INTP",
  "ESTP",
  "ESFP",
  "ENFP",
  "ENTP",
  "ESTJ",
  "ESFJ",
  "ENFJ",
  "ENTJ",
];
// Define types for the component props
interface Player {
  id: number;
  name: string;
}

interface GuessInputProps {
  players: Player[];
  submitGuesses: (
    guesses: { [key: number]: string },
    selectedPlayer: Player
  ) => void;
  selectedPlayer: Player;
}

// Define the type for the guesses state
type GuessesState = { [key: number]: string };

const GuessInput: React.FC<GuessInputProps> = ({
  players,
  submitGuesses,
  selectedPlayer,
}) => {
  const [guesses, setGuesses] = useState<GuessesState>({});

  const handleChange = (playerId: number, mbti: string) => {
    setGuesses({ ...guesses, [playerId]: mbti });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitGuesses(guesses, selectedPlayer);
  };

  return (
    <div className="card">
      <h2>Guess Players' MBTI</h2>
      <form onSubmit={handleSubmit}>
        {players.map((player) => (
          <div key={player.id} className="guess">
            <span>{player.name}</span>
            <select
              className="select"
              value={guesses[player.id] || ""}
              onChange={(e) => handleChange(player.id, e.target.value)}
              required
            >
              <option value="" disabled>
                Select MBTI Type
              </option>
              {mbtiTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
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
