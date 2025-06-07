// import pkg from './package.json'
import pkg from './package.json' assert { type: 'json' }
import typescript from '@rollup/plugin-typescript';
export default {
  input: "./index.ts",
  output: [
    {
      format: "es",
      file: pkg.module
    },
    {
      format: "cjs",
      file: pkg.main
    },
  ],
  plugins: [
    typescript()
  ]
}
