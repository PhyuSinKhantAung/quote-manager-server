## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
# install dependencies
$ npm install

# run databse migration files
$ npx prisma migrate deploy
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
env variables are stored in .env file.
You need to create .env file in root directory.
You should have postgres installed on your machine.
Please add your database url and jwt secret in .env file
example:
```
PORT=3000
DATABASE_URL='postgresql://postgres:123456@localhost:5432/db_name?schema=public'
JWT_SECRET='secret'
```
