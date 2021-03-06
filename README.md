
Loremeister
======================
*An API to access Festival Tribe Lore*

This is an API app that allows users to signup, login, and create characters, tribes, and share their stories via an JSON object interface.

Loremeister runs on mongoDB, which you will need to install and run seperately: [MongoDB](https://www.mongodb.org/)


How to Run and Install
----------------------
To run locally, please install node.js and **npm install** in the app directory. Adjust **/config/db.js** to point to your mongoDB.

To run in an Hereoku container, set the heroku environment of **DB_CONF** to point to your mongoDB.

To create an admin signup via email. The first created account is always set as admin by default.

For facebook and google OAUTH intergration, please update **/config/auth.js** 


List of API Endpoints
----------------------

| URI | METHOD | DESCRIPTION |
| --- | --- | --- |
| **/user/signup** | POST | Creates a user |
| **/user/login** | POST | Allows a user to login to create, edit, and delete thier own posts |
| **/user/profile** | GET | Returns a user object |
| **/api** | GET | Lists all existing API endpoints. |
| **/api/stories** | GET | Returns an array of story objects |
|   | POST | Creates a story |
| **/api/story/[story_slug]** | GET | Returns an single story by slug |
|   | PUT | Updates an existing story |
|   | DELETE | Removes an existing story |
| **/api/characters** | GET | Returns an array of character objects |
|   | POST | Creates a story |
| **/api/story/[character_slug]** | GET | Returns an single character by slug |
|   | PUT | Updates an existing character |
|   | DELETE | Removes an existing character |
| **/api/tribes** | GET | Returns an array of story objects |
|   | POST | Creates a tribe |
| **/api/tribe/[tribe_slug]** | GET | Returns an single tribe |
|   | PUT | Updates an existing tribe |
|   | DELETE | Removes an existing tribe |
