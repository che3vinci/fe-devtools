import { useToggle } from '@c3/react';
import { fixed } from '@unstyled-ui/css';
import { Box, Fixed } from '@unstyled-ui/layout';
import React, { useMemo } from 'react';
import { Item } from '../../App';
import { colorscheme } from '../../common/css';
import { getElementInfo } from '../../common/getElementInfo';
import { useElementFromPoint } from '../../hooks/useElementFromPoint';
import { getContainingBlock } from './getContainingBlock';

const ContainningBlock: React.FC<Item> = (e) => {
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

};

export default ContainningBlock;
