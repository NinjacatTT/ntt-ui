import React from "react";
import { IPlayer } from "../contracts/Player";

const PLAYERS: IPlayer[] = [
  { playerName: "Arian Gallardo", playerRating: "1000" },
  { playerName: "Aglahir Jimenez", playerRating: "1100" },
  { playerName: "Elisa Uhura", playerRating: "1200" },
  { playerName: "Tomi Olubeko", playerRating: "1300" },
];

export const usePlayersMock = () => {
  const [players, setPlayers] = React.useState<IPlayer[]>([]);
  const [count, setCount] = React.useState<number>(0);

  const onAddPlayer = () => {
    if (count >= 4) {
      return;
    }
    setPlayers([...players, PLAYERS[count]]);
    setCount(count + 1);
  };

  const clearPlayers = () => {
    setCount(0);
    setPlayers([]);
  };

  return { players, onAddPlayer, clearPlayers };
};
