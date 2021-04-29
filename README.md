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

When running the application at localhost it uses the firebase emulators suite. The emulator suite is used to build and test apps locally. The app is connected to the Cloud Firestore emulator to safely read and write documents in testing. The Firestore emulator uses a copy of the production data to mimic the behaviour of  the production Firestore.

Make sure you have a Java SDK downloaded and also the firebase tool package. Download this using the command:
`npm install -g firebase-tools`

1. Start the emulators by running the command `npm run emulator` in your terminal
2. Open the UI by clicking the link in your terminal ( http://localhost:4000)

To run the project without the emulator, with production firestore and auth, you need to comment out this section from the firebase.js file.

<img width="541" alt="emulator" src="https://user-images.githubusercontent.com/43407205/116536366-19dfb300-a8e5-11eb-8179-c2f93b851d6e.png">


Update the emulator data:

1. Copy data from firestore (the production data) with the command: `gcloud firestore export gs://arrangere-a8fca.appspot.com/your-chosen-name`
2. Download the data with the command: `gsutil -m cp -r gs://arrangere-a8fca.appspot.com/your-chosen-name . `
3. Update the path "emulator": "firebase emulators:start --import arrangereDefaultData" in package.json 
   to use your new folder, i.e "--import your-chosen-name"

N.B: The unit tests uses arrangereDefaultDate, replacing this will lead to failing tests without updating the collections ands doc Ids in the tests.


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

It is important that you are running the emulator and the application before running the test. If you are not running the emulator, a new user will be created in the production environment.
If you want to run the tests again, remember to delete the user created by the test from the emulator first.

Run the cypress tests with the command:
`npx cypress run`

- Running this command will overwrite the screenshots and videoes in the cypress-folder. Just add and commit them when you do changes.

Open Cypress in test browser with the command:
`npx cypress open`

Run the unit tests with the command: 
`npm run test`

## Firebase Deploy

The project uses Firebase Hosting. Before deploying the project to Firebase Hosting it has to get build. 

Build the project with the command: `npm run build`

Deploy the project with the command: `firebase deploy`


## Pages

When running the application on localhost you can access different pages with the following URLS:

http://localhost:3000/login

http://localhost:4000/signup

http://localhost:4000/home

http://localhost:4000/applications

http://localhost:4000/userprofile
