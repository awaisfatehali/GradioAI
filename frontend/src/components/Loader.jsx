import React from "react";

const letters = ["G", "e", "n", "e", "r", "a", "t", "i", "n", "g"];

const Loader = () => {
  return (
    <div className="relative flex items-center justify-center w-[180px] h-[180px] text-white text-[1.2em] font-light rounded-full select-none">

      {letters.map((l, i) => (
        <span
          key={i}
          className="inline-block opacity-40 animate-letter z-[1]"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          {l}
        </span>
      ))}

      <div className="absolute top-0 left-0 w-full aspect-square rounded-full animate-rotate z-0"></div>
    </div>
  );
};

export default Loader;
