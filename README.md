#Emulators

When running the application at localhost it gets connected to firebase emulators.

1. Starting the emulators using command ´´´ firebase emulators:start ´´´ in a terminal.
2. Start the emulators with initial data using the flag --import=export_directory(/ex. template)
3. Open the UI following the link in terminal: http://localhost:4000
4. If you add more data to the emulators and want to save the data until next time use the command ´´´firebase emulators:export export_directory´´´(the export_directory is a file specified by you, the file will be overwritten if it exists already)

# Pages

When running the application on localhost you can access diffrent pages with the following URLS:
http://localhost:3000/login

http://localhost:4000/signup

http://localhost:4000/home

http://localhost:4000/applications

http://localhost:4000/userprofile
