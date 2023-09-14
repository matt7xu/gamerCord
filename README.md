# Flask React Project

This is the starter for the Flask React project.

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

## To Dos / Future Features
- AWS to uplord image
