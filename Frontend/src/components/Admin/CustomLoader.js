import React from "react";

const CustomLoader = () => {
  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

        .custom-loader svg {
          font-family: "Poppins", sans-serif;
          width: 200px;
          height: 100px;
        }
        .custom-loader svg text {
          animation: stroke 2s infinite alternate;
          stroke-width: 2;
          stroke: #0C2218;
          font-size: 35px;
          user-select: none;
        }
        @keyframes stroke {
          0% {
            fill: rgba(199,177,83,0);
            stroke: rgba(12,34,24,1);
            stroke-dashoffset: 25%;
            stroke-dasharray: 0 50%;
            stroke-width: 2;
          }
          70% {
            fill: rgba(199,177,83,0);
            stroke: rgba(12,34,24,1);
          }
          80% {
            fill: rgba(199,177,83,0);
            stroke: rgba(12,34,24,1);
            stroke-width: 3;
          }
          100% {
            fill: rgba(199,177,83,1);
            stroke: rgba(12,34,24,0);
            stroke-dashoffset: -25%;
            stroke-dasharray: 50% 0;
            stroke-width: 0;
          }
        }
      `}</style>

      <div className="custom-loader flex items-center justify-center w-full h-[800px] bg-[#F4FBF7]">
        <svg viewBox="0 0 300 60" role="status" aria-busy="true" aria-label="Loading JanSeva Portal">
          <text x="50%" y="50%" dy=".35em" textAnchor="middle">
            JanSeva Portal
          </text>
        </svg>
      </div>
    </>
  );
};

export default CustomLoader;