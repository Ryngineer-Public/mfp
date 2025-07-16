import React, { lazy, Suspense, suspense } from "react";
// import MarketingApp from "./components/MarketingApp";
// import AuthApp from "./components/AuthApp";
import Progress from "./components/Progress";
import Header from "./components/Header";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
// lazy loading the Marketing and Auth apps thus allowing the container app to load faster
// and only load the required microfrontend when the user navigates to that path
const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthAppLazy = lazy(() => import("./components/AuthApp"));
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
        {/* <div> */}
        {/* This is a warpper component. This is required as App.js can return only react element */}

        <Header />
        {/* <MarketingApp /> */}
        <Suspense fallback={<Progress />}>
          <Switch>
            {/* ORDER NEEDS TO BE MAINTAINED WITH GENERIC PATHS AT THE BOTTOM ELSE ALL PATHS ARE SERVED BY GENERIC PATH */}
            {/* 2. load the auth app */}
            <Route path="/auth" component={AuthAppLazy} />
            {/* 1. load the marketing app */}
            <Route path="/" component={MarketingLazy} />
          </Switch>
        </Suspense>
        {/* </div> */}
      </BrowserRouter>
    </StylesProvider>
  );
};
