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
		message: "**SUPERVISOR MENU**",
		choices: [	"View Product Sales By Department",
	     			"Create New Department",
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
			default:
				console.log("\nGOODBYE!");
				CONNECTION.end();
		}
	});
}//end start()

//===================================================================

function displaySales()
{

	let query = "SELECT d.department_id, d.department_name, d.over_head_costs, x.total_sales FROM departments d, "
	+ "(SELECT p.department_name, SUM(p.product_sales) AS total_sales FROM products p GROUP BY p.department_name) x "
	+ "WHERE x.department_name = d.department_name";
	
	
	CONNECTION.query(query, function (error, results, fields) {	
		if (error) throw error;
		
		//Stores results table
		const SALES_TABLE = results;
		
		//Instantiates table using 'cli-table' package.
		let table = new TABLE({
    		head: ['Id', 'Department', 'Overhead Costs', 'Total Sales', 'Total Profit'],
 			colWidths: [5, 25, 16, 14, 15]
 		});

		//Pushes 'rows' to table
		for(let key in SALES_TABLE)
		{
			//If department is add to 'departments' table but no product for that department in 'products' table,
			// total_sales will be null. This checks and sets total_sales to zero if it is null.
			if(SALES_TABLE[key].total_sales === null)
			{
				SALES_TABLE[key].total_sales = 0;
			}

			let totalProfit = SALES_TABLE[key].total_sales - SALES_TABLE[key].over_head_costs;
			
			table.push([
				SALES_TABLE[key].department_id, 
				SALES_TABLE[key].department_name, 
				"$" + SALES_TABLE[key].over_head_costs, 
				"$" + SALES_TABLE[key].total_sales, 
				"$" + totalProfit
			]);
		}	

		//Displays table in terminal
		console.log(table.toString());

		start();	 
	});	
}//END displaySales()

//===================================================================

function addDepartment()
{

	console.log("\n**CREATE NEW DEPARTMENT**");

	INQUIRER.prompt([

		{
			type: 'input',
			message: "Department Name:",
			name: "department_name"
		},
		
		{
			type: 'input',
			message: "Overhead Costs:",
			name: "over_head_costs",
			filter: e => parseFloat(e).toFixed(2),
			validate: e => (e != NaN && e >= 0) ? true : console.log("\nOverhead Costs Must Be Number 0 Or More")
		}

	]).then(function(newProduct){

		CONNECTION.query('INSERT departments SET ?', newProduct, function (error, results, fields) {	
		if (error) throw error;
		
			console.log("\nDepartment Successfully Created.\n");

			INQUIRER.prompt([
			{	
				type: 'list',
				message: "What Would You Like To Do?",
				choices: [	"Create Another Department",
	     					"Return To Supervisor Menu",
	    					"Quit"
	    		 		 ],
				name: "choice"
			}	

			]).then(function(res){

				switch (res.choice)
				{
					case "Create Another Department":
						addDepartment();
						break;
					case "Return To Supervisor Menu":	
						start();
						break;
					default:
						console.log("\nGOODBYE!");
						CONNECTION.end();							
				}
			});			 
		});	
	});


}//END addDepartment()


CONNECTION.connect();
start();






