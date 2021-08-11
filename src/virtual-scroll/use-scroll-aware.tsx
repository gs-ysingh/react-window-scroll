import { useEffect, useState } from "react";

const useScrollAware = (ref: React.MutableRefObject<HTMLDivElement>): number => {
  const [scrollTop, setScrollTop] = useState(0);

  const onScroll = (e) => {
    requestAnimationFrame(() => {
      setScrollTop(e.target.scrollTop);
    });
  };

  useEffect(() => {
    const container = ref.current;
    container.addEventListener("scroll", onScroll);
    return () => {
      container.removeEventListener("scroll", onScroll);
    };
  }, []);

  return scrollTop;
};
export default useScrollAware;
