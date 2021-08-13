import { storiesOf } from "@storybook/react";
import React, { useEffect, useMemo, useState } from "react";

import VirtualScroll from "./virtual-scroll";

const VScroll = () => {
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

interface Item {
  item: { key: number; name: string };
}

const IScroll = () => {
  const [data, setData] = useState<Array<Item>>([]);
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
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = Array(100)
          .fill({})
          .map((_, index) => {
            return { key: index, name: (Math.random() + 1).toString(36).substring(7) };
          });
        resolve(result);
      }, 3000);
    });
  };

  const loadMore = () => {
    getData().then((res: Array<Item>) => {
      setData([...data, ...res]);
    });
  };

  useEffect(() => {
    getData().then((res: Array<Item>) => {
      setData(res);
    });
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
        itemCount={data.length}
        itemHeight={40}
        loadMore={loadMore}
        RowComponent={itemRow}
      />
    </div>
  );
};

storiesOf("VirutalScroll", module)
  .addParameters({ component: VirtualScroll })
  .add("Virtual Scroll", () => <VScroll />)
  .add("Infinite Scroll", () => <IScroll />);
