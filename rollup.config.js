import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import npm from 'rollup-plugin-npm';
import replace from 'rollup-plugin-replace';

export default {
    entry: 'main.js',
    sourceMap: true,
    plugins: [
        commonjs({
            include: 'node_modules/**'
        }),
        npm(),
        babel({
            exclude: 'node_modules/**'
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
    ]
};
