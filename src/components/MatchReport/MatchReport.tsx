import { Button, ProgressBar, Text } from "@fluentui/react-components";
import "./MatchReport.scss";

import React from "react";
import { ThemeContext } from "../../contexts/ThemeContext/ThemeContext";
import { GameTable } from "../GameTable/GameTable";
import { COUNTDOWN_TIME, MatchReportSteps } from "../../constants/Constants";
import { IMatchReportItem, getMatchReportItems } from "./MatchReportUtilities";
import { usePlayersMock } from "../../mocks/AddPlayer.Mock";

export interface IMatchReportProps {}

export const MatchReport = (props: IMatchReportProps) => {
  const [matchReportStep, setMatchReportStep] = React.useState<number>(
    MatchReportSteps.Registration
  );

  const items = React.useMemo(
    () => getMatchReportItems(matchReportStep, setMatchReportStep),
    [matchReportStep]
  );

  return (
    <MatchReportInner items={items} setMatchReportStep={setMatchReportStep} />
  );
};

export interface IMatchReportInnerProps {
  items: IMatchReportItem;
  setMatchReportStep: (newMatchReportStep: MatchReportSteps) => void;
}

const MatchReportInner = (props: IMatchReportInnerProps) => {
  const { items, setMatchReportStep } = props;
  const { matchReportStep, displayStrings, showSuggestion, onClickStepButton } =
    items;
  const { title, subtitle, buttonText } = displayStrings;

  const { theme } = React.useContext(ThemeContext);
  const { players, onAddPlayer, clearPlayers } = usePlayersMock();

  const [countdown, setCountdown] = React.useState<number>(COUNTDOWN_TIME);

  React.useEffect(() => {
    if (matchReportStep == MatchReportSteps.Confirmation) {
      if (countdown <= 0) {
        setMatchReportStep(MatchReportSteps.Registration);
        setCountdown(COUNTDOWN_TIME);
        clearPlayers();
      }

      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [matchReportStep, countdown]);

  const showCountdown = matchReportStep == MatchReportSteps.Confirmation;

  return (
    <div className="container">
      <div className="actionable-area">
        <div className="header">
          <Text className="table-identifier" size={400}>
            Table: VANCOUVER - 725 <b>T1</b>
          </Text>
        </div>
        <div className="title-section">
          <Text
            style={{
              marginTop: 20,
              color: theme.colors.primaryBlue,
              fontSize: 32,
              fontWeight: "bold",
            }}
          >
            {title}
          </Text>
          <Text style={{ marginTop: 30, fontSize: 24 }}>{subtitle}</Text>
        </div>
        <GameTable
          showSuggestion={showSuggestion}
          players={players}
          onAddPlayer={onAddPlayer}
          isGameTableClickable={matchReportStep == MatchReportSteps.Winners}
        />
        {buttonText && (
          <Button
            style={{
              marginTop: 20,
              width: 218,
              height: 55,
              backgroundColor:
                matchReportStep == MatchReportSteps.Registration
                  ? "#0f6cbd"
                  : "#46a07e",
            }}
            onClick={onClickStepButton}
            disabled={players.length != 2 && players.length != 4}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              {buttonText}
            </Text>
          </Button>
        )}
        {showCountdown && (
          <>
            <ProgressBar
              style={{ marginTop: 20, width: 410 }}
              value={COUNTDOWN_TIME - countdown}
              max={COUNTDOWN_TIME}
            />
            <Text
              style={{
                fontSize: 18,
                color: "#000",
                marginTop: 10,
              }}
            >{`Returning to main page in ${countdown} second${
              countdown > 1 ? "s" : ""
            }`}</Text>
          </>
        )}
      </div>
    </div>
  );
};
