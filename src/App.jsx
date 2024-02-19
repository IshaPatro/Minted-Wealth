import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Outlet, Link, Routes } from "react-router-dom";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { Testimonials } from "./components/testimonials";
import { Contact } from "./components/contact";
import JsonData from "./data/data";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import StockMarketNavigator from './components/stockMarketNavigator';
import OverallProfit from './components/overallProfit';
import NetWorth from './components/netWorth';

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<>
            <Navigation />
            <Header data={landingPageData.Header} />
            <Features data={landingPageData.Features} />
            <Testimonials />
            <Contact data={landingPageData.Contact} />
          </>} />
          <Route path="/stockMarketNavigator" element={<StockMarketNavigator />} />
          <Route path="/overallProfit" element={<OverallProfit />} />
          <Route path="/netWorth" element={<NetWorth />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
