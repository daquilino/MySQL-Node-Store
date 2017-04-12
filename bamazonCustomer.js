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


function start()
{
	displayProducts();	
}

function displayProducts()
{
 
	CONNECTION.query('SELECT * FROM products', function (error, results, fields) {	
		if (error) throw error;
		
		const INVENTORY = results;
		
		let table = new TABLE({
    		head: ['Item Id', 'Product Name', 'Price'],
 			colWidths: [10, 20,20]
 		});

		for(let key in INVENTORY)
		{
			table.push([INVENTORY[key].item_id, INVENTORY[key].product_name, "$" + INVENTORY[key].price ]);
		}	

		//Displays table in terminal
		console.log(table.toString());

		orderPrompt(INVENTORY);		 
	});

	
}



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
		
		
		let itemobj = inventory.filter(e => e.item_id == id)[0]
		//Assigns 'itemQuantity' the 'stock_quanity' of returned array from 'filter'
		// where item_id of object elements (e.item_id) equal 'id' for each 'inventory' element.
		// Since 'item_id' is unique, returned array has only one element (hence [0]).
		let itemQuantity = inventory.filter(e => e.item_id == id)[0].stock_quantity;  

		if(itemQuantity < orderQuantity)
		{
			console.log("Insufficient quantity!");
			start();
		}
		else
		{
			updateInventory(id, itemQuantity, orderQuantity);
		}	


	});
}//END promptUser


function updateInventory(itemId,itemQuantity, orderQuantity)
{
	
	let newStockQuantity = itemQuantity - orderQuantity;

	CONNECTION.query('UPDATE products set stock_quantity=? WHERE item_id=? ',[newStockQuantity,itemId], function (error, results, fields) {	
		if (error) throw error;
		
		console.log("\nThank You For Your Order For " + orderQuantity + " " + itemobj.product_name + "." );
		console.log("Total Price: $", itemobj.price * orderQuantity, "\n");
		
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

