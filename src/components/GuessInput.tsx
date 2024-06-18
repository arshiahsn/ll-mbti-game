import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Box,
  Collapse
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

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
  loginId: string;
  players: Player[];
  submitGuesses: (
    guesses: { [key: number]: string },
    selectedPlayer: Player,
    id: string
  ) => void;
  selectedPlayer: Player;
}

// Define the type for the guesses state
type GuessesState = { [key: number]: string };

const GuessInput: React.FC<GuessInputProps> = ({
  players,
  submitGuesses,
  selectedPlayer,
  loginId
}) => {
  const [guesses, setGuesses] = useState<GuessesState>({});

  const handleChange = (playerId: number, mbti: string) => {
    setGuesses({ ...guesses, [playerId]: mbti });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitGuesses(guesses, selectedPlayer, loginId);
  };

  return (
    <Card className="card">
      <h2>Guess Players' MBTI</h2>
      <form onSubmit={handleSubmit}>
        {players.map((player) => (
          <Box key={player.id} className="guess">
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
          </Box>
        ))}
        <Button type="submit">Submit Guesses</Button>
      </form>
    </Card>
  );
};

export default GuessInput;
