# Skill Lab

Our project, Skill Lab, is an online learning and networking platform that aims to connect users over shared interests or skills. By providing a web application where users can ask and answer questions in interest-specific subspaces, and become mentors, Skill Lab offers necessary guidance and accountability for all. After successfully creating our vision for this project, we expect Skill Lab to bridge the gap between professionals, students, experts, and novices in an online community. 

## Code Structure

Under the `client/skill_lab/src folder`, the code structure is broken down as follows:

- `components`: This is where all the reusable components are stored 
- `domain`: This is where all routes for each components are stored 
- `store`: All the redux reducers are stored within this folder
- `firebase.js`: This is where firebase is instantiated retrieving the api key from .env.local file
- `index.css`: Application styling
- `index.js`: Root file that renders the entire app

## Setup and Build Instructions: 
1. Open up the temrinal
2. Change to a directory where you would like to place the project
3. Type in `git clone https://github.com/Skill-Lab/SkillLab.git` in the terminal. This would download the project in the specified directory
4. Change directories into `client/skill_lab`. Type in `npm install` in the terminal to download all of the project’s dependencies.
5. A local Firebase API key would be needed to run the application locally. Please follow the instruction [here](https://firebase.google.com/docs/web/setup) to learn more about creating your own API key
6. After retrieving the API key, create a `.env.local` file under the `client/skill_lab` directory. 
7. Add in the following text and fill in the information with your own API key.
  ```
  REACT_APP_FIREBASE_API_KEY=<<Enter your own API KEY>>
  REACT_APP_FIREBASE_AUTH_DOMAIN=<<Enter your own AUTH_DOMAIN>>
  REACT_APP_FIREBASE_DATABASE_URL=<<Enter your own DATABASE_UR>>
  REACT_APP_FIREBASE_PROJECT_ID=<<Enter your own PROJECT_ID>>
  REACT_APP_FIREBASE_STORAGE_BUCKET=<<Enter your own STORAGE_BUCKET>>
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<<Enter your own MESSAGING_SENDER_ID>>
  REACT_APP_FIREBASE_APP_ID=<<Enter your own APP_ID>>
  ```

On the terminal, type in `npm start` in the terminal to run the application. On a browser, go to http://localhost:3000 browser to view the application.

## Authors

- Nathan Abegaz
- Cindy Carrillo
- Alexis Huerta
- Brian Tao

5/10/2021
