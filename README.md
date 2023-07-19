# Sysco Foodie Data Extraction

This repository contains a script to read the Sysco Foodie recipe data Excel file and to produce a JSON file which 
contains all information in a structured form.

## How to run locally?

* Ensure you have NodeJS installed, preferably `v14.20.0` or higher.
* Install dependencies by running `yarn install`.
* Construct `.env` file resembling to `.env.example` file.
* Execute the extraction script by running `yarn run start`.

You can specify a data directory in the `.env` file. All the input files should be available within this data 
directory and the extracted data will be saved into a JSON file inside the same data directory. Only file names 
along with the extension should be specified in the `.env` for input and output files and full path will be derived 
internally. For more information, see comments in `.env.example`. Please do not commit the data directory, if it is 
created within the repository. A directory name `data` in the repository root has already been git ignored for 
convenience.