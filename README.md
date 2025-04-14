# Grocery Management System

This is a grocery management system built with NestJS and TypeORM, with test cases using Jest.

## Description

The Grocery Management System is a web application designed to manage the operations and functionalities of a grocery. It provides CRUD operation for Grocery item for Admin, User Role can view list of Grocceries and book an item.

## Features
- List Grocery items: Users can fetch all available items in the grocery.
- Book Item: Users can book item from the grocery.

## Technologies Used

- [NestJS](https://nestjs.com/): A progressive Node.js framework for building efficient and scalable server-side applications.
- [TypeORM](https://typeorm.io/): An ORM (Object-Relational Mapping) grocery for TypeScript and JavaScript.
- [Jest](https://jestjs.io/): A JavaScript testing framework for writing unit tests.
- [MySQL](https://www.mysql.com/): A popular open-source relational database management system.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>

2. Install the packages
    yarn

3. Make sure add the required config for connecting with DB by creating .env file
   You can find the example of env in env.test file along with the keys.

4. To start application user
    nest start

5. To run the test cases use
    npm test

## Tips
You may find the postman collection in this repo to executing the APIs.
