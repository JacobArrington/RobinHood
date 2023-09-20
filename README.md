# App-Exchange
App Exchange is our take on the popular application Robinhood. Developed by Jacob Arrington, Marlon Santos, And Kelly Kong
---
# Live Link
https://app-exchange.onrender.com/
---
# ScreenShots
---

HomePage
![](https://res.cloudinary.com/dip4w3xmy/image/upload/v1694647298/Screen_Shot_2023-09-13_at_7.21.22_PM_vf24lj.png)

---
Login Page
![](https://res.cloudinary.com/dip4w3xmy/image/upload/v1694647364/Screen_Shot_2023-09-13_at_7.22.24_PM_yuihar.png)

---
Sign up Page
![](https://res.cloudinary.com/dip4w3xmy/image/upload/v1694647441/Screen_Shot_2023-09-13_at_7.23.51_PM_ewqxcq.png)

---
Landing Page
![](https://res.cloudinary.com/dip4w3xmy/image/upload/v1694647692/Screen_Shot_2023-09-13_at_7.27.47_PM_qojuu7.png)

---
Wallet Page
![](https://res.cloudinary.com/dip4w3xmy/image/upload/v1694647771/Screen_Shot_2023-09-13_at_7.29.20_PM_nsbflm.png)
![](https://res.cloudinary.com/dip4w3xmy/image/upload/v1694647833/Screen_Shot_2023-09-13_at_7.30.20_PM_uvtdb8.png)

---
WatchList
![](https://res.cloudinary.com/dip4w3xmy/image/upload/v1694647913/Screen_Shot_2023-09-13_at_7.31.39_PM_bhv5vh.png)
![](https://res.cloudinary.com/dip4w3xmy/image/upload/v1694647913/Screen_Shot_2023-09-13_at_7.31.39_PM_bhv5vh.png)

---
Transaction
![](https://res.cloudinary.com/dip4w3xmy/image/upload/v1694648067/Screen_Shot_2023-09-13_at_7.34.16_PM_wkhby1.png)
![](https://res.cloudinary.com/dip4w3xmy/image/upload/v1694648119/Screen_Shot_2023-09-13_at_7.35.05_PM_oojfwn.png)


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

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

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

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


## Deployment through Render.com

First, refer to your Render.com deployment articles for more detailed
instructions about getting started with [Render.com], creating a production
database, and deployment debugging tips.

From the [Dashboard], click on the "New +" button in the navigation bar, and
click on "Web Service" to create the application that will be deployed.

Look for the name of the application you want to deploy, and click the "Connect"
button to the right of the name.

Now, fill out the form to configure the build and start commands, as well as add
the environment variables to properly deploy the application.

### Part A: Configure the Start and Build Commands

Start by giving your application a name.

Leave the root directory field blank. By default, Render will run commands from
the root directory.

Make sure the Environment field is set set to "Python 3", the Region is set to
the location closest to you, and the Branch is set to "main".

Next, add your Build command. This is a script that should include everything
that needs to happen _before_ starting the server.

For your Flask project, enter the following command into the Build field, all in
one line:

```shell
# build command - enter all in one line
npm install --prefix react-app &&
npm run build --prefix react-app &&
pip install -r requirements.txt &&
pip install psycopg2 &&
flask db upgrade &&
flask seed all
```

This script will install dependencies for the frontend, and run the build
command in the __package.json__ file for the frontend, which builds the React
application. Then, it will install the dependencies needed for the Python
backend, and run the migration and seed files.

Now, add your start command in the Start field:

```shell
# start script
gunicorn app:app
```

_If you are using websockets, use the following start command instead for increased performance:_

`gunicorn --worker-class eventlet -w 1 app:app`

### Part B: Add the Environment Variables

Click on the "Advanced" button at the bottom of the form to configure the
environment variables your application needs to access to run properly. In the
development environment, you have been securing these variables in the __.env__
file, which has been removed from source control. In this step, you will need to
input the keys and values for the environment variables you need for production
into the Render GUI.

Click on "Add Environment Variable" to start adding all of the variables you
need for the production environment.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)
- REACT_APP_BASE_URL (use render.com url, located at top of page, similar to
  https://this-application-name.onrender.com)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from Internal Database URL field)

_Note: Add any other keys and values that may be present in your local __.env__
file. As you work to further develop your project, you may need to add more
environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment._

Next, choose "Yes" for the Auto-Deploy field. This will re-deploy your
application every time you push to main.

Now, you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your build and
start commands being executed, and see any errors in the build process.

When deployment is complete, open your deployed site and check to see if you
successfully deployed your Flask application to Render! You can find the URL for
your site just below the name of the Web Service at the top of the page.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/# RobinHood
# RobinHood
