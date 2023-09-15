import { IPlayer } from "../../contracts/Player";

export const splitPlayersTeams = (players: IPlayer[]) => {
  let leftSidePlayers: IPlayer[] = [];
  let rightSidePlayers: IPlayer[] = [];

  if (players.length < 3) {
    players.forEach((player, index) => {
      if (index % 2 == 0) {
        leftSidePlayers.push(player);
      } else {
        rightSidePlayers.push(player);
      }
    });
  } else {
    players.forEach((player, index) => {
      if (index < 2) {
        leftSidePlayers.push(player);
      } else {
        rightSidePlayers.push(player);
      }
    });
  }
  return { leftSidePlayers, rightSidePlayers };
};
