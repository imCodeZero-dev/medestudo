import { useState, useEffect, useRef } from "react";

export const useWidth = () => {
  const [width, setWidth] = useState<any>(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
    };
  }, []);
  return { width };
};
export const useHeight = () => {
  const [height, setHeight] = useState<number>(window.outerHeight);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setHeight(window.outerHeight);
    });
  
    return () => {
      window.removeEventListener("resize", () => {
        setHeight(window.outerHeight);
      });
    };
  }, []);
  return { height };
};
