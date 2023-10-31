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
<img width="1000" alt="gsmercordp2" src="https://github.com/matt7xu/gamerCord/assets/97821049/d7984577-432e-464c-9558-2fc7d0d3bc02">
<img width="1000" alt="gamercordp1" src="https://github.com/matt7xu/gamerCord/assets/97821049/4f090f7f-3881-4d32-87f6-5044c1493310">
<img width="1000" alt="gamercordp3" src="https://github.com/matt7xu/gamerCord/assets/97821049/178c7de8-8f91-4de4-be5c-a2bb062539a8">


