import { useEffect } from "react";
export const ScrollToTop = (): void => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};
