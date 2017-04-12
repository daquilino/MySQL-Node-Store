//Dependencies
const TABLE = require('cli-table');
const INQUIRER = require('inquirer');
const MYSQL = require('mysql');
const PW = require('./pw.js');

const CONNECTION = MYSQL.createConnection({
 host: "localhost",
 port: 3306,

 // Your username
 user: 'root',

 // Your password
 password: PW.pw,
 database: 'Bamazon_db'
});

//=============================================================================

function start()
{
	displayProducts();	
}


//=============================================================================

function displayProducts()
{
 
	CONNECTION.query('SELECT * FROM products', function (error, results, fields) {	
		if (error) throw error;
		
		//Stores results ('products' table data)
		const INVENTORY = results;
		
		//Instantiates table using 'cli-table' package.
		let table = new TABLE({
    		head: ['Item Id', 'Product Name', 'Price'],
 			colWidths: [10, 20,20]
 		});

		//Pushes 'rows' to table
		for(let key in INVENTORY)
		{
			table.push([INVENTORY[key].item_id, INVENTORY[key].product_name, "$" + INVENTORY[key].price ]);
		}	

		//Displays table in terminal
		console.log(table.toString());

		orderPrompt(INVENTORY);		 
	});	
}

//=============================================================================

function orderPrompt(inventory)
{	
	INQUIRER.prompt([
		{
			type: "input",
			message: "Please Enter the ID of product to purchase.",
			name: "id",
			filter: id => parseInt(id), 
			validate: id => ((inventory.filter(e => e.item_id == id)).length > 0) ?true : console.log("\n There is no ID of", id, "Please Enter ID From Table.")
		},
		{
			type: "input",
			message: "Please Enter Quantity:",
			name: "orderQuantity"
		}

	]).then((data) => {

		let id = data.id;
		let orderQuantity = parseInt(data.orderQuantity);	
		
		//'product' is row of product with 'item_id' of 'id' from 'products' table. 
		//I get 'product' from the first element of returned array from 'filter'
		// where item_id of object elements (e.item_id) equal 'id' for each 'inventory' element.
		// Since 'item_id' is unique, returned array has only one element (hence [0]).
		let product = inventory.filter(e => e.item_id == id)[0]
		

		let productQuantity = product.stock_quantity;  

		if(productQuantity < orderQuantity)
		{
			console.log("Insufficient quantity!");
			start();
		}
		else
		{
			updateInventory(product, orderQuantity);
		}	
	});
}//END promptUser

//=============================================================================

function updateInventory(product, orderQuantity)
{
	
	let newStockQuantity = product.stock_quantity - orderQuantity;

	CONNECTION.query('UPDATE products set stock_quantity=? WHERE item_id=? ',[newStockQuantity,product.item_id], function (error, results, fields) {	
		if (error) throw error;
		
		console.log("\nThank You For Your Order For " + orderQuantity + " " + product.product_name + "." );
		console.log("Total Price: $", product.price * orderQuantity, "\n");
		
		INQUIRER.prompt([
			{
				type: "confirm",
				message: "Would You Like To Purchase Another Item?",
				name: "confirm"
			}	

		]).then(function(answer){

			if(answer.confirm)
			{
				start();
			}
			else
			{ 
				//else end connection, quit app.
				console.log("\nGOODBYE!");
				CONNECTION.end();
			}
		})
	});
	
}//END updateInventory

CONNECTION.connect();

start();

