import video1 from "./constants/video1.mp4";
import video2 from "./constants/video2.mp4";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-1 lg:mt-2">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
      Turning today’s farming challenges 
        <span className="bg-gradient-to-r from-green-800 to-green-500 text-transparent bg-clip-text">
          {" "}
          into tomorrow’s opportunities.
        </span>
      </h1>
       
      <div className="flex mt-10 justify-center">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        >
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        >
          <source src={video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      
    </div>
  );
};

export default HeroSection;
