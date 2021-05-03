# Arrangere

#### Table of Contents

- [Description](#desc)
- [Installation and Setup Instructions](#instructions)
- [Emulators](#emulators)
- [Folder Structure](#folder)
- [Component Structure](#component)
- [Testing](#testing)
- [Firebase Deploy](#deploy)
- [Pages](#pages)

<a name="desc"/>


## Description

This application is an application portal for the Norwegian Student Sports Association (NST) where users can apply to arrange the events SNM, SC and SL.

![arrangere](https://user-images.githubusercontent.com/43408175/116851868-8c0d0c00-abf3-11eb-9c5a-86aa6be56245.PNG)


<a name="instructions"/>


## Installation and Setup Instructions

You will need `node` and `npm` installed globally on your machine.

Clone the repository by running `git clone [project-url]`

Navigate into the folder arrangere by typing `cd arrangere`

Run the command `npm install`

Run `npm start` to start the server.
This command runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000/) to view it in the browser.

<a name="emulators"/>

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

<a name="folder"/>

## Folder Structure

```
  |-- arrangere
    |-- .firebaserc
    |-- .gitignore
    |-- README.md
    |-- cypress.json
    |-- firebase.json
    |-- package-lock.json
    |-- package.json
    |-- tsconfig.json
    |-- yarn.lock
    |-- .github
        |-- workflows
	        |-- cypress.yml
	        |-- format.yml
    |-- vscode
            |-- settings.json
    |-- arrangereDefaultData
                |-- all_namespaces/all_kinds
			        |-- all_namespaces_all_kinds.export_metadata
			        |-- output-0
                |-- arrangereDefaultData.overall_export_metadata
    |-- cypress
                |-- fixtures
	                |-- sample.json
                |-- integration
                    |-- 1-a11y-login-signup.js
                    |-- 2-authentication.js
                    |-- a11y-cup.js
                    |-- a11y-nm.js
                    |-- a11y-studentleker.js
                    |-- a11y.js
                    |-- send-application.js
	            |-- plugins
		            |-- index.js
                |-- support
	                |-- commands.js
	                |-- index.js
                |-- videos
	                |-- authentication.js.mp4
	|-- public
            |-- 404.html
            |-- index.html
            |-- manifest.json
   |-- src
	   	|-- components
	   		|-- accordions
	   			|-- AccordionComponent.tsx
	   			|-- Accordions.tsx
	   			|-- copyAttribute.ts
	   		|-- admin
	   			|-- AdminOverview.tsx
	   		|-- application
	   			|-- Application.tsx
	   			|-- ApplicationCard.tsx
	   			|-- ApplicationType.tsx
	   			|-- ChapterWrapper.tsx
	   			|-- Dashboard.tsx
	   			|-- InputWrapper.tsx
	   			|-- ReviewApplication.tsx
	   			|-- Template.tsx
	   			|-- addDocumentToUser.ts
	   			|-- copyDocument.ts
	   			|-- deleteApplication.ts
	   			|-- retrieveTemplate.ts
	   			|-- saveInputFields.ts
	   			|-- setStatus.ts
	   		|-- auth
	   			|-- Login.tsx
	   			|-- SignUp.tsx
	   		|-- buttons
	   			|-- ChapterButton.tsx
	   			|-- SaveButton.tsx
	   			|-- SubmitButton.tsx
	   		|-- error
	   			|-- DisplayError.tsx
	   		|-- inputFields
	   			|-- Date.tsx
	   			|-- FileUpload.tsx
	   			|-- LongText.tsx
	   			|-- Number.tsx
	   			|-- RadioButton.tsx
	   			|-- ShortText.tsx
	   			|-- Time.tsx
	   			|-- getInputFieldComponent.tsx
	   			|-- getInputValue.ts
	   		|-- main
	   			|-- DrawerBar.tsx
	   			|-- Home.tsx
	   			|-- Routes.tsx
	   		|-- user
	   			|-- EditApplication.tsx
	   			|-- UserOverview.tsx
	   			|-- UserProfile.tsx
	   		|-- utils.ts
	   	|-- images
			|-- logo-sort.png
			|-- student_NM.png
			|-- studentcup-1.png
			|-- studentidrett-logo-sort.png
			|-- studentleker-1.png
	   	|-- stateManagement
	   		|-- applicationState.ts
	   		|-- attributeState.ts
	   		|-- errorHandling.ts
	   		|-- localstorageRecoil.ts
	   		|-- userAuth.ts
	   	|-- style
	   		|-- appTheme.ts
	   		|-- authentication.ts
	   		|-- cards.ts
	   		|-- chapters.ts
	   		|-- drawerBar.ts
	   		|-- inputStyles.ts
	   		|-- userProfile.ts
	    |-- test
	    	|-- addDocumentToUser.test.ts
	    	|-- package-lock.json
	    	|-- package.json
	    	|-- saveInput.test.ts
	    	|-- setStatusToSubmitted.test.ts
	    	|-- tsconfig.testing.json
	    |-- App.tsx
	    |-- firebase.js
	    |-- index.tsx
	    |-- react-app-env.d.ts
   
   
```

#### Detailed folder structure of the src folder

The figure below shows the folder structure of sub folders and files within the components folder. The group decided to divide the files into five main folders with a name based on the file types. The sub folders in the component folder is further divided into the different product parts. The corresponding logic to the components is in the same folder as the component.

![folderStructure](https://user-images.githubusercontent.com/43407205/116536892-d0439800-a8e5-11eb-9cad-aac9756074b7.jpg)

<a name="component"/>

## Component Structure

The figure below shows how components are related to each other, and how they are triggered. The stippled arrows represent redirects using react-router, while the solid lines shows the component hierarchy. 

![ComponentStructure](https://user-images.githubusercontent.com/43407205/116543913-c1151800-a8ee-11eb-8c02-e2f372db6c99.jpg)

<a name="testing"/>

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

<a name="deploy"/>

## Firebase Deploy

The project uses Firebase Hosting. Before deploying the project to Firebase Hosting it has to get build. 

Build the project with the command: `npm run build`

Deploy the project with the command: `firebase deploy`

<a name="pages"/>

## Pages

When running the application on localhost you can access different pages with the following URLS:

http://localhost:3000/login

http://localhost:4000/signup

http://localhost:4000/home

http://localhost:4000/applications

http://localhost:4000/userprofile
