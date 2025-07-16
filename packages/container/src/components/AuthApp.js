import { mount } from "auth/AuthApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    console.log("AuthApp: useEffect called");
    // Mount the AuthApp when the component mounts
    // During load invokes mount function from marketing webservice that passes the below div element
    // The mount funciton within Markeing app will render the marketing app into this div element
    // Argument 2 : onNavigate is a callback function that will be invoked when the pathname changes
    // This is used to update the browser history when the MarketingApp navigates
    // This allows the router history from the MarketingApp to stay in sync with the browser history of the container application.
    // The mount function now returns a value , one of the fileds in the json object is onParentNavigate. This is a handler function that is used to update the microfrontend's router history whenever the parent application navigates to a new route
    const { onParentNavigate } = mount(ref.current, {
      onNavigate: ({ pathname: newPathname }) => {
        const { pathname } = history.location;
        // If the new pathname is different from the current pathname, update the history
        if (pathname === newPathname) {
          return;
        }
        // Update the browser history with the new pathname
        console.log(
          `Container: onParentNavigate called with pathname: ${newPathname}`
        );
        console.log(`Container: Current pathname: ${pathname}`);
        history.push(newPathname);
      },
      initialPath: history.location.pathname, // Pass the current pathname to the AuthApp
    });

    history.listen(onParentNavigate);
  }, []);

  return (
    <div>
      {/* The AuthApp will be mounted here */}
      <div ref={ref} />
    </div>
  );
};
