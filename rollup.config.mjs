/* import merge from 'deepmerge';
import { createBasicConfig } from '@open-wc/building-rollup';
 */
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import bakedEnv from 'rollup-plugin-baked-env';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const devMode = process.env.NODE_ENV === 'dev';

const terserOptions = {
  format: {
    comments: false,
  },
  compress: {
    passes: 2,
    drop_console: !devMode,
    module: true,
    toplevel: true,
    // unsafe_arrows: true,
    // drop_debugger: !devMode,
    // unsafe_arrows: true,
    // drop_debugger: !devMode,
  },
};

const config = [
  {
    input: './build/compiled/index.js',
    output: [
      {
        file: 'ncg.js',
        format: 'esm',
        sourcemap: true,
      },
      /*  {
        file: 'dist/index.js',
        format: 'esm',
        sourcemap: true,
      }, */
    ],
    // external: ['axios', 'os', 'url'],
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
      terser(terserOptions),
      bakedEnv(
        {
          NODE_ENV: process.env.NODE_ENV,
        },
        {
          preferConst: true,
          // compact: true,
        }
      ),
    ],
  },
  {
    input: './build/compiled/index.d.ts',
    output: {
      file: 'ncg.d.ts',
      format: 'esm',
    },
    plugins: [dts()],
  },
];

export default config;

/* const baseConfig = createBasicConfig({ terser: terserOptions });

export default merge(baseConfig, {
  input: './out-tsc/src/main.js',
  output: {
    dir: 'dist',
    format: 'es',
    // format: 'umd',
    // format: 'iife',
    name: 'main',
    compact: true,
    sourcemap: true,
    entryFileNames: 'main.js',
  },
  plugins: [
    bakedEnv(
      {
        NODE_ENV: process.env.NODE_ENV,
      },
      {
        preferConst: true,
        // compact: true,
      }
    ),
  ],
}); */
