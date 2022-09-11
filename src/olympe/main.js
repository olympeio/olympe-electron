// This file imports Olympe and project and dependencies bricks source code, so that Webpack can bundle everything together. 

// Import Olympe runtime or DRAW
import 'olympe';
import '@olympeio/core';
import '@olympeio-extensions/commons';

// Import project bricks. We use webpack-import-glob-loader to import all bricks.
import './bricks/**/*.js';