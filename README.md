# DEMO CREDIT APP
This is the backend app for demo credit powered by Nodejs and TS

## Requirements
- NodeJS runtime
- NPM or Yarn package manager
- MySQL Database

## Features
- Completely written in [Typescript](https://typescriptlang.org/)
- [MySQL](https://dev.mysql.com/doc/) The world's most popular open source database
- [Objection.js](https://vincit.github.io/objection.js/) SQL ORM for Nodejs
- [Knexjs](https://knexjs.org/) SQL query builder

## How to install
- Clone the repository
- `git clone https://github.com/OjerIsaac/demo_credit.git`
- `cd demo_credit`
- Install dependencies
- `npm install`
- Setup environment variable
- `cp .env.sample .env`
- Fill in data for db (MySQL) in the env
- Run Migration
- `npm run migrate:latest`
- To seed db
- `npm run seed:run`
- Run the server in dev env
- `npm run dev`

## Endpoints.
### Register User

POST
```shell
http://localhost:3030/v1/auth/register
```
PAYLOAD DATA

```shell
{
    "full_name": "isaac",
    "username": "ojerumu",
    "email": "isaac_001@gmail.com",
    "password": "password"
}
```

### Login User

POST
```shell
http://localhost:3030/v1/auth/login
```
PAYLOAD DATA

```shell
{
    "username": "ojerumu",
    "password": "password"
}
```

### Fund Account

POST
```shell
http://localhost:3030/v1/fund-account/3
```
PAYLOAD DATA

```shell
{
    "amount": "500"
}
```

### Transfer to a user

POST
```shell
http://localhost:3030/v1/transfer-fund/3
```
PAYLOAD DATA

```shell
{
    "amount": "500",
    "username": "ojerumu"
}
```

### Withdraw funds

POST
```shell
http://localhost:3030/v1/withdraw-fund/3
```
PAYLOAD DATA

```shell
{
    "amount": "500"
}
```