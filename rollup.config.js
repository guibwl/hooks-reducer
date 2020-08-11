const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const { terser } = require("rollup-plugin-terser");
const json = require('rollup-plugin-json');
const babel = require('rollup-plugin-babel');


export default {
    input: 'src/index.js',
    output: {
        format: 'umd',
        name: 'HooksReducer'
    },
    plugins: [
        process.env.NODE_ENV === 'production' && terser(),
        json(),
        resolve(),
        commonjs(),
        babel({
            runtimeHelpers: true,
            exclude: 'node_modules/**' // 只编译我们的源代码
        })
    ].filter(Boolean)
};
