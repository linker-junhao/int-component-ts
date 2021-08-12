const parse = (code: string) => {
  // 修剪源码
  const trimedCode = code.replace(/\s\S\r\n/, '');
  // 循环吃豆，一个字符一个字符
  // push一个字符test一次语法，随着字符信息的增多，语法的可能性也在收敛，后续优化可做
  [...trimedCode].forEach((char: string) => {

  });
};

export default parse;
