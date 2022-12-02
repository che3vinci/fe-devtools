import { useEventListener, useMount } from "@c3/react";
import { Box } from "@unstyled-ui/layout";
import React, { useState } from "react";
import { Item } from "./App";
import {fixed} from '@unstyled-ui/css'
import { colorscheme } from "./common/css";

export type Info = {
  innerWidth: number | string
  innerHeight: number | string
}
const defaultInfo: Info = {
  innerWidth: 0,
  innerHeight: 0
};

const ViewPort: React.FC<Item> = (props) => {
  const { active, ...restProps } = props;
  const [info, setInfo] = useState<Info>(defaultInfo);
  useEventListener(window, "resize", () => {
    setInfo({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight
    });
  });
  useMount(() => {
    setInfo({ innerWidth: window.innerWidth, innerHeight: window.innerHeight });
  });

  return (
    <Box
      css={{
        ...fixed({top:0,left:0}),
        ...colorscheme,
        '&&':{w:'max-content'}
      }}
      {...restProps}>
      innerWidth:{info.innerWidth}
      <br />
      innerHeight:{info.innerHeight}
    </Box>
  );
};

export default ViewPort;
