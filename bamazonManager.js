//Douglas Aquilino   April 15, 2017	'bamazonManager.js' module
//
// This module contains a constructor function used to create a 'Basic Flashcard' object.


//Dependencies
const TABLE = require('cli-table');
const INQUIRER = require('inquirer');
const MYSQL = require('mysql');

	//module containting database password
const PW = require('./pw.js');


//MySQL Database connetion parameters
const CONNECTION = MYSQL.createConnection({
	host: "localhost",
	port: 3306,

	// Your username
	user: 'root',

	// Your password
	password: PW.pw,
	database: 'Bamazon_db'
});


//===================================================================
//Initiates Module
function start()
{
	CONNECTION.connect();
	mainMenu();
}//end start()

//===================================================================

function mainMenu()
{
	console.log();//Adds new line
	
	INQUIRER.prompt([
	{
		type: 'list',
		message: "**MAIN MENU**",
		choices: [	"View Products for Sale",
	     			"View Low Inventory",
	    			"Add to Inventory",
	    			"Add New Product",
	    			"Quit"
	    		 ],
		name: "option"
	}

	]).then(function(res){

		switch (res.option)
		{
			case "View Products for Sale":
				displayProducts();
				break;
			case "View Low Inventory":
				displayProducts("low");
				break;	
			case "Add to Inventory":
				updateQuantity();			
				break;	
			case "Add New Product":
				addNewProduct();
				break;
			default:
				console.log("\nGOODBYE!");
				CONNECTION.end();	
		}
	});

}//END mainMenu()


//===================================================================

function displayProducts(mode)
{
	let query = 'SELECT * FROM products' ;
	
	// If 'mode' is low, sets query to only display products with low inventory
	if(mode === "low")
	{
		query = 'SELECT * FROM products WHERE (stock_quantity < 5)';
	}	


	CONNECTION.query(query, function (error, results, fields) {	
		if (error) throw error;
		
		//Stores results ('products' table data)
		const INVENTORY = results;
		
		//Instantiates table using 'cli-table' package.
		let table = new TABLE({
    		head: ['Item Id', 'Product Name', 'Price', 'Quantity'],
 			colWidths: [10, 20, 20, 10]
 		});

		//Pushes 'rows' to table
		for(let key in INVENTORY)
		{
			table.push([INVENTORY[key].item_id, INVENTORY[key].product_name, "$" + INVENTORY[key].price, INVENTORY[key].stock_quantity ]);
		}	

		//Displays table in terminal
		console.log(table.toString());

		mainMenu();	 
	});	
}

//===================================================================

function addNewProduct()
{
	console.log("\nADD NEW PRODUCT");

	INQUIRER.prompt([

		{
			type: 'input',
			message: "Product Name:",
			name: "product_name"
		},
		{
			type: 'input',
			message: "Department Name:",
			name: "department_name"
		},
		{
			type: 'input',
			message: "Price:",
			name: "price",
			filter: e => parseFloat(e).toFixed(2),
			validate: e => (e != NaN && e >= 0) ? true : console.log("\nPrice Must Be Number 0 Or More")
		},
		{
			type: 'input',
			message: "Quantity:",
			name: "stock_quantity",
			filter: e => parseInt(e),
			validate: e => (e !== null && e >= 0) ? true : console.log("\nQuantity Must Be An Integer 0 Or More")
		}

	]).then(function(newProduct){

		CONNECTION.query('INSERT products SET ?', newProduct, function (error, results, fields) {	
		if (error) throw error;
		
			console.log("\nProduct Successfully Added.\n");

			INQUIRER.prompt([
			{	
				type: 'list',
				message: "What Would You Like To Do?",
				choices: [	"Add Another Product To Inventory",
	     					"Return To Main Menu",
	    					"Quit"
	    		 		 ],
				name: "choice"
			}	

			]).then(function(res){

				switch (res.choice)
				{
					case "Add Another Product To Inventory":
						addNewProduct();
						break;
					case "Return To Main Menu":	
						mainMenu();
						break;
					default:
						console.log("\nGOODBYE!");
						CONNECTION.end();
						break;								
				}
			});			 
		});	
	});


}//END addInventory


//===================================================================

function updateQuantity()
{
	console.log("\n**ADD TO INVENTORY**");

	INQUIRER.prompt([

		{
			type: 'input',
			message: "Product ID:",
			name: "id",
			filter: id => parseInt(id),
			validate: id => (id > 0 && id != NaN) ? true : console.log("ID Must Be A Number > 0")
		},
		{
			type: 'input',
			message: "Additional Quantity",
			name: "quantity",
			filter: q => parseInt(q),
			validate: q => (q > 0 && q != NaN) ? true : console.log("Quantity Must Be A Number > 0")
		},

	]).then(function(product){	

		let update = [product.quantity, product.id];

		CONNECTION.query('UPDATE products SET stock_quantity=stock_quantity+? WHERE item_id=?', update, function (error, results, fields) {	
			if (error) throw error;
		
			console.log("\nProduct Quantity Successfully Added.\n");

			INQUIRER.prompt([
			{	
				type: 'list',
				message: "What Would You Like To Do?",
				choices: [	"Add Another Product Inventory",
	     					"Return To Main Menu",
	    					"Quit"
	    		 		 ],
				name: "choice"
			}	

			]).then(function(res){

				switch (res.choice)
				{
					case "Add Another Product Inventory":
						updateQuantity();
						break;
					case "Return To Main Menu":	
						mainMenu();
						break;
					default:
						console.log("\nGOODBYE!");
						CONNECTION.end();
						break;								
				}
			});
		});
	});
}//END updateQuantity()


//This starts the module if running by by itself.
// If used as dependency from another module remove this line.
//start();


