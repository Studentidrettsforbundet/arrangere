# Arrangere

## Description

This application is an application portal for the Norwegian Student Sports Association (NST) where users can apply to arrange the events SNM, SC and SL.

## Installation and Setup Instructions

You will need `node` and `npm` installed globally on your machine.

Clone the repository by running `git clone [project-url]`

Navigate into the folder arrangere by typing `cd arrangere`

Run the command `npm install`

Run `npm start` to start the server.
This command runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000/) to view it in the browser.

## Emulators

When running the application at localhost it gets connected to firebase emulators. An emulator is used to build and test apps locally. The app is connected to the Cloud Firestore emulator to safely read and write documents in testing.

Make sure you have a Java SDK downloaded and also the firebase tool package. Download this using the command:
`npm install -g firebase-tools`

1. Start the emulators by running the command `npm run emulator` in your terminal
2. Open the UI by clicking the link in your terminal ( http://localhost:4000)

## Folder Structure

```
arrangere/
  .firebaserc
  .gitignore
  firebase.json
  package-lock.json
  package.json
  README.md
  tsconfig.json
  yarn.lock
  node_modules/
  public/
    index.html
  src/
    assets/
    components/
	    inputfields/
		    Date.tsx
		    FileUpload.tsx
		    InputWrapper.tsx
		    LongText.tsx
		    Number.tsx
		    RadioButton.tsx
		    ShortText.tsx
		    Time.tsx
		ApplicationCard.tsx
		ChooseApplication.tsx
		Dashboard.tsx
		DrawerBar.tsx
		Home.tsx
		Login.tsx
		SignUp.tsx
		StudentCupForm.tsx
		StudentlekerForm.tsx
		StudentNMForm.tsx
		UserProfile.tsx
    stateManagement/
	    errorHandling.ts
	    userAuth.ts
	images/
    style/
    test/
    App.tsx
    firebase.js
    index.tsx
    react-app-env.d.ts
```

## Testing

#### Cypress

It is important that you are running the emulator before running the test. If you are not running the emulator, a new user will be created in the production environment.
If you want to run the tests again, remember to delete the user created by the test from the emulator first.

For running the test, use the command:
`npx cypress run`

- Running this command will overwrite the screenshots and videoes in the cypress-folder. Just add and commit them when you do changes.

To open Cypress in test browser, use the command:
`npx cypress open`

## Pages

When running the application on localhost you can access different pages with the following URLS:

http://localhost:3000/login

http://localhost:4000/signup

http://localhost:4000/home

http://localhost:4000/applications

http://localhost:4000/userprofile
