/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import PlayerSelect from "./components/PlayerSelect";
import GuessInput from "./components/GuessInput";
import "./App.css"; // Import your CSS file
import { fetchUserAttributes } from "aws-amplify/auth";

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
  { id: 0, name: "Alice" },
  { id: 1, name: "Bob" },
  { id: 2, name: "Charlie" },
  { id: 3, name: "Diana" },
];

function App() {
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [isDone, setIsDone] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  const playerGuessExists = (
    guessData: any,
    email: string
  ) => {
    const playerGuess =
      guessData.find((guess: any) => {
        const { id } = guess ?? {};
        return id === email
      });

    return !!playerGuess;
  };

  const fetchUserEmail = async () => {
    const { email = '' } = await fetchUserAttributes();
    return email;
  }

  const fetchGuesses = async () => {
    const { data: items } = await client.models.Guesses.list();
    const email = await fetchUserEmail();
    const exists = playerGuessExists(items, email) ?? {};
    setHasPlayed(exists);
  };



  const submitGuesses = async (newGuesses: Guess, selectedPlayer: Player, loginId: string) => {
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
    fetchGuesses();
  }, []);

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>{user?.signInDetails?.loginId}</h1>
          <div className="container">
            <h1>MBTI Guessing Game</h1>
            {!selectedPlayer ? (
              <PlayerSelect
                players={predefinedPlayers}
                setSelectedPlayer={setSelectedPlayer}
              />
            ) : (
              <>
                {(!isDone || hasPlayed) &&(
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
                      loginId={user?.signInDetails?.loginId ?? ''}
                    />
                  </>
                )}
                {hasPlayed && <h2>You have already played.</h2>}
                {isDone && <h2>Thanks for playing!</h2>}
              </>
            )}
          </div>
          <button className="button" onClick={signOut}>
            Sign out
          </button>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
