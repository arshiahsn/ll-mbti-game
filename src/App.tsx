/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
  Collapse
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import PlayerSelect from "./components/PlayerSelect";
import GuessInput from "./components/GuessInput";
import "./App.css"; // Import your CSS file
import { fetchUserAttributes } from "aws-amplify/auth";
import MBTILegend from "./components/MBTILegend";

const mbtiTypes = [
  { label: 'INTJ', color: '#4CAF50', description: 'The Architect', link: 'https://www.16personalities.com/intj-personality', summary: 'Imaginative and strategic thinkers with a plan for everything.' },
  { label: 'INTP', color: '#8BC34A', description: 'The Logician', link: 'https://www.16personalities.com/intp-personality', summary: 'Innovative inventors with an unquenchable thirst for knowledge.' },
  { label: 'ENTJ', color: '#FF5722', description: 'The Commander', link: 'https://www.16personalities.com/entj-personality', summary: 'Bold, imaginative, and strong-willed leaders, always finding a way – or making one.' },
  { label: 'ENTP', color: '#FF9800', description: 'The Debater', link: 'https://www.16personalities.com/entp-personality', summary: 'Smart and curious thinkers who cannot resist an intellectual challenge.' },
  { label: 'INFJ', color: '#2196F3', description: 'The Advocate', link: 'https://www.16personalities.com/infj-personality', summary: 'Quiet and mystical, yet very inspiring and tireless idealists.' },
  { label: 'INFP', color: '#FFC107', description: 'The Mediator', link: 'https://www.16personalities.com/infp-personality', summary: 'Poetic, kind, and altruistic people, always eager to help a good cause.' },
  { label: 'ENFJ', color: '#3F51B5', description: 'The Protagonist', link: 'https://www.16personalities.com/enfj-personality', summary: 'Charismatic and inspiring leaders, able to mesmerize their listeners.' },
  { label: 'ENFP', color: '#F44336', description: 'The Campaigner', link: 'https://www.16personalities.com/enfp-personality', summary: 'Enthusiastic, creative, and sociable free spirits, who can always find a reason to smile.' },
  { label: 'ISTJ', color: '#9C27B0', description: 'The Logistician', link: 'https://www.16personalities.com/istj-personality', summary: 'Practical and fact-minded individuals, whose reliability cannot be doubted.' },
  { label: 'ISFJ', color: '#00BCD4', description: 'The Defender', link: 'https://www.16personalities.com/isfj-personality', summary: 'Very dedicated and warm protectors, always ready to defend their loved ones.' },
  { label: 'ESTJ', color: '#673AB7', description: 'The Executive', link: 'https://www.16personalities.com/estj-personality', summary: 'Excellent administrators, unsurpassed at managing things – or people.' },
  { label: 'ESFJ', color: '#00ACC1', description: 'The Consul', link: 'https://www.16personalities.com/esfj-personality', summary: 'Extraordinarily caring, social, and popular people, always eager to help.' },
  { label: 'ISTP', color: '#795548', description: 'The Virtuoso', link: 'https://www.16personalities.com/istp-personality', summary: 'Bold and practical experimenters, masters of all kinds of tools.' },
  { label: 'ISFP', color: '#607D8B', description: 'The Adventurer', link: 'https://www.16personalities.com/isfp-personality', summary: 'Flexible and charming artists, always ready to explore and experience something new.' },
  { label: 'ESTP', color: '#009688', description: 'The Entrepreneur', link: 'https://www.16personalities.com/estp-personality', summary: 'Smart, energetic, and very perceptive people, who truly enjoy living on the edge.' },
  { label: 'ESFP', color: '#E91E63', description: 'The Entertainer', link: 'https://www.16personalities.com/esfp-personality', summary: 'Spontaneous, energetic, and enthusiastic entertainers – life is never boring around them.' },
];

const client = generateClient<Schema>();

// Define types for players and guesses
interface Player {
  id: number;
  name: string;
  mbti?: string; // mbti is optional initially
}

interface Guess {
  [key: number]: string; // key is player id and value is MBTI type
}

const predefinedPlayers: Player[] = [
  { id: 0, name: "Arshia" },
  { id: 1, name: "Nupur" },
  { id: 2, name: "Rodrigo" },
  { id: 3, name: "Raina" },
  { id: 4, name: "Shahrzad" },
  { id: 5, name: "Findlay" },
  { id: 6, name: "Sloane" },
  { id: 7, name: "Yash" },
  { id: 8, name: "Adebayo" },
  { id: 9, name: "Stewart" },
  { id: 10, name: "Jason" },
  { id: 11, name: "Irfan" },
  { id: 12, name: "Vaibhav" },
  { id: 13, name: "Sneha" },
  { id: 14, name: "Raihan" },
  { id: 15, name: "Inderjit" }
];

function App() {
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [isDone, setIsDone] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  const playerGuessExists = (guessData: any, email: string) => {
    const playerGuess = guessData.find((guess: any) => {
      const { id } = guess ?? {};
      return id === email;
    });

    return !!playerGuess;
  };

  const fetchUserEmail = async () => {
    const { email = "" } = await fetchUserAttributes();
    return email;
  };

  const submitGuesses = async (
    newGuesses: Guess,
    selectedPlayer: Player,
    loginId: string
  ) => {
    try {
      await client.models.Guesses.create({
        id: loginId,
        guesses: JSON.stringify(newGuesses),
        player: JSON.stringify(selectedPlayer),
      });
      setIsDone(true);
    } catch (error: unknown) {
      setIsDone(false);
    }
  };

  useEffect(() => {
    const fetchGuesses = async () => {
      const { data: items } = await client.models.Guesses.list();
      const email = await fetchUserEmail();
      console.log(email, items);
      const exists = playerGuessExists(items, email);
      setHasPlayed(exists);
    };
    fetchGuesses();
  }, []);

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <Box className="container">
          <h1>{user?.signInDetails?.loginId}</h1>
            <h1>MBTI Guessing Game</h1>
            <MBTILegend title="Help" types={mbtiTypes} />
            {!selectedPlayer && !hasPlayed ? (
              <PlayerSelect
                players={predefinedPlayers}
                setSelectedPlayer={setSelectedPlayer}
              />
            ) : (
              <>
                {!isDone && !hasPlayed && (
                  <>
                    <h2>
                      Welcome, {selectedPlayer.name} ({selectedPlayer.mbti})
                    </h2>
                    <GuessInput
                      players={predefinedPlayers.filter(
                        (player) => player.id !== selectedPlayer.id
                      )}
                      submitGuesses={submitGuesses}
                      selectedPlayer={selectedPlayer}
                      loginId={user?.signInDetails?.loginId ?? ""}
                    />
                  </>
                )}
                {hasPlayed && <h2>You have already played.</h2>}
                {isDone && <h2>Thanks for playing!</h2>}
              </>
            )}
            <Button className="button" onClick={signOut}>
              Sign out
            </Button>
          </Box>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
