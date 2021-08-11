import React, { useMemo, useRef } from "react";

import useScrollAware from "./use-scroll-aware";

interface Props {
  RowComponent: React.FunctionComponent<any>;
  height: number;
  itemHeight: number;
  itemCount: number;
  renderAhread?: number;
  data: Array<Record<string, unknown>>;
}

const VirtualScroll: React.FC<Props> = ({
  RowComponent,
  height,
  itemHeight,
  itemCount,
  renderAhread,
  data,
}: Props) => {
  const ref = useRef(null);
  const scrollTop = useScrollAware(ref);

  let startIndex = Math.floor(scrollTop / itemHeight) - renderAhread;
  startIndex = Math.max(startIndex, 0);

  const totalHeight = itemCount * itemHeight;
  const offsetY = startIndex * itemHeight;
  const visibleItemCount = Math.floor(height / itemHeight);
  const size = startIndex + visibleItemCount + 2 * renderAhread;

  const visibleChildren = useMemo(() => {
    const result = data
      .slice(startIndex, size)
      .map((item) => <RowComponent key={item.key} {...item} />);
    return result;
  }, [startIndex]);

  return (
    <div
      ref={ref}
      className="virtual-scroll"
      style={{
        height: `${height}px`,
        overflow: "auto",
      }}
    >
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
