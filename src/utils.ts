export const getElement = <T extends Element>(selector: string): T => {
  const element = document.querySelector<T>(selector);
  if (!element) {
    throw new Error(`Cannot find element with selector: ${selector}`);
  }
  return element;
};
