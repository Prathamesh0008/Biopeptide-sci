"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const percent = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(percent);

      lastScrollY.current = scrollTop;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="w-full h-[4px] bg-transparent overflow-hidden">
      <div
        className="
          h-full
          bg-gradient-to-r from-bioBlue to-bioGreen
          origin-left
          transition-transform duration-75 ease-out
        "
        style={{
          transform: `scaleX(${progress})`,
        }}
      />
    </div>
  );
}
