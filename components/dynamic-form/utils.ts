// eslint-disable-next-line import/prefer-default-export
export function devWarn(msg: string) {
  console.warn(`%c${msg}`, 'color: green; background-color: orange;');
}
