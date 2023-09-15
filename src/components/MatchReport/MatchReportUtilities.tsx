import { MatchReportSteps } from "../../constants/Constants";
import { IGameTableProps } from "../GameTable/GameTable";

export interface IMatchReportDisplayStrings {
  title: string;
  subtitle: string;
  buttonText?: string;
}

export interface IMatchReportItem {
  matchReportStep: MatchReportSteps;
  displayStrings: IMatchReportDisplayStrings;
  showSuggestion?: boolean;
  onClickStepButton?: () => void;
}

export const getMatchReportItems = (
  matchReportStep: MatchReportSteps,
  setMatchReportStep: (newMatchReportStep: MatchReportSteps) => void
): IMatchReportItem => {
  switch (matchReportStep) {
    case MatchReportSteps.Registration:
      return {
        matchReportStep: matchReportStep,
        displayStrings: {
          title: "Singles or Doubles? Tap your badges to get in the table!",
          subtitle: "You can also login to aka.ms/ttmsft and choose your table",
          buttonText: "Continue",
        },
        showSuggestion: true,
        onClickStepButton: () => {
          setMatchReportStep(MatchReportSteps.Winners);
        },
      };
    case MatchReportSteps.Winners:
      return {
        matchReportStep: matchReportStep,
        displayStrings: {
          title: "Good game! Confirm the winners side",
          subtitle:
            "Touch the winners side to highlight it and confirm the match result",
          buttonText: "Confirm",
        },
        onClickStepButton: () => {
          setMatchReportStep(MatchReportSteps.Confirmation);
        },
      };
    case MatchReportSteps.Confirmation:
      return {
        matchReportStep: matchReportStep,
        displayStrings: {
          title: "The match was successfully registered!",
          subtitle: "You can check your new ratings below",
        },
      };
  }
};
