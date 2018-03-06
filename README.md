# AngularJS Webpack Seed

This is an example AngularJS app that utilizes the components architecture
and built with Webpack.

The main purpose of that app is to demonstrate the approach that gives you the "escape path"
to migrate your existing AngularJS app to React, Vue or Angular(2+) or at least to make your dev experience more pleasant. 

## Prerequisites

- [Node.js](https://nodejs.org/en/) `>=v6.x.x`
- [Yarn](https://yarnpkg.com) is recommended package manager
- [ESLint](http://eslint.org/) plugin for your favorite IDE/Code Editor
- [EditorConfig](http://editorconfig.org/) plugin for your favorite IDE/Code Editor

## Installation

Clone project repository to your machine.

```bash
git clone git@github.com:vitaliiburlaka/angularjs-webpack-seed.git
```

### Install dependencies

Run the following command from the project's directory.

```bash
npm install
```

or

```bash
yarn install
```

### Development server

To start the dev server run following command from the project's directory.

It will start local http server at the `http://localhost:8080` by default.

```bash
npm start
```

or

```bash
yarn start
```

### Development build

Run the following command from the project's directory.

It will emit bundled files with the soursemaps to the ***./dist*** directory

```bash
npm run build
```

or

```bash
yarn build
```

### Production build

To build optimized bundle run following command.

It will emit optimized and minified bundle to the ***./dist*** directory

```bash
npm run deploy
```

or

```bash
yarn deploy
```

### App Bundle Analyzing

```bash
npm run analyze
```

or

```bash
yarn analyze
```

### Code linting

To check code for common errors or style problems run:

```bash
npm run lint
```

or

```bash
yarn lint
```

#### Thanks to

@toddmoto [toddmotto.com](https://toddmotto.com/) for great source of information about the AngularJS.

@webpack [webpack.js.org](https://webpack.js.org/) for the awesome tool.

@react [reactjs.org](https://reactjs.org/) for the inspiration.
