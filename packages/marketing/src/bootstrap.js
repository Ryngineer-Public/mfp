import React from "react";
import ReactDom from "react-dom";
import App from "./App";

// Mount function to start the application

const mount = (el) => {
  ReactDom.render(<App />, el);
};

// If we are in development and in isolation, call mount immediately
if (process.env.NODE_ENV === "development") {
  const el = document.querySelector("#_marketing-dev-root");

  // If an element with the id "_marketing-dev-root" exists, mount the app
  if (el) {
    mount(el);
  }
}

// Export the mount function to be used in other applications
export { mount };
