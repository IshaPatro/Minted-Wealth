import React from "react";
import { NavLink } from 'react-router-dom';
import logo from "../img/logo.png"

export const Navigation = (props) => {
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <NavLink className="navbar-brand page-scroll" to="/">
            <img src={logo} alt="MintedWealth" id="logo"/>
          </NavLink>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <NavLink to="/stockMarketNavigator" activeClassName="selected">
                Stock Market Navigator
              </NavLink>
            </li>
            <li>
              <NavLink to="/overallProfit" activeClassName="selected">
                Overall Profit
              </NavLink>
            </li>
            <li>
              <NavLink to="/netWorth" activeClassName="selected">
                Net Worth
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
