# MySQL-Node-Store (aka Bamazon)
	
MySQL-Node-Store is a mock store utilizing MySQL and Node.js to take in orders from customers, ....
MySQL-Node-Store contains three modules, bamazonCustomer.js, bamazonManager.js, and bamazonSupervisor.js that allows users to create ...  


 

	
## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org) 
* [MySQL](https://www.mysql.com/)


### Installing

1. Download and install Node.js (if not installed already). 
[Node.js Download Page](https://nodejs.org/en/download/)
2. Using MySQL Workbench/Community Server create 'Bamazon_db' database 
and 'products' and 'departments' tables. 
You can use the following schema/seeds files in this repository:
	*`bamazon-schema.sql`
	*`bamazon-departments-seeds.sql`
	*`bamazon-product-seeds`
3. Clone MySQL-Node-Store repository. 

```
$ git clone https://github.com/daquilino/MySQL-Node-Store
```

4. Within cloned repository run the following to install npm packages.

```
$ npm install
```


## Usage
#### bamazonCustomer.js

*  The 'BasicCard' constructor simply has two parameters, 'front' and 'back', which each get assigned to respective properties 'front' and 'back'.

`Creating a BasicCard object (flashcard)`
 
```javascript
const BASIC = require('./basic-flashcard.js')
	
***
	
let card1 = new BASIC.BasicCard("Who was the first president of the United States?", "George Washington");

console.log(card1);

// BasicCard {
//	front: 'Who was the first president of the United States?',
//	back: 'George Washington' }

```
 #### bamazonManager.js - each menu


*  The 'ClozeCard' constructor has two properties, 'fullText' and 'clozeDeletion'. The two get assigned from their respective parameters 'fullText' and 'clozeDeletion'. Both parameters are strings with 'clozeDeletion' accepting multiple terms in ONE string seperated by commas (example "red, blue").    

* each 

`Creating a ClozeCard object (flashcard)`
 
```javascript
const CLOZE  = require('./clozeCard.js');
	
***

commands here

```
     
## Built With

* [Sublime Text](https://www.sublimetext.com/) - Text Editor.

###### NPM Packages

* [mysql](https://www.npmjs.com/package/mysql)	- This is a node.js driver for mysql.
* [inquirer](https://www.npmjs.com/package/inquirer) - Library of common interactive command line user interfaces.
* [cli-table](https://www.npmjs.com/package/cli-table)	- Library to render tables on the command line.



## Author

* **Douglas Aquilino** - [https://github.com/daquilino](https://github.com/daquilino)