# React Virtual Scroll
Handle large list in react

## Installation
yarn add react-window-scroll

or 

npm i react-window-scroll

## Example
```
import React, { useMemo } from "react";

import VirtualScroll from "react-window-scroll";

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
```
