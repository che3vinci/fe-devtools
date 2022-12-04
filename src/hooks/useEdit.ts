import { useEventListener } from '@c3/react';
import { useCallback, useEffect } from 'react';
import { useElementFromPoint } from './useElementFromPoint';

export const useClick2Edit = (enableEdit: boolean) => {
  const [curEle, lastEle] = useElementFromPoint();
  // console.log('curEle', curEle);
  // console.log('lastEle', lastEle);

  const onDblclick = useCallback(
    (e: React.MouseEvent) => {
      if (!enableEdit) {
        return;
      }
      curEle && (curEle.contentEditable = 'true');
    },
    [curEle, enableEdit, lastEle]
  );

  useEffect(() => {
    lastEle?.removeAttribute('contenteditable');
  }, [lastEle]);

  useEventListener(document, 'dblclick', onDblclick);
};
