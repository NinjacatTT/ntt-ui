import React from "react";
import { MatchReport } from "../MatchReport/MatchReport";
import { theme } from "../../contexts/ThemeContext/ThemeConstants";
import { ThemeContext } from "../../contexts/ThemeContext/ThemeContext";

export const AppWrapper = () => {
  return (
    <ThemeContext.Provider value={{ theme: theme }}>
      <MatchReport />
    </ThemeContext.Provider>
  );
};
