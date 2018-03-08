### Schema

DROP DATABASE IF EXISTS buyersWorkbench_db;

CREATE DATABASE buyersWorkbench_db;

USE buyersWorkbench_db;

CREATE TABLE parts
(
pn INT IDENTITY(17922,1) NOT NULL AUTO_INCREMENT PRIMARY KEY,
description VARCHAR(100) NULL,
uom VARCHAR(2) NULL,
buyer INT(4) NULL
vendor VARCHAR(100) NULL,
vendor_pn VARCHAR(100) NULL,
lt_days INT NULL,
cost DECIMAL(10,2) NULL,
sales_price DECIMAL(10,2) NULL,
ord_qty INT NULL,
quantity INT NULL,
qoh INT NULL,
ss INT NULL,
committed INT NULL,
active BOOLEAN NOT NULL DEFAULT 0
);

CREATE TABLE purchase_orders
(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
po_num INT NULL,
po_ln INT NULL,
pn INT NULL,
vendor VARCHAR(100) NULL,
order_qty INT NULL,
delivered_qty INT NULL,
due_date DATE NULL,
open BOOLEAN NOT NULL DEFAULT 0
);

CREATE TABLE sales_orders
(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
so_num INT NULL,
so_ln INT NULL,
pn INT NULL,
customer VARCHAR(100) NULL,
order_qty INT NULL,
delivered_qty INT NULL,
due_date DATE NULL,
open BOOLEAN NOT NULL DEFAULT 0
);
