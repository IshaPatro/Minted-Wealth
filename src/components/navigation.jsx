import React from "react";
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
          <a className="navbar-brand page-scroll" href="#page-top">
            <img src={logo} alt="MintedWealth" id="logo"/>
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#smn" className="page-scroll">
                Stock Market Navigator
              </a>
            </li>
            <li>
              <a href="#overallProfit" className="page-scroll">
                Overall Profit
              </a>
            </li>
            <li>
              <a href="#netWorth" className="page-scroll">
                Net Worth
              </a>
            </li>
            <li>
              <a href="#testimonials" className="page-scroll">
              Testimonials
              </a>
            </li>
            <li>
              <a href="#contact" className="page-scroll">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
