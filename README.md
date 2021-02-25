#Emulators

When running the application at localhost it gets connected to firebase emulators.

1. Starting the emulators using command ´´´ firebase emulators:start ´´´ in a terminal.
2. Start the emulators with initial data using the flag --import=template
3. Open the UI following the link in terminal: http://localhost:4000
4. If you add more data to the emulators and want to save the data until next time use the command ´´´firebase emulators:export export_directory´´´(the export_directory is a file specified by you, the file will be overwritten if it exists already)
