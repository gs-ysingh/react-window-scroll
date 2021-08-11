import React, { useEffect, useMemo, useRef, useState } from "react";

const useScrollAware = (ref) => {
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

interface Props {
  itemRow: React.Component;
  height: number;
  itemHeight: number;
  itemCount: number;
  renderAhread?: number;
  data: Array<Record<string, string>>;
}

const VirtualScroll = ({
  itemRow,
  height,
  itemHeight,
  itemCount,
  renderAhread = 20,
  data,
}: Props) => {
  const ref = useRef(null);
  const scrollTop = useScrollAware(ref);

  let startIndex = Math.floor(scrollTop / itemHeight) - renderAhread;
  startIndex = Math.max(startIndex, 0);

  const totalHeight = itemCount * itemHeight;
  const offsetY = startIndex * itemHeight;
  const visibleItemCount = Math.floor(height / itemHeight);

  const visibleChildren = useMemo(() => {
    const size = startIndex + visibleItemCount + 2 * renderAhread;
    const result = data.slice(startIndex, size).map((item) => {
      return itemRow(item);
    });
    return result;
  }, [startIndex, visibleItemCount, renderAhread]);

  return (
    <div ref={ref} className="virtual-scroll" style={{ height: `${height}px`, overflow: "auto" }}>
      <div
        style={{
          willChange: "transform",
          height: `${totalHeight}px`,
        }}
      >
        <div
          style={{
            willChange: "transform",
            transform: `translateY(${offsetY}px)`,
          }}
        >
          {visibleChildren}
        </div>
      </div>
    </div>
  );
};

VirtualScroll.defaultProps = {
  renderAhread: 20,
};

export default VirtualScroll;
