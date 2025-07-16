import React from "react";
import ReactDom from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

// Mount function to start the application

const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath || "/"], // Initial route for the memory history
    });
  if (onNavigate) {
    // invoke the onNavigate callback when the memory history changes
    history.listen(onNavigate); // Listen for navigation events
  }
  ReactDom.render(<App history={history} />, el);

  return {
    // This is a handler function that is used to update teh microfrontend's router history whenever the parent application navigates to a new route
    onParentNavigate: ({ pathname: newPathname }) => {
      const { pathname } = history.location;
      // If the new pathname is different from the current pathname, update the history
      console.log(
        `Container: onParentNavigate called with pathname: ${newPathname}`
      );
      console.log(`Container: Current pathname: ${pathname}`);
      // If the new pathname is the same as the current pathname
      if (pathname === newPathname) {
        return;
      }
      // Update the browser history with the new pathname
      history.push(newPathname);
    },
  };
};

// If we are in development and in isolation, call mount immediately
if (process.env.NODE_ENV === "development") {
  const el = document.querySelector("#_auth-dev-root");

  // If an element with the id "auth-dev-root" exists, mount the app
  if (el) {
    // Pass a default history if the microfrintenf is run in isolation. This would configure microfrintend to use Browser History instead of Memory History when run from a container application
    mount(el, { defaultHistory: createBrowserHistory() });
  }
}

// Export the mount function to be used in other applications
export { mount };
