import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import svgr from '@svgr/rollup'

import pkg from './package.json'

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true
    }
  ],
  external: ["classnames", "react-scrollbars-custom"],
  plugins: [
    external(),
    typescript({
      include: [ "*.ts+(|x)", "**/*.ts+(|x)" ],
      exclude: [ "*.d.ts", "**/*.d.ts" ],
      rollupCommonJSResolveHack: true,
      clean: true
    }),
    postcss({
      modules: true,
      extensions: ['.css', '.less']
    }),
    url(),
    svgr(),
    resolve(),
    commonjs(),
  ]
}
