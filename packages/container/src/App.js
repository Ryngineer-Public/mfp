import React from "react";
import MarketingApp from "./components/MarketingApp";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom";
export default () => {
  return (
    <BrowserRouter>
      <div>
        {/* This is a warpper component. This is required as App.js can return only react element */}
        {/* 1. load the marketing app */}
        <Header />
        <MarketingApp />
      </div>
    </BrowserRouter>
  );
};
