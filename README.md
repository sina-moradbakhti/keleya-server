# Keleya Server

coding by **Sina Moradbakhti**

#### Keleya Server introduce some RESTful APIs which secured by JWT used as a back-end side of the Keleya app.

<br/>

## Languages

- [NodeJs](#)
- [Typescript](#)

## ORM & Database

- [Sequalize](#)
- [MySQL](#)

## All Uses dependencies

- [Express](#)
- [jsonwebtoken](#)
- [Sequalize](#)
- [mysql2](#)
- [typescript](#)
- [uuid](#)
- [tslint](#)
- [dotenv](#)
- [body-parser](#)
  <br/><br/>

# Getting Start

before starting the server please ensure your `Node version` and also your `npm version`.

- node version : `v14.16.1`
- npm version : `v6.14.12`

<br/>

after you checked your versions you can install all needed packages by following command in the `root` folder.

```
npm install
```

<br/>

After installing the packages you've to run the server.

```
npm start
```

<br/>

you probably see following result so it means the server is running successfully.

```
> keleya-server@1.0.0 start /Users/apple/Desktop/keleya-server
> tsc && node dist/app.js

Keleya server is listening on 3000

Executing (default): CREATE TABLE IF NOT EXISTS `Users` (`id` CHAR(36) BINARY NOT NULL , `name` VARCHAR(255), `email` VARCHAR(255), `password` VARCHAR(255), `baby_birth_date` DATETIME, `onboarding_done` TINYINT(1), `accepted_privacy_policy` TINYINT(1), `accepted_terms_and_conditions` TINYINT(1), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `Users`
```

<br/>

## Ready to use

Now everythings are ready to use.

<br/>

## Configurations

You can change the database configuration such as `HOST`, `USER`, `PASS`, `DB Name` and even `JWT secret key` from the following file.

```
$ root/.env
```

<br/>

## Summary

About this project I mean back-end of the keleya app, there was some new experience for me by Sequalize library.
Since I had never worked with Sequalize before it was a bit challengy but after a couple of hours working on that and readign some articles I got what it is and how it works. But for the making restful apis using nodejs and typescript surly it was so clear and of course I have worked with them currently and kinda expert on them.

Only thing that I unfortunately have never worked on is AWS although I'm familiar with but I'm expert in other alternatives such as Google Cloud.
So I decided to deploy the project on Google Cloud instead.

<br/>
Sincerely Yours,
<br/>
Sina
