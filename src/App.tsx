import { useToggle } from "@c3/react";
import {
  fixed
} from '@unstyled-ui/css'
import {
  BaseSwitchItemType,
  MenuConfig,
  SideBar
} from "@unstyled-ui/ct-switcher";
import { Box } from "@unstyled-ui/layout";
import { useState } from "react";

import { useDbg } from "./hooks/useDbg";
import { useClick2Edit } from "./hooks/useEdit";
import ViewPort from "./ViewPort";

import Inspect from "./Inspect";

export type Item = {
  name: string
  renderContent?: (e: Item) => JSX.Element
} & BaseSwitchItemType

const menuConfig: MenuConfig<Item> = [
  {
    id: "1",
    name: "dbg",
    active: false,
    //@ts-ignore
    renderItem: (e: Item): JSX.Element => {
      const showDbg = useDbg();
      return <button onClick={showDbg}>{e.name}</button>;
    }
  },
  {
    id: "2",
    name: "viewport",
    active: true,
    renderContent: (e) => <ViewPort {...e} />
  },
  {
    id: "3",
    name: "edit",
    active: false,
        //@ts-ignore
    renderItem: (e:Item) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [editable, toggle] = useToggle(true);
      useClick2Edit(editable);
      return <button onClick={toggle}>{e.name}</button>;
    },
  },
  {
    id: "4",
    name: "inspect",
    active: false,
    renderContent: (e) => <Inspect {...e} />
  }
];
const App = () => {
  const [cfg, setCfg] = useState(menuConfig);
  return (
      <SideBar css={{
        border:'1px solid gray',
        ...fixed({left:10,bottom:10})
    }}
        menuConfig={cfg}
        updateConfig={setCfg}
        renderItem={(item) => <button>{item.name}</button>}
        direction="row"
      />
  );
};

export default App;
