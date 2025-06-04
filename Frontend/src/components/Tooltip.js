// components/Tooltip.jsx
import React, { useState, useEffect } from 'react';

export default function Tooltip({ text, children, delay = 1000 }) {
  const [show, setShow] = useState(false);
  const [timer, setTimer] = useState(null);

  const handleMouseEnter = () => {
    const newTimer = setTimeout(() => setShow(true), delay);
    setTimer(newTimer);
  };

  const handleMouseLeave = () => {
    clearTimeout(timer);
    setShow(false);
  };

  const handleClick = () => {
    clearTimeout(timer);
    setShow(false);
  };

  useEffect(() => {
    return () => clearTimeout(timer);
  }, [timer]);

  return (
    <div 
      className="relative group inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleClick}
    >
      {children}

      <div
        className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2
          ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"} 
          transition-all duration-300 ease-out
          bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-lg
          whitespace-nowrap pointer-events-none z-50`}
      >
        {text}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-0 h-0 border-t-0 border-b-4 border-b-gray-800 border-x-4 border-x-transparent" />
      </div>
    </div>
  );
}