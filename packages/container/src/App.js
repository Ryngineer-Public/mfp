import React, { lazy, Suspense, useEffect, useState } from "react";
// import MarketingApp from "./components/MarketingApp";
// import AuthApp from "./components/AuthApp";
import Progress from "./components/Progress";
import Header from "./components/Header";
import {
  BrowserRouter,
  Switch,
  Route,
  Router,
  Redirect,
} from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import { createBrowserHistory } from "history";
// lazy loading the Marketing and Auth apps thus allowing the container app to load faster
// and only load the required microfrontend when the user navigates to that path
const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthAppLazy = lazy(() => import("./components/AuthApp"));
const DashboardAppLazy = lazy(() => import("./components/DashboardApp"));

const history = createBrowserHistory();

export default () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  // If the user is logged in , redirec them to the dashboard
  useEffect(() => {
    if (userLoggedIn) {
      history.push("/dashboard");
    }
  }, [userLoggedIn]);

  // the `createGenerateClassName` function is used to generate unique class names for Material-UI components.
  // in this case the css keys would be names as mkt1 , mkt2 etc
  const generateClassName = createGenerateClassName({
    productionPrefix: "con", // Prefix for class names in production
    disableGlobal: true, // Disable global styles to avoid conflicts
  });
  return (
    <StylesProvider injectFirst generateClassName={generateClassName}>
      {/* Moved from BrowserRouter to Router and explicitly passed in history as we need an handle of history object. */}
      <Router history={history}>
        {/* <div> */}
        {/* This is a warpper component. This is required as App.js can return only react element */}

        <Header
          signedIn={userLoggedIn}
          onSignOut={() => setUserLoggedIn(false)}
        />
        {/* <MarketingApp /> */}
        <Suspense fallback={<Progress />}>
          <Switch>
            {/* ORDER NEEDS TO BE MAINTAINED WITH GENERIC PATHS AT THE BOTTOM ELSE ALL PATHS ARE SERVED BY GENERIC PATH */}
            {/* 2. load the auth app */}
            <Route path="/auth">
              <AuthAppLazy
                onSignIn={() => {
                  console.log("Container: User signed in");
                  setUserLoggedIn(true);
                }}
              />
            </Route>
            {/* 3. Load Dashboard App */}
            <Route path="/dashboard">
              {/* If user is not logged in and tries to access /dashboard link redirect them to the home page */}
              {!userLoggedIn && <Redirect to="/" />}
              <DashboardAppLazy />
            </Route>
            {/* 1. load the marketing app */}
            <Route path="/" component={MarketingLazy} />
          </Switch>
        </Suspense>
        {/* </div> */}
      </Router>
    </StylesProvider>
  );
};
