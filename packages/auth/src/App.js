import React from "react";
import {
  Switch,
  Route,
  // BrowserRouter,
  Router,
} from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import SignIn from "./components/Signin";
import SignUp from "./components/Signup";

// the `createGenerateClassName` function is used to generate unique class names for Material-UI components.
// in this case the css keys would be names as mkt1 , mkt2 etc
const generateClassName = createGenerateClassName({
  productionPrefix: "aut", // Prefix for class names in production
  disableGlobal: true, // Disable global styles to avoid conflicts
});

// History is a field that holds routing ingormation for memeory router
export default ({ history, onSignIn }) => {
  console.log("AuthApp: Rendered", onSignIn);
  return (
    // Uses Memory Router to handle routing in a single-page application
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <Switch>
          <Route path="/auth/signin">
            <SignIn onSignIn={onSignIn} />
          </Route>
          <Route path="/auth/signup">
            <SignUp onSignIn={onSignIn} />
          </Route>
        </Switch>
      </StylesProvider>
    </Router>
  );
};
