import { Text } from "@fluentui/react-components";
import "./GameTable.scss";

import React from "react";
import { PlayerAvatar } from "../Player/PlayerAvatar";
import { splitPlayersTeams } from "./GameTableUtilities";
import { IPlayer } from "../../contracts/Player";
import classNames from "classnames";
import { GameTableSides } from "../../constants/Constants";

export interface IGameTableProps {
  players: IPlayer[];
  onAddPlayer: () => void;

  isGameTableClickable: boolean;

  showSuggestion?: boolean;
}

export const GameTable = (props: IGameTableProps) => {
  const { showSuggestion, players, onAddPlayer, isGameTableClickable } = props;

  const [winningSide, setWinningSide] = React.useState<GameTableSides>(
    GameTableSides.None
  );

  React.useEffect(() => {
    setWinningSide(GameTableSides.None);
  }, [players]);

  const { leftSidePlayers, rightSidePlayers } = React.useMemo(
    () => splitPlayersTeams(players),
    [players]
  );

  return (
    <div className="table-container">
      <div className="table-context" onClick={onAddPlayer}>
        <Text style={{ fontSize: 18 }}>
          {showSuggestion
            ? "Drag the players to their corresponding side"
            : null}
        </Text>
      </div>
      <div className="game-table">
        <div
          className={classNames(
            "left-side",
            isGameTableClickable && "is-clickable",
            winningSide == GameTableSides.Left && "winning-side"
          )}
          onClick={() => {
            if (isGameTableClickable) {
              setWinningSide(GameTableSides.Left);
            }
          }}
        >
          {leftSidePlayers.map((player, index) => (
            <PlayerAvatar key={index} {...player} />
          ))}
        </div>
        <div
          className={classNames(
            "left-side",
            isGameTableClickable && "is-clickable",
            winningSide == GameTableSides.Right && "winning-side"
          )}
          onClick={() => {
            if (isGameTableClickable) {
              setWinningSide(GameTableSides.Right);
            }
          }}
        >
          {rightSidePlayers.map((player, index) => (
            <PlayerAvatar key={index} {...player} />
          ))}
        </div>
      </div>
    </div>
  );
};
