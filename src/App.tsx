import { useToggle } from '@c3/react';
import { noop } from '@c3/utils';
import { fixed } from '@unstyled-ui/css';
import {
  BaseSwitchItemType,
  MenuConfig,
  SideBar,
} from '@unstyled-ui/ct-switcher';
import { BaseListItemType, Box, Fixed, List } from '@unstyled-ui/layout';
import { useEffect, useMemo, useState } from 'react';

import { toggleDbg } from './hooks/useDbg';
import { useClick2Edit } from './hooks/useEdit';
import ViewPort from './ViewPort';

import Inspect from './Inspect';
import { getContainingBlock } from './common/getContainingBlock';
import { useElementFromPoint } from './hooks/useElementFromPoint';
import { colorscheme } from './common/css';
import { getElementInfo } from './common/getElementInfo';

export type Item = {
  name: string;
} & BaseListItemType;

const menuConfig: Item[] = [
  {
    id: '1',
    name: 'dbg',
    renderItem: (e: Item): JSX.Element => {
      const [active, toggle] = useToggle(false);
      useEffect(() => {
        toggleDbg(active);
      }, [active]);
      return (
        <label>
          <input type="checkbox" checked={active} onChange={toggle}></input>
          {e.name}
        </label>
      );
    },
  },
  {
    id: '2',
    name: 'viewport',
    active: true,
    renderItem: e => {
      const [active, toggle] = useToggle(false);
      return (
        <>
          <label>
            <input type="checkbox" checked={active} onChange={toggle}></input>
            {e.name}
          </label>

          {active && <ViewPort {...e} />}
        </>
      );
    },
  },
  {
    id: '3',
    name: 'edit',
    active: false,
    //@ts-ignore
    renderItem: (e: Item) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [active, toggle] = useToggle(false);
      useClick2Edit(active);
      return (
        <label>
          <input type="checkbox" checked={active} onChange={toggle}></input>
          {e.name}
        </label>
      );
    },
  },
  {
    id: '4',
    name: 'containing-block',
    active: false,
    renderItem(e) {
      const [active, toggle] = useToggle(false);
      const [curEle, lastEle] = useElementFromPoint();
      const { el, box } = useMemo(() => {
        if (!curEle) {
          return {
            box: { left: 0, top: 0, width: 0, height: 0 },
          };
        }
        return getContainingBlock(curEle);
      }, [curEle]);
      console.log('box', box);

      return (
        <>
          <label>
            <input type="checkbox" checked={active} onChange={toggle}></input>
            {e.name}
          </label>
          {active && (
            <>
              <Fixed>
                <Box
                  css={{
                    position: 'fixed',
                    left: box.left,
                    top: box.top,
                    width: box.width,
                    height: box.height,
                    PointerEvent: 'none',
                    border: '1px solid red',
                  }}
                ></Box>
              </Fixed>
              <Fixed css={{ ...colorscheme, ...fixed({ left: 0, top: 0 }) }}>
                containing block:{getElementInfo(el)}
              </Fixed>
            </>
          )}
        </>
      );
    },
  },
  {
    id: '5',
    name: 'inspect',
    active: false,
    renderItem: e => {
      const [active, toggle] = useToggle(false);
      return (
        <>
          <label>
            <input type="checkbox" checked={active} onChange={toggle}></input>
            {e.name}
          </label>
          {active && <Inspect {...e} />}
        </>
      );
    },
  },
];
const App = () => {
  const [cfg, setCfg] = useState(menuConfig);
  return (
    <List
      css={{
        border: '1px solid gray',
        ...fixed({ left: 10, bottom: 10 }),
      }}
      data={cfg}
      updateData={noop}
      direction="column"
    />
  );
};

export default App;
