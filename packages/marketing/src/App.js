import React from "react";
import {
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom/cjs/react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Landing from "./components/Landing";
import Pricing from "./components/Pricing";

// the `createGenerateClassName` function is used to generate unique class names for Material-UI components.
// in this case the css keys would be names as mkt1 , mkt2 etc
const generateClassName = createGenerateClassName({
  productionPrefix: "mkt", // Prefix for class names in production
  disableGlobal: true, // Disable global styles to avoid conflicts
});

export default () => {
  return (
    <BrowserRouter>
      <StylesProvider injectFirst generateClassName={generateClassName}>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/pricing" exact component={Pricing} />
        </Switch>
      </StylesProvider>
    </BrowserRouter>
  );
};
