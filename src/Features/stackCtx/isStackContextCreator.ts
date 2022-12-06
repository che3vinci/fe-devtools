export const isStackContextCreator = (node: HTMLElement): boolean => {
  if (node.tagName === 'HTML') {
    return true;
  }
  const computedStyle = window.getComputedStyle(node);
  const position = computedStyle.position;
  const zIndex = computedStyle.zIndex;
  const parentComputedStyle = window.getComputedStyle(node.parentElement!);

  //TODO: 完善
  const isFlexItem = ['flex', 'inline-flex'].includes(
    parentComputedStyle.display
  );
  const isGridItem = ['grid', 'inline-grid'].includes(
    parentComputedStyle.display
  );

  if (['absolute', 'relative'].includes(position) && zIndex !== 'auto') {
    return true;
  }

  if (['sticky', 'fixed'].includes(position)) {
    return true;
  }

  if (isFlexItem && zIndex !== 'auto') {
    return true;
  }

  if (isGridItem && zIndex !== 'auto') {
    return true;
  }

  if (+computedStyle.opacity < 1) {
    return true;
  }

  if (computedStyle.mixBlendMode !== 'normal') {
    return true;
  }
  if (
    [
      'transform',
      'filter',
      'backdrop-filter',
      'perspective',
      'clip-path',
      'mask',
      'mask-image',
      'mask-border',
    ].some(key => computedStyle[key as keyof CSSStyleDeclaration] !== 'none')
  ) {
    return true;
  }

  if (computedStyle.isolation === 'isolate') {
    return true;
  }
  //TODO:will-change value
  //  Element with a will-change value specifying any property that would create a stacking context on non-initial value (see this post).

  //TODO:
  /**
   *Element with a contain value of layout, or paint, or a composite value that includes either of them (i.e. * contain: strict, contain: content).
   */
  if (['layout', 'paint'].includes(computedStyle.contain)) {
    return true;
  }

  return false;
};
