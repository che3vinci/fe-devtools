const viewport = {
  left: 0,
  top: 0,
  width: window.innerWidth,
  height: window.innerHeight,
};


export const getContainingBlock = (
  el: HTMLElement
): {
  el: HTMLElement | Window;
  tip: 'viewport' | 'padding-box' | 'content-box';
  box: { left: number; top: number; width: number; height: number };
} => {
  const style = window.getComputedStyle(el);
  const position = style.position;
  switch (position) {
    case 'static':
    case 'relative':
    case 'sticky': {
      for (
        let parent = el.parentElement;
        parent;
        parent = parent.parentElement
      ) {
        const parentStyle = window.getComputedStyle(parent);
        const display = parentStyle.display;

        //block container or element which create a format context
        // eslint-disable-next-line max-len
        if (
          [
            'block',
            'inline-block',
            'flex',
            'grid',
            'table',
            'liest-item',
            'inline-flex',
          ].includes(display)
        ) {
          return {
            el: parent,
            tip: 'content-box',
            box: parent.getBoundingClientRect(),//FIXME: use getBoundingClientRect
          };
        }
        continue;
      }
      return {
        el: window,
        tip: 'viewport',
        box: viewport,
      };
    }
    case 'absolute': {
      for (
        let parent = el.parentElement;
        parent;
        parent = parent.parentElement
      ) {
        if (is3DElement(parent)) {
          return {
            el: parent,
            tip: 'padding-box',
            box: parent.getBoundingClientRect(),
          };
        }
        const parentStyle = window.getComputedStyle(parent);

        const parentPosition = parentStyle.position;
        if (parentPosition === 'static') {
          continue;
        }
        return {
          el: parent,
          tip: 'padding-box',
          box: parent.getBoundingClientRect(),
        };
      }
      return {
        el: window,
        tip: 'viewport',
        box: viewport,
      };
    }
    case 'fixed':
      for (
        let parent = el.parentElement;
        parent;
        parent = parent.parentElement
      ) {
        if (is3DElement(parent)) {
          return {
            el: parent,
            tip: 'padding-box',
            box: parent.getBoundingClientRect(),
          };
        }
      }
      return {
        el: window,
        tip: 'viewport',
        box: viewport,
      };
    default:
      throw new Error('Unexpected position');
  }
};

export const is3DElement = (el: HTMLElement): boolean => {
  const style = window.getComputedStyle(el);
  return (
    style.transform !== 'none' ||
    style.perspective !== 'none' ||
    style.willChange === 'transform' ||
    style.willChange === 'perspective' ||
    style.filter !== 'none' ||
    style.contain === 'paint' ||
    style.backDropFilter !== 'none'
  );
};
