import React from "react";
import MarketingApp from "./components/MarketingApp";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
export default () => {
  // the `createGenerateClassName` function is used to generate unique class names for Material-UI components.
  // in this case the css keys would be names as mkt1 , mkt2 etc
  const generateClassName = createGenerateClassName({
    productionPrefix: "con", // Prefix for class names in production
    disableGlobal: true, // Disable global styles to avoid conflicts
  });
  return (
    <StylesProvider injectFirst generateClassName={generateClassName}>
      <BrowserRouter>
        <div>
          {/* This is a warpper component. This is required as App.js can return only react element */}
          {/* 1. load the marketing app */}
          <Header />
          <MarketingApp />
        </div>
      </BrowserRouter>
    </StylesProvider>
  );
};
