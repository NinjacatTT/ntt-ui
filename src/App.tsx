import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { AppWrapper } from "./components/AppWrapper/AppWrapper";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

export default function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <AppWrapper />
    </FluentProvider>
  );
}
