function devWarn(msg: string) {
  console.warn(`%c${msg}`, 'color: green; background-color: orange;');
}

export { devWarn };

export default devWarn;
