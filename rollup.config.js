import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import dts from 'rollup-plugin-dts';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

const pkg = require('./package.json');

const extensions = ['.ts', '.tsx'];
const resolve = (...args) => path.resolve(...args);

function genSubLibConfig(srcDir, targetDir, name) {
  return [
    {
      input: resolve(`${srcDir}/index.ts`),
      output: [
        {
          file: resolve(`${targetDir}/index.js`),
          format: 'esm',
          sourcemap: true
        }
      ],
      plugins: [
        nodeResolve({
          customResolveOptions: {
            moduleDirectories: ['node_modules']
          }
        }),
        commonjs(),
        typescript(),
        babel({
          exclude: 'node_modules/**',
          extensions
        })
      ],
      external: ['ant-design-vue', 'vue']
    },
    {
      // 生成 .d.ts 类型声明文件
      // './src/components/drag-drop/index.ts'
      input: resolve(`${srcDir}/index.ts`),
      output: {
        file: resolve(`${targetDir}/index.d.ts`),
        format: 'es'
      },
      plugins: [dts({
        exclude: ['node_modules/**']
      })]
    }
  ];
}

const config = [
  ...genSubLibConfig('./src/components/drag-drop', './package/drag-drop', 'drag-drop'),
  ...genSubLibConfig('./src/components/dynamic-form', './package/dynamic-form', 'dynamic-form')
];

export default config;
