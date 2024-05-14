import { useState, useEffect } from "react";

// Hook that return boolean if browser is mobile

export default function useScreenMobile() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [screenMobile, setScreenMobile] = useState(undefined);
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      const container = document.getElementById("root").getBoundingClientRect();
      // Set window width/height to state
      setScreenMobile(container.width <= 1023);
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return screenMobile;
}
