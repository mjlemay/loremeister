
Loremeister
======================
*An API to access Wasterlander Lore*

This is an API app that allows users to signup, login, and create characters, tribes, and share their stories via an JSON object interface.


How to Run and Install
----------------------
To run locally, please install node.js and **npm install** in the app directory. Adjust **/config/db.js** to point to your mongoDB.

To run in an Hereoku container, set the heroku environment of **DB_CONF** to point to your mongoDB.


List of API Endpoints
----------------------

| URI | METHOD | DESCRIPTION |
| --- | --- | --- |
| **/api ** | GET | Lists all existing API endpoints. |
| **/api/stories** | GET | Returns an array of story objects |
|   | POST | Creates a story |
| **/api/story/[story_slug]** | GET | Returns an single story |
|   | PUT | Updates an existing story |
|   | DELETE | Removes an existing story |
