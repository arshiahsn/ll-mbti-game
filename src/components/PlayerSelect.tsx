import React, { useState } from "react";
import { Card, Button } from "@mui/material";

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

// Define types for the component props and state
interface Player {
  id: number;
  name: string;
}

interface PlayerSelectProps {
  players: Player[];
  setSelectedPlayer: (player: Player & { mbti: string }) => void;
}

const PlayerSelect: React.FC<PlayerSelectProps> = ({
  players,
  setSelectedPlayer,
}) => {
  const [selectedId, setSelectedId] = useState("");
  const [mbti, setMbti] = useState("");

  const handleSelect = () => {
    const player = players.find((p) => p.id === parseInt(selectedId, 10));
    if (player) {
      setSelectedPlayer({ ...player, mbti });
    }
  };

  return (
    <Card className="card">
      <h2>Select Your Name and MBTI Type</h2>
      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        required
      >
        <option value="" disabled>
          Select your name
        </option>
        {players.map((player) => (
          <option key={player.id} value={player.id}>
            {player.name}
          </option>
        ))}
      </select>
      <select value={mbti} onChange={(e) => setMbti(e.target.value)} required>
        <option value="" disabled>
          Select your MBTI Type
        </option>
        {mbtiTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <Button onClick={handleSelect}>Select</Button>
    </Card>
  );
};

export default PlayerSelect;
