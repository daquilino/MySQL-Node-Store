//Douglas Aquilino   April 15, 2017	'bamazonCustomer.js' module
//


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
		}
	
	]).then((data) => {

		let id = data.id;
			
		//'product' is row of product with 'item_id' of 'id' from 'products' table. 
		// I get 'product' from the first element of returned array from 'filter'
		// where item_id of object elements (e.item_id) equal 'id' for each 'inventory' element.
		// Since 'item_id' is unique, returned array has only one element (hence [0]).
		let product = inventory.filter(e => e.item_id == id)[0]
		
		let productQuantity = product.stock_quantity;  

		if (productQuantity == 0)
		{
			console.log("\nSorry", product.product_name, "Is OUT OF STOCK.");

			INQUIRER.prompt([
				{
					type: "confirm",
					message: "Would You Like To Purchase Another Item?",
					name: "confirm"
				}	

				]).then(function(answer){

				if(answer.confirm)
				{
					orderPrompt(inventory);
				}
				else
				{ 
					//else end connection, quit app.
					console.log("\nGOODBYE!");
					CONNECTION.end();
				}
			})
		}			
		else
		{	
			INQUIRER.prompt([
			
				{
					type: "input",
					message: "Please Enter Quantity:",
					name: "orderQuantity",
					filter: q => parseInt(q), 
					validate: q => (q > 0 && q <= productQuantity) ?true : console.log("\n\nSorry, Quantity Must Be Between 1 -" , productQuantity)
				}
				]).then(function(quantity){
								
					updateInventory(product, quantity.orderQuantity);			
				});
		}		
	});
}//END promptUser

//=============================================================================


function updateInventory(product, orderQuantity)
{	
		
	//Total purchase price of product(s) ordered formated to 2 decimal places.
	let totalPrice =  (product.price * orderQuantity).toFixed(2);

	let updateValues = [orderQuantity, totalPrice, totalPrice, product.item_id, product.department_name];

	let query = 'UPDATE products p, departments d  SET p.stock_quantity=stock_quantity-?, p.product_sales=product_sales+?, d.total_sales=total_sales+? WHERE p.item_id=? AND d.department_name=?' ;
	
	CONNECTION.query(query, updateValues, function (error, results, fields) {	
		if (error) throw error;
		
		console.log("\nThank You For Your Order Of " + orderQuantity + " " + product.product_name + "(s)." );
		console.log("Total Price: $", totalPrice, "\n");
		
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

function updateTotalSales()
{

	let query = "SELECT p.department_name, SUM(p.product_sales) AS total_sales FROM products p GROUP BY p.department_name";

	CONNECTION.query(query, function (error, results, fields) {	
		if (error) throw error;

		let query = "UPDATE departments "

		CONNECTION.query(query, function (error, results, fields) {	
		if (error) throw error;

		





	});	





	});	

}



CONNECTION.connect();
start();

