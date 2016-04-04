import config from './rollup.config';

config.format = 'umd';
config.dest = 'dist/uno.umd.js';
config.moduleName = 'uno';

export default config;
