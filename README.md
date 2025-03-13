# Task manager API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

This application is built with a popular typescript framework [NestJs](https://nestjs.com). It is organized around modules (e.g., auth, tasklists, tasks, users). We will use a design pattern inspire by clean architecture and focus on SOLID principles.

### Project Libraries

* **Devtool** @nestjs/devtools-integration
* **Environment** @nestjs/config env-var
* **Security** @nestjs/passport @nestjs/jwt passport passport-jwt passport-local bcrypt
* **Database** @nestjs/typeorm typeorm pg
* **Data transformation** class-transformer class-validator
* **Documentation** @nestjs/swagger

### Project structure (src)

* **common:**
  * `decorators`: Data Transfer Objects.
  * `pipes`: Data Transfer Objects.
  * `interceptors`: Data Transfer Objects.
  * `filters`: Data Transfer Objects.
  * `interfaces`: Services provider interfaces.

* **config:**
  * `app.config`: API server config.
  * `database.config`: Database config for (User, TaskList, Task) entities

* **modules:**
  * `auth`: Module for user authentication.
  * `user`: Module for user management.
  * `tasklist`: Module for task list management.
  * `task`: Module for task management.

* **services:**
  * `bcrypt`: Service for hashing user authentication password.
  * `jwt-signature`: Service for signing user and generate access token.
  * `loggin`: Service for wrapping logs logic.
  * `swagger`: Service for building module OpenAPI documentation.

* **server:** A class which will manage our application (modules, services, etc)

* **app.module:** A class which will load our application (modules, services, etc)

* **main:** The application entrypoint

## Project setup

1. **Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

2. **Configure environment:**

* Set up your api environment.
* Set up your database PostgreSQL.
* Configure your api and your database connection details in  `.env`.

```env
APP_VERSION=1.0
API_PORT=3001
API_DEVTOOL_PORT=3011

# Required env variables
JWT_SECRET=mySuperUserSecretKey
JWT_EXPIRE_IN=1h

DATABASE_NAME=task-manager
DATABASE_HOSTNAME=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=usergood
DATABASE_PASSWORD=passgood
DATABASE_USE_SSL=false
```

## Compile and run the project

```bash
# development
npm run start
# or
bun run start
# or
yarn run start
# or
pnpm run start

# watch mode
npm run start:dev
# or
bun run start:dev
# or
yarn run start:dev
# or
pnpm run start:dev

# production mode
npm run start:prod
# or
bun run start:prod
# or
yarn run start:prod
# or
pnpm run start:prod
```

## Run tests

```bash
# unit tests
npm run test
# or
bun run test
# or
yarn run test
# or
pnpm run test

# e2e tests
npm run test:e2e
# or
bun run test:e2e
# or
yarn run test:e2e
# or
pnpm run test:e2e

# test coverage
npm run test:cov
 # or
bun run test:cov
# or
yarn run test:cov
# or
pnpm run test:cov
```
