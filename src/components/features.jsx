import React from "react";
import { useSpring, animated } from "react-spring";
import smn from '../img/smn.JPEG';
import overallProfit from '../img/overallProfit.JPEG';
import netWorth from '../img/netWorth.PNG';
import FeatureContainer from './featureContainer';

export const Features = (props) => {

const config = [
    {
        imgSrc:smn,
        stylingId:"smn",
        title:"Stock Market Navigator",
        subtitle:"Unlock the Future of Finance",
        bodyContent:"Our cutting-edge platform provides real-time stock market data at your fingertips, allowing you to make informed decisions, track market trends, and secure your financial future with ease",
        linkTo: "/stockMarketNavigator",
    },
    {
        imgSrc:overallProfit,
        stylingId:"overallProfit",
        title:"Overall Profit",
        subtitle:"Maximize Your Earnings",
        bodyContent:"We don't just count profits; we track your financial journey since the day you started trading. Whether it's celebrating your gains or calculating your losses, we help you navigate your path to financial success on your terms.",
        linkTo: "/overallProfit",
    },
    {
        imgSrc:netWorth,
        stylingId:"netWorth",
        title:"Net Worth",
        subtitle:"Know your worth",
        bodyContent:"This tool unveils your true net worth, enabling you to empower your financial decisions and pave the way for a prosperous tomorrow. Elevate your financial journey, explore the future of finance, and take control of your trading experience with us. Your financial success story begins here.",
        linkTo: "/netWorth",
    },
]
  return config?.map((item, index) => <FeatureContainer
                                            index={index}
                                            imgSrc={item?.imgSrc}
                                            title={item?.title}
                                            subtitle={item.subtitle}
                                            bodyContent={item?.bodyContent}
                                            stylingId={item.stylingId}
                                            linkTo={item.linkTo}/>
                                          );
                                        };
