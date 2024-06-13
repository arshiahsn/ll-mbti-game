import { useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import PlayerSelect from "./components/PlayerSelect";
import GuessInput from "./components/GuessInput";

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
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [guesses, setGuesses] = useState({});
  const [isDone, setIsDone] = useState(false);

  const submitGuesses = async (newGuesses: Guess, selectedPlayer: Player) => {
    try {
      setGuesses(newGuesses);
      console.log("Guesses submitted:", newGuesses, selectedPlayer);
      await client.models.Guesses.create({
        guesses: JSON.stringify(guesses),
        player: selectedPlayer,
      });
      setIsDone(true);
    } catch (error: unknown) {
      setIsDone(false);
    }
  };

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
                {!isDone && (
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
                    />
                  </>
                )}
                {isDone && <h2>Thanks for playing!</h2>}
              </>
            )}
          </div>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
