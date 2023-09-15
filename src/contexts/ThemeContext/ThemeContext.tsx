import React from "react";

export interface IThemeContext {
  theme: any;
}

export const ThemeContext = React.createContext<IThemeContext>({ theme: {} });
