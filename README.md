# Text to Speech using IBM Cloud NodeJs ReactJs

A simple NodeJS + ReactJS App using IBM Cloud Text to Speech Service

To run this application locally follow the steps below

### 1. Create the database

Using the mysql shell, create a database then create with a single table called **comentario** with the following columns **id** and **comentario**. Enter the name of the database and the user of your choice or if you prefer you can use the script below

```shell
CREATE DATABASE smarkio;
GRANT ALL PRIVILEGES ON smarkio.* TO 'daniel'@'localhost';
USE smarkio;
DROP TABLE IF EXISTS `comentario`;
CREATE TABLE `comentario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comentario` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
```

**Obs**. Replace 'daniel'@'localhost' by any user already created or create a new user using the script below

```shell
CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';
```

### 2. Install from dependencies

Inside the **SERVER** folder, run the commands

```shell
npm install
```

Inside the **CLIENT** folder, run the commands

```shell
npm install
```

### 3. Configure the application with your data

- Inside the **SERVER** folder, create a file **.env** with your IBM Cloud Text to Speech keys

```shell
IBM_API_KEY=<YOUR IBM API KEY HERE>
IBM_API_URL=<YOUR IBM API URL HERE>
```

- In the file **SERVER/app/config/MySQL.config.js** put the information to connect your database

```shell
const host = 'localhost'
const port = 3306
const user = 'daniel'
const password = 'daniel123'
const database = 'smarkio'
```

- In the file **SERVER/app/config/IBMvoice.config.js** enter the language and voice format information

```shell
const accept = 'audio/wav'
const voice = 'pt-BR_IsabelaV3Voice'
```

The list of available languages can be found [here](https://cloud.ibm.com/docs/text-to-speech?topic=text-to-speech-voices)

- In the file **CLIENT/src/servicesURLs.js** put the backend address

```shell
export const SERVER_URL = 'http://localhost:4000'
```

### 3. Run the application

- First run the back-end, in the **SERVER** folder run the following command

```shell
npm start
```

- Second run the front-end, in the **CLIENT** folder run the following command

```shell
npm start
```