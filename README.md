# GamerCord

Welcome to GamerCord! Check out our live version here:   https://gamercord.onrender.com


GamerCord is based off Discord, which allows users to chat inside the custom channels

The backend of GamerCord is built using Python and Flask with a PostgreSQL database. The frontend is handled with React and Redux.

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app as backend

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. Open a new terminal. cd into the `react-app` directory, and run your React app as frontend
   
   ```bash
   npm install
   ```

   ```bash
   npm start
   ```

## List of Technical Implementations
- Python
- CSS
- PostgreSQL
- React / Redux
- WebSockets
- Render.com  
- Visual Studio Code

## Screenshots of GamerCord
<img width="1273" alt="gamercord1" src="https://github.com/matt7xu/gamerCord/assets/97821049/8ba41992-fe24-4e02-be00-e5b0add0dc37">
<img width="1271" alt="gamercord2" src="https://github.com/matt7xu/gamerCord/assets/97821049/823c9bbf-0303-4201-96a0-5e149b191683">
<img width="1271" alt="gamercord3" src="https://github.com/matt7xu/gamerCord/assets/97821049/6a58e487-2fae-4abc-b236-a6f432b56ba1">




