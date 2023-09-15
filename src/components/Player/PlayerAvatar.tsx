import "./PlayerAvatar.scss";

import { Avatar, Text } from "@fluentui/react-components";
import React from "react";

export interface IPlayerAvatarProps {
  playerName: string;
  playerRating: string;
}

export const PlayerAvatar = (props: IPlayerAvatarProps) => {
  const { playerName, playerRating } = props;

  return (
    <div className="player-avatar-container">
      <Avatar size={96} />
      <Text
        style={{
          color: "#fff",
          fontSize: 16,
          fontWeight: "bold",
          marginTop: 5,
        }}
      >
        {playerName}
      </Text>
      <Text
        style={{
          color: "#fff",
          fontSize: 14,
          fontWeight: "bold",
        }}
      >
        {playerRating}
      </Text>
    </div>
  );
};
