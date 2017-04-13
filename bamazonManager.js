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
	INQUIRER.prompt([

	{
		type: 'list',
		message: "Select An Option:",
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
				
				break;	
			case "Add New Product":
				
				break;
			case "Quit":
				console.log("\nGOODBYE!");
				CONNECTION.end();
				break;		
			default:
				return;	

		}
	});
}//end start()


//Don't need anymore
// function quitPrompt()
// {
// 	INQUIRER.prompt([
// 	{

// 		type: "confirm",
// 		message: "Would You Like To Select Another Option?",
// 		name: "confirm"

// 	}


// 	]).then(function(res){

// 		if (res.confirm)
// 		{
// 			start();

// 		}	
// 		else
// 		{
// 			console.log("\nGOODBYE!");
// 			//CONNECTION.end();
// 			return;
// 		}	

// 	}); 
// }//END quitPrompt()



function displayProducts(type)
{
	let query = 'SELECT * FROM products' ;
	
	if(type === "low")
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

		start();	 
	});	
}
CONNECTION.connect();
start();
