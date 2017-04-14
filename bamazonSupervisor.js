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

function start()
{
	console.log();//Adds new line
	
	INQUIRER.prompt([
	{
		type: 'list',
		message: "**MAIN MENU**",
		choices: [	"View Product Sales By Department",
	     			"Create New Department"
	    			"Quit"
	    		 ],
		name: "option"
	}

	]).then(function(res){

		switch (res.option)
		{
			case "View Product Sales By Department":
				displaySales();
				break;
			case "Create New Department":
				addDepartment();
				break;	
			case default:
				console.log("\nGOODBYE!");
				CONNECTION.end();
				break;	
		}
	});
}//end start()

//===================================================================

function displaySales()
{

	let query = 'SELECT * FROM products' ;
	
	
	CONNECTION.query(query, function (error, results, fields) {	
		if (error) throw error;
		
		//Stores results ('products' table data)
		const SALES_TABLE = results;
		
		//Instantiates table using 'cli-table' package.
		let table = new TABLE({
    		head: ['Department Id', 'Department', 'Overhead Costs', 'Total Sales', 'Total Profit'],
 			colWidths: [10, 20, 20, 10, 10]
 		});

		//Pushes 'rows' to table
		for(let key in SALES_TABLE)
		{
			table.push([SALES_TABLE[key].item_id, SALES_TABLE[key].product_name, "$" + SALES_TABLE[key].price, SALES_TABLE[key].stock_quantity ]);
		}	

		//Displays table in terminal
		console.log(table.toString());

		start();	 
	});	
}









}