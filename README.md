# Overview

This project shows a minimal boilerplate project structure to use Olympe built into an Electron project.

## Quick start

1. Update the `res/oConfig.json` file to set the parameters of your environment and application to start.
2. Develop your bricks in the folder `src/bricks`.
3. Run the following command to run your application in development mode:
```
npm run start
```
4. Run the following command to test your final build:
```
npm run serve:dist
```
5. Build the binary file:
```
npm run dist
```

## Sign your code
Have a look at the `config` section of the `package.json` file and update it according to the instructions in the [following page](https://www.electronjs.org/fr/docs/latest/tutorial/code-signing).

## Credits
Code inspired by the repository [electron-webpack-boilerplate](https://github.com/DevUnltd/electron-webpack-boilerplate) available on Github.