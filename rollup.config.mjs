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
    drop_console: !devMode, // drop console.log when its not in dev mode
    module: true,
    toplevel: true,
    drop_debugger: !devMode, // drop console.log when its not in dev mode
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
    external: ['axios', 'url'],
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
      terser(terserOptions),
      bakedEnv(
        {
          NODE_ENV: process.env.NODE_ENV,
          NCG_BASE_URL: process.env.NCG_BASE_URL,
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
