
export const getElementInfo = (el: HTMLElement | Window) => {
  if (el instanceof Window) {
    return 'window';
  }
  let str = el.tagName.toLowerCase();
  if (el.id) {
    str += `#${el.id}`;
  }
  if (el.className) {
    str += `.${el.className}`;
  }
  return str;
};
