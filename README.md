## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Environment Variables
env variables are stored in .env file
you need to create .env file in root directory
you should have postgres installed on your machine
please add your database url and jwt secret in .env file
example:
```
PORT=3000
DATABASE_URL='postgresql://postgres:123456@localhost:5432/db_name?schema=public'
JWT_SECRET='secret'
```