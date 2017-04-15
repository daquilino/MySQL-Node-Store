# MySQL-Node-Store (a.k.a. Bamazon)
	
MySQL-Node-Store (a.k.a. Bamazon) is an Node.js based Amazon-like storefront utilizng MySQL. The app is broken down into three modes for customers, managers, and supervisors.  The modes are each conatained in their respective modules bamazonCustomer.js, bamazonManager.js, and bamazonSupervisor.js. See 'Usage' below for details of each. 

	
## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org) 
* [MySQL](https://www.mysql.com/)


### Installing

1. Download and install Node.js (if not installed already). 
[Node.js Download Page](https://nodejs.org/en/download/)

2. Using [MySQL](https://www.mysql.com/) Workbench/Community Server  create 'Bamazon_db' database 
and 'products' and 'departments' tables. 
You can use the following schema/seeds files in this repository:
	
	* `bamazon-schema.sql`
	* `bamazon-departments-seeds.sql`
	* `bamazon-product-seeds`

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

*  what it does/ menu options what eatch do/ link to video


<img src="/images/customer.png" alt="bamazonCustomer screenshot" width="640">

 
 [Click here See A Demo Of bamazonCustomer.js On Youtube](https://www.youtube.com/watch?v=aYcN7VBt1L0)



 #### bamazonManager.js

*  what it does/ menu options what eatch do/ link to video

<img src="/images/manager.png" alt="bamazonManager screenshot" width="640">

[Click here See A Demo Of bamazonManager.js On Youtube](https://www.youtube.com/watch?v=8DppxLZ7bqE)


#### bamazonSupervisor.js

*  what it does/ menu options what eatch do/ link to video


<img src="/images/supervisor.png" alt="bamazonSupervisor screenshot" width="640">

[Click here See A Demo Of bamazonSupervisor.js On Youtube](https://www.youtube.com/watch?v=UW71qn9o-Qo)


## Built With

* [Sublime Text](https://www.sublimetext.com/) - Text Editor.
* [Node.js](https://nodejs.org) - JavaScript runtime built on Chrome's V8 JavaScript engine.
* [MySQL](https://www.mysql.com/) - Open Source SQL Database.

###### NPM Packages

* [mysql](https://www.npmjs.com/package/mysql)	- This is a node.js driver for mysql.
* [inquirer](https://www.npmjs.com/package/inquirer) - Library of common interactive command line user interfaces.
* [cli-table](https://www.npmjs.com/package/cli-table)	- Library to render tables on the command line.



## Author

* **Douglas Aquilino** - [https://github.com/daquilino](https://github.com/daquilino)