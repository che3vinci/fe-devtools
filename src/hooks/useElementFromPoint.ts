import { useMouseMove } from '@c3/react';
import { useMemo, useRef, useState } from 'react';
import _ from 'lodash';

export const useElementFromPoint = () => {
  const [curEle, setCurEle] = useState<HTMLElement>();
  const [lastEle, setLastEle] = useState<HTMLElement>();

  const onMove = useMemo(() => {
    return _.throttle(e => {
      const element = document.elementFromPoint(
        e.clientX,
        e.clientY
      ) as HTMLElement;
      if (curEle !== element) {
        setLastEle(curEle);
        setCurEle(element);
      }
    }, 500);
  }, [curEle]);
  useMouseMove(onMove);

  return [curEle, lastEle];
};
