# ✨ GitHub Starz ✨ - An AngularJS ES6 Webpack Seed

This is an example AngularJS ES6 app that utilizes the components architecture
and built with Webpack.

The main purpose of that app is to demonstrate the approach that gives you the "escape hatch"
to migrate your existing AngularJS app to React, Vue or Angular(2+) or at least to make your dev experience more pleasant.

## Requirements

- [Node.js](https://nodejs.org/en/) `>=v8.x.x`
- [ESLint](http://eslint.org/) plugin for your favorite IDE/Code Editor
- [EditorConfig](http://editorconfig.org/) plugin for your favorite IDE/Code Editor

## Installation

Clone project repository.

```bash
git clone git@github.com:vitaliiburlaka/github-startz-angularjs-webpack.git
```

### Install dependencies

Run the following command from the project's directory.

```bash
npm install
```

### Development server

To start the dev server run following command from the project's directory.

It will start local http server at the `http://localhost:8080` by default.

```bash
npm start
```

### Production build

To build optimized bundle run following command.

It will emit optimized and minified bundle to the **_./dist_** directory

```bash
npm run build
```

### App Bundle Analyzing

```bash
npm run analyze
```

### Code linting

To check code for common errors or style problems run:

```bash
npm run lint
```

To check the code and fix the issues run:

```bash
npm run lint:fix
```

#### Thanks to

@toddmoto [toddmotto.com](https://toddmotto.com/) for great source of information about the AngularJS.

@webpack [webpack.js.org](https://webpack.js.org/) for the awesome tool.

@react [reactjs.org](https://reactjs.org/) that showed the better way to build UI.
