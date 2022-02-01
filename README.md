# Tech Connection

Tech Connection is an application that allows user to join a little community to share posts about tech.

Once the user signs up, they can create posts to share their ideas and discuss about it, as well as edit and delete them and check comments made by other users. Comments can be added on all posts by all users. User can also check when a post and comments have been posted.

## Built with

- HTML
- CSS / Bootstrap
- JavaScript
- Node.js, Express
- Express-Session
- MySQL, Sequelize ORM
- bcrypt
- Dotenv
- Insomnia
- Heroku
- Handlebars.js

## Table of contents

- [Description](#description)
- [Installation](#Installation)
- [Setting Up MySQL](#SettingUpMySQL)
- [Installing Packages](#Installing-Packages)
- [Contributing and Questions](#Contributing-and-Questions)
- [Deployed](#Deployed)

## Installation

You can clone this repository and run the command `npm i`. Create your .env file and configure your MySQL login information. You can check for exemples on this README file.

## Setting Up MySQL

To set up your MySQL credentials, use the following exemple on your .env file.

```
DB_NAME='recipes_db'
DB_USER='root'
DB_PW='your-password'
```

## Installing Packages

To install all the required packages, run the following command:

```
npm i express-handlebars mysql2 dotenv bcrypt express-session connect-session-sequelize bootstrap
```

## Contributing and Questions

To contibute with this project or for questions, please contact the author:

[Leticia Nardi](https://github.com/leticianardi) <br />

## Deployed

You can visit the deployed application [here](https://spicy-bites.herokuapp.com/).
