## React Project Setup

Today I learnt the quickest way to get a new React project started.

Just install the [`create-react-app`](https://github.com/facebookincubator/create-react-app) module and then use it to create the app.

The entire flow goes like this:

```shell
npm install -g create-react-app

create-react-app my-app
cd my-app/
npm start
```

Additionally, the initial setup uses an npm module that hides all the underlying complexity i.e. webpack config and so on. In order to make all of that complexity transparent and include all the dependencies in the `project.json` file, run `npm run eject`.
