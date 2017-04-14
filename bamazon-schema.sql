CREATE DATABASE Bamazon_db;

USE Bamazon_db;

CREATE TABLE products(
	`item_id` INT NOT NULL AUTO_INCREMENT,
	`product_name` VARCHAR(128) NOT NULL,
	`department_name` VARCHAR (128) NOT NULL,
	`price` DECIMAL(10,2) NOT NULL,
	`stock_quantity` INT(10) NOT NULL,
	`product_sales` DECIMAL(10,2) DEFAULT 0 NOT NULL,
	PRIMARY KEY(item_id)
);

CREATE TABLE departments(
	`department_id` INT NOT NULL AUTO_INCREMENT,
	`department_name` VARCHAR (128) NOT NULL,
	`over_head_costs` DECIMAL(10,2) NOT NULL,
	`total_sales` DECIMAL(10,2) DEFAULT 0 NOT NULL,
	PRIMARY KEY(department_id)
);
