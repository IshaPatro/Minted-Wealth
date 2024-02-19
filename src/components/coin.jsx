import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import coinImage from '../img/coin.png'; // Replace with the path to your transparent coin image
import PiggyBankImage from '../img/piggybank.png'; // Replace with the path to your piggy bank image

export function ParallaxCoin1() {
  const [scrollY, setScrollY] = useState(0);
  const props = useSpring({
    from: { scrollY: -1000 },
    scrollY,
  });

  useEffect(() => {
    const handleScroll = () => {
      const featuresDiv = document.getElementById('features');
      const scrollPosition = window.scrollY;

      if (scrollPosition >= 0 && scrollPosition <= 800) {
        setScrollY(scrollPosition - 3800);
      } else {
        setScrollY(0);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <animated.div
      className="parallax-container"
      style={{
        transform: props.scrollY.interpolate((s) => `translateY(${s * 0.2}px)`),
      }}
    >
      <img
        src={coinImage}
        alt="Coin"
        className="parallax-coin"
        height="300px"
        width="300px"
      />
    </animated.div>
  );
}

export function ParallaxCoin2() {
  const [scrollY, setScrollY] = useState(0);
  const props = useSpring({
    from: { scrollY: -4800 },
    scrollY,
  });

  useEffect(() => {
    const handleScroll = () => {
      const featuresDiv = document.getElementById('features');
      const scrollPosition = window.scrollY;

      if (scrollPosition >= 0 && scrollPosition <= 800) {
        setScrollY(scrollPosition - 2800);
      } else {
        setScrollY(0);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <animated.div
      className="parallax-container"
      style={{
        transform: props.scrollY.interpolate((s) => `translateY(${s * 0.4}px)`),
      }}
    >
      <img
        src={coinImage}
        alt="Coin"
        className="parallax-coin"
        height="200px"
        width="200px"
      />
    </animated.div>
  );
}

export function PiggyBank() {
  return (
    <div className="parallax-container">
      <img
        src={PiggyBankImage}
        alt="Piggy Bank"
        className="parallax-piggy-bank"
      />
    </div>
  );
}
