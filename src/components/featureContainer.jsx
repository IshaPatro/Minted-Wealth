import React from 'react';
import FeatureButton from './featureButton';
import { Link } from 'react-router-dom';

const FeatureContainer = ({ imgSrc, stylingId, index, title, subtitle, bodyContent, linkTo }) => {
  const shouldReverseStyles = index % 2 === 0;
  
  return (
    <div className="text-center" style={{ height: '100%' }}>
      <div className="container">
        <div id={stylingId} className="features">
          <div className="container">
            <div className="col-md-10 col-md-offset-1 section-title">
              <h2>{title}</h2>
            </div>
            <div className={shouldReverseStyles ? "row" : "row flex-row-reverse"}>
              <div className="col-lg-6">
                <img src={imgSrc} className="featureImg" alt={title} />
              </div>
              <div className="col-lg-6">
                <div className="p-5 mt-4">
                  <br /><br />
                  <h1 className="display-4">{subtitle}</h1>
                  <p className="lead">{bodyContent}</p>
                  <Link to={linkTo}>
                    <FeatureButton buttonText="Explore Now" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureContainer;
