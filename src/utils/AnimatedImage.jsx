/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./AnimatedImage.css";

const AnimatedImages = ({ marketing, seo, copyright, cloude }) => {
  const [animate, setAnimate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate((prev) => (prev === 3 ? 0 : prev + 1));
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-[170px] items-center">
        <div className={`animation-wrapper ${animate === 0 ? "animate" : ""}`}>
          <img src={marketing} alt="" width={165} className="animated-box box1"/>
        </div>
        <div className={`animation-wrapper ${animate === 1 ? "animate" : ""}`}>
          <img src={seo} alt="" width={112} className="animated-box box2" />
        </div>
        <div className={`animation-wrapper ${animate === 2 ? "animate" : ""}`}>
          <img src={copyright} alt="" width={165} className="animated-box box3"/>
        </div>
        <div className={`animation-wrapper ${animate === 3 ? "animate" : ""}`}>
          <img src={cloude} alt="" width={165} className="animated-box box4" />
        </div>
      </div>
    </div>
  );
};

export default AnimatedImages;
