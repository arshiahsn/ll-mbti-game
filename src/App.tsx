import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import PlayerSelect from "./components/PlayerSelect";
import GuessInput from "./components/GuessInput";

const client = generateClient<Schema>();

const serverUrl = "http://localhost:3001/api"; // Update to your backend URL

const predefinedPlayers = [
  { id: 0, name: "Alice" },
  { id: 1, name: "Bob" },
  { id: 2, name: "Charlie" },
  { id: 3, name: "Diana" },
];

function App() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [guesses, setGuesses] = useState({});

  const submitGuesses = async (newGuesses, selectedPlayer) => {
    setGuesses(newGuesses);
    console.log("Guesses submitted:", newGuesses, selectedPlayer);
    await client.models.Guesses.create({
      guesses,
      player: selectedPlayer
    })
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
          </div>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
