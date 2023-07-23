import { useEffect } from "react";

const removeSplashScreen = () => {
  const splashScreenEl = document.getElementById("splash-screen");
  if (splashScreenEl) {
    splashScreenEl.style.opacity = "0";
    splashScreenEl.ontransitionend = () => {
      splashScreenEl.remove();
    };
  }
};

export const useRemoveSplashScreen = (timeout = 1000) => {
  useEffect(() => {
    const timeoutId = setTimeout(removeSplashScreen, timeout);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [timeout]);
};
