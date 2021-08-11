import { storiesOf } from "@storybook/react";
import React, { useMemo } from "react";

import VirtualScroll from "./virtual-scroll";

const App = () => {
  const itemRow = ({ name, key }) => {
    return (
      <div
        key={key}
        className="item-row"
        style={{
          height: "40px",
          border: "1px solid blue",
          lineHeight: "40px",
          boxSizing: "border-box",
        }}
      >
        {name}
      </div>
    );
  };

  const getData = () => {
    return Array(10000)
      .fill({})
      .map((_, index) => {
        return { key: index, name: (Math.random() + 1).toString(36).substring(7) };
      });
  };

  const data = useMemo(() => {
    return getData();
  }, []);

  return (
    <div
      style={{
        border: "1px solid blue",
      }}
    >
      <VirtualScroll
        data={data}
        height={400}
        itemCount={10000}
        itemHeight={40}
        RowComponent={itemRow}
      />
    </div>
  );
};

storiesOf("VirutalScroll", module)
  .addParameters({ component: VirtualScroll })
  .add("Basic", () => <App />);
