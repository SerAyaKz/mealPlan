import "./style.css";
import { Navbar, Footer } from "../../components/common/index";
import playicon from "../../assets/PLay Icon.png";
import marketing from "../../assets/Ai Marketing.png";
import seo from "../../assets/Ai SEO.png";
import copyright from "../../assets/Ai Copyright.png";
import cloude from "../../assets/Cloude Solution.png";
import plus from "../../assets/Plus Symbol.png";
import circle from "../../assets/Circle Symbol.png";
import circleDoble from "../../assets/Doble Circle.png";
import AnimatedImages from "../../utils/AnimatedImage";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Model } from "../../utils/Model";
const Home = () => {
  const videoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

  const handleWatchNowClick = () => {
    window.location.href = videoUrl;
  };
  return (
    <div className="relative w-full overflow-x-hidden">
      <Navbar />

      {/* Body Content */}
      <div className="flex justify-between items-center  text-[#222] pl-[92px]  h-[940px] overflow-hidden">
        {/* Text Content */}
        <section className="mt-[-100px]">
          <div className="absolute top-[385px] left-[90px] bottom-0 right-0">
            <div className="text-[60px] font-Lora " id="text-behind">
              MEAL PLAN
            </div>
            <div className="text-[60px] font-Lora " id="text-behind-blur">
              MEAL PLAN
            </div>
            <div className="text-[60px] font-Lora " id="text-front">
              MEAL PLAN
            </div>
          </div>

          <p className="font-Lora text-[20px] text-[#222] w-[70%] leading-[25px]">
            Where Nutrient-Packed Delights Meet Wellness Delight!
          </p>

          <div className="font-Lora hover:scale-[1.05] transform duration-200 Watch-Now-Btn ml-1" onClick={handleWatchNowClick}>
      Plan
      <img src={playicon} alt="" width={27} height={27} />
    </div>
        </section>

        {/* Image Content */}
        <section className="relative flex ">
          <AnimatedImages
            marketing={marketing}
            seo={seo}
            copyright={copyright}
            cloude={cloude}
          />

          <div className="flex justify-center items-center relative  mr-[-75px] mt-[-100px] z-[99]">
            <div className="abstractCircle" />
            <div className="dotedCircle" />
            <div className="cup">
              <Canvas camera={{ position: [3, 50, 14.25], fov: 6 }}>
                <ambientLight intensity={1.25} />
                <ambientLight intensity={3.1} />
                <directionalLight intensity={0.4} />
                <Suspense fallback={null}>
                  <Model position={[0, -0.1, 0]} />
                </Suspense>
                <OrbitControls autoRotate />
              </Canvas>
            </div>
          </div>
        </section>
      </div>

      {/* Floating Objects */}
      <>
        <img
          src={circle}
          alt=""
          className="w-[50px] h-[50px] absolute left-[417px] top-[180px] floating"
          style={{ animationDelay: "0s" }}
        />

        <img
          src={circle}
          alt=""
          className="w-[70px] h-[70px] absolute left-[1760px] top-[140px] floating"
          style={{ animationDelay: "0.5s" }}
        />

        <img
          src={circleDoble}
          alt=""
          className="w-[75px] h-[70px] absolute left-[977px] top-[890px] floating"
          style={{ animationDelay: "1s" }}
        />

        <img
          src={plus}
          alt=""
          className="w-[50px] h-[50px] absolute left-[800px] top-[284px] floating"
          style={{ animationDelay: "1.5s" }}
        />

        <img
          src={plus}
          alt=""
          className="w-[50px] h-[50px] absolute left-[651px] top-[650px] floating"
          style={{ animationDelay: "2s" }}
        />

        <img
          src={plus}
          alt=""
          className="w-[50px] h-[50px] absolute left-[110px] bottom-[212px] floating"
          style={{ animationDelay: "2.5s" }}
        />
      </>
      <div className="bg-white text-black p-8 font-Lora">
        <div className="container mx-auto">
          <div className="flex justify-center gap-4">
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
              <div className="px-6 py-4 text-center">
                <div className="font-bold text-xl mb-2 text-black font-Lora">
                  Effortless Meal Planning
                </div>
                <p className="text-gray-700 text-base font-Lora">
                  Explore a world of culinary possibilities with our intuitive
                  recipe platform. Plan your meals effortlessly for the week,
                  month, or any duration you desire. Enjoy delicious,
                  home-cooked meals tailored to your preferences, all at the
                  touch of a button. Simplify your kitchen experience and savor
                  the joy of stress-free meal planning.
                </p>
              </div>
            </div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white ">
              <div className="px-6 py-4 text-center">
                <div className="font-bold text-xl mb-2 text-black font-Lora">
                  Culinary Harmony: Recipe to Table
                </div>
                <p className="text-gray-700 text-base font-Lora ">
                  Immerse yourself in a seamless cooking journey with our
                  recipe-centric website. Discover a diverse array of recipes
                  curated to suit your tastes, and let our platform transform
                  them into a personalized meal plan. Whether you're a seasoned
                  chef or a kitchen novice, our intuitive interface makes it
                  easy to plan and execute your weekly or monthly menus,
                  bringing culinary harmony to your dining table.
                </p>
              </div>
            </div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
              <div className="px-6 py-4 text-center">
                <div className="font-bold text-xl mb-2 text-black font-Lora">
                  Nourish Your Week: Recipe Scheduler
                </div>
                <p className="text-gray-700 text-base font-Lora ">
                  Elevate your dining experience with our innovative recipe
                  scheduler. Unleash the power of personalized meal planning
                  that aligns with your nutritional goals and preferences. From
                  breakfast to dinner, our platform crafts a weekly or monthly
                  meal plan based on your selected recipes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;
