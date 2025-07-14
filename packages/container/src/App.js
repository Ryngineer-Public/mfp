import React from "react";
import MarketingApp from "./components/MarketingApp";
export default () => {
  return (
    <div>
      {/* This is a warpper component. This is required as App.js can return only react element */}
      {/* 1. load the marketing app */}
      <MarketingApp />
    </div>
  );
};
