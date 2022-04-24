# MortgageCalc

## How to start project

Before you can build this project, you must install and configure the following dependencies on your machine:

1. [Node.js][]: We use Node to run a development web server and build the project.
   Depending on your system, you can install Node either from source or as a pre-packaged bundle.

After installing Node, you should be able to run the following command to install development tools.
You will only need to run this command when dependencies change in [package.json](package.json).

```
npm install
```
2. When you have NPM on your computer, you can proceed to install Angular CLI by typing the following into the terminal

```
npm install -g @angular/cli
```
This will download and install the latest Angular CLI to your system. Once installed, you can check your version by typing:

```
ng version
```
This will confirm if it’s globally installed on your system and display the version installed (which should be the latest).


3. To run the server you should got to the folder `mortgage-calc` and use command:
```
npm start
```

By default project starts in http://localhost:8000

4. To run the project you should got to the  folder `mortgage-calc-server` and use command:
```
npm start
```

By default project starts in http://localhost:4200

While the application is running, CORS errors are possible, to solve this problem, install any CORS Unblock extension on your browser.


