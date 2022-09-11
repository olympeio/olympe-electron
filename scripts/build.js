const webpack = require('webpack');
const configMain = require('../webpack.config.main');
const configOlympe = require('../webpack.config.olympe');
const path = require('path');
const fs = require('fs');

const compilerMain = webpack(configMain);
const compilerOlympe = webpack(configOlympe);

/**
 * Delete build and dist dirs
 */
fs.rmdirSync(path.join(__dirname, '../build'), { recursive: true, force: true });
fs.rmdirSync(path.join(__dirname, '../dist'), { recursive: true, force: true });

/**
 * Build main
 */
compilerMain.run((err, stats) => {
  console.log('> Building main');
});

/**
 * Build olympe when main is done
 */
compilerMain.hooks.afterDone.tap('on-main-built', (stats) => {
  console.log('> Building olympe');
  compilerOlympe.run((err, stats) => {});
});
