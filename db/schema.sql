### Schema

DROP DATABASE IF EXISTS buyersWorkbench_db;

CREATE DATABASE buyersWorkbench_db;

USE buyersWorkbench_db;

CREATE TABLE parts
(
pn INT IDENTITY(17922,1) NOT NULL AUTO_INCREMENT PRIMARY KEY,
description VARCHAR(100) NOT NULL,
uom VARCHAR(2) NOT NULL,
buyer INT(4) NOT NULL
vendor VARCHAR(100) NULL,
vendor_pn VARCHAR(100) NULL,
lt_days INT NOT NULL,
cost DECIMAL(10,2) NOT NULL,
sales_price DECIMAL(10,2) NOT NULL,
ord_qty INT NULL,
quantity INT NULL,
qoh INT NULL,
ss INT NULL,
committed INT NULL,
active BOOLEAN NOT NULL DEFAULT 0
);

CREATE TABLE purchase_orders
(
po_num INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
vendor VARCHAR(100) NOT NULL,
);

CREATE TABLE purchase_order_lines
(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
po_number INT NOT NULL,
po_ln INT NOT NULL,
pn INT NOT NULL,
order_qty INT NOT NULL,
delivered_qty INT NOT NULL,
due_date DATE NOT NULL,
open BOOLEAN NOT NULL DEFAULT 0,
FOREIGN KEY (po_number) REFERENCES purchase_orders(po_number)
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
