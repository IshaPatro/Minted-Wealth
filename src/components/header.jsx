import React, { useEffect } from "react";
import bgVideo from "../img/intro-bg.mp4"

export const Header = (props) => {
  useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY;

        // Calculate translations for each letter based on scrollY
        const translationM = scrollY * 0.2 + "px";
        const translationI = scrollY * 0.3 + "px";
        const translationN = scrollY * 0.2 + "px";
        const translationfirstT = scrollY * 0.5 + "px";
        const translationfirstE = scrollY * 0.4 + "px";
        const translationD = scrollY * 0.3 + "px";
        const translationSpace = scrollY * 0.2 + "px";
        const translationW = scrollY * 0.4 + "px";
        const translationsecondE = scrollY * 0.3 + "px";
        const translationA = scrollY * 0.5 + "px";
        const translationL = scrollY * 0.6 + "px";
        const translationsecondT = scrollY * 0.4 + "px";
        const translationH = scrollY * 0.2 + "px";

        // Apply translations to the letter elements
        document.querySelector(".letter-M").style.transform = `translateY(${translationM})`;
        document.querySelector(".letter-I").style.transform = `translateY(${translationI})`;
        document.querySelector(".letter-N").style.transform = `translateY(${translationN})`;
        document.querySelector(".letter-firstT").style.transform = `translateY(${translationfirstT})`;
        document.querySelector(".letter-firstE").style.transform = `translateY(${translationfirstE})`;
        document.querySelector(".letter-D").style.transform = `translateY(${translationD})`;
        document.querySelector(".letter-space").style.transform = `translateY(${translationSpace})`;
        document.querySelector(".letter-W").style.transform = `translateY(${translationW})`;
        document.querySelector(".letter-secondE").style.transform = `translateY(${translationsecondE})`;
        document.querySelector(".letter-A").style.transform = `translateY(${translationA})`;
        document.querySelector(".letter-L").style.transform = `translateY(${translationL})`;
        document.querySelector(".letter-secondT").style.transform = `translateY(${translationsecondT})`;
        document.querySelector(".letter-H").style.transform = `translateY(${translationH})`;
      };

      // Attach the scroll event listener
      window.addEventListener("scroll", handleScroll);

      // Remove the scroll event listener when the component unmounts
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

  return (
    <header id="header">
      <div className="intro">
        <video src = {bgVideo} type="video/mp4" autoPlay muted loop className="video-background"></video>
        <div className="overlay">
          <div className="container">
            <div className="row header-row">
              <div className="col-md-8 col-md-offset-8 intro-text">
                <div className="heading">
                  <div className="minted">
                    <span className="letter letter-M">M</span>
                    <span className="letter letter-I">i</span>
                    <span className="letter letter-N">n</span>
                    <span className="letter letter-firstT">t</span>
                    <span className="letter letter-firstE">e</span>
                    <span className="letter letter-D">d</span>
                    <span className="letter letter-space"> </span>
                  </div>
                  <div className="wealth">
                    <span className="letter letter-W">W</span>
                    <span className="letter letter-secondE">e</span>
                    <span className="letter letter-A">a</span>
                    <span className="letter letter-L">l</span>
                    <span className="letter letter-secondT">t</span>
                    <span className="letter letter-H">h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
