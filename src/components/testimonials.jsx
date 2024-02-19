import React from "react";

import img1 from '../img/testimonials/01.png';
import img2 from '../img/testimonials/02.png';

export const DUMMY_DATA =  [
    {
      "img": img1,
      "text": "The stock market navigator is an incredible tool. It has completely changed the way I approach trading.",
      "name": "Amit Verma"
    },
    {
      "img": img2,
      "text": "Using this platform, I've seen a significant improvement in my trading performance. The real-time data and trend analysis make all the difference.",
      "name": "Riya Sharma"
    },
    {
      "img": img1,
      "text": "The stock market navigator has made trading so much easier for me. I used to struggle with tracking trends and making decisions, but not anymore. Thanks to this platform!",
      "name": "Rajesh Patel"
    },
    {
      "img": img2,
      "text": "This platform is a game-changer for anyone in the stock market. It's user-friendly and accessible, and it has boosted my confidence in trading.",
      "name": "Anjali Singh"
    },
    {
      "img": img1,
      "text": "I'm truly impressed with the stock market navigator. It's a must-have for anyone serious about trading. It simplifies complex data and trends.",
      "name": "Vikram Khanna"
    },
    {
      "img": img2,
      "text": "I've tried various trading platforms, but this one stands out. The real-time data is a game-changer, and I've seen an improvement in my profits.",
      "name": "Sneha Kapoor"
    }
  ];

export const Testimonials = (props) => {

  return (
    <div id="testimonials">
      <div className="container">
        <div className="section-title text-center">
          <h2>What our clients say</h2>
        </div>
        <div className="row">
          {DUMMY_DATA
            ? DUMMY_DATA.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-4">
                  <div className="testimonial">
                    <div className="testimonial-image">
                      {" "}
                      <img src={d.img} alt="" />{" "}
                    </div>
                    <div className="testimonial-content">
                      <p>"{d.text}"</p>
                      <div className="testimonial-meta"> - {d.name} </div>
                    </div> 
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
