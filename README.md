# Kitra Game Api

## Description
Kitra Game Api is a backend service for managing game-related data and interactions.

## Installation
To get started with Kitra Game Api, clone the repository and install the dependencies:
Make sure you have node installed
```bash
git clone https://your-repository-url.git
cd kitra_api
npm install express
npm install mysql2
npm install sequelize
npm install csv-parser
npm install nodemon
```

Make sure that you have mysql and create a database named kitra_game
Locate the config.json and insert your credentials
Locate the models/model.js and insert your credentials
```bash
npx sequelize db:migrate
npx sequelize db:seed:all
```
Check if all the table have been populated. 
If the data did not seed correctly you can seed each file individually with 
```bash 
npx sequelize-cli db:seed --seed 20240313125813-create-treasure
npx sequelize-cli db:seed --seed 20240313125826-create-user
npx sequelize-cli db:seed --seed 20240313125841-create-money-value
```

## Usage
To run the API input the command 
```bash 
nodemon app.js
```
Go to postman and paste the URL 
```http://localhost:3000/api/users/login```
Choose any user from the Users table to login
 To test the API paste this URL
 ```http://localhost:3000/api/find-treasures?latitude=14.552036595352455&longitude=121.01696118771324&distance=1```
 ```http://localhost:3000/api/find-treasures?latitude=14.552036595352455&longitude=121.01696118771324&distance=1&prizeValue=20```

## Dependencies
csv-parser: For parsing CSV files.
express: For handling API requests.
mysql2: For interacting with MySQL databases.
nodemon: For automatically restarting the server during development.
sequelize: For ORM functionalities.
sequelize-cli: For managing database migrations and seeders.

## Contact
For any queries or concerns, please contact Abbigaile Carino.
