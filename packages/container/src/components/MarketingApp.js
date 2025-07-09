import { mount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    // Mount the MarketingApp when the component mounts
    // During load invokes mount function from marketing webservice that passes the below div element
    // The mount funciton within Markeing app will render the marketing app into this div element
    mount(ref.current);
  }, []);

  return (
    <div>
      {/* The MarketingApp will be mounted here */}
      <div ref={ref} />
    </div>
  );
};
