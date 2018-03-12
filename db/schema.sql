### Schema

DROP DATABASE IF EXISTS buyersWorkbench_db;

CREATE DATABASE buyersWorkbench_db;

USE buyersWorkbench_db;

CREATE TABLE parts (

pn INT AUTO_INCREMENT PRIMARY KEY,
description VARCHAR(100) NOT NULL,
uom VARCHAR(2) NOT NULL,
buyer INT(4) NOT NULL,
vendor VARCHAR(100) NULL,
vendor_pn VARCHAR(100) NULL,
lt_days INT NOT NULL,
cost DECIMAL(10,2) NOT NULL,
sales_price DECIMAL(10,2) NOT NULL,
ord_qty INT NULL 1,
-- quantity INT NULL,
qoh INT NULL 0,
ss INT NULL 0,
committed INT NULL,
active BOOLEAN NOT NULL DEFAULT 0

);

INSERT INTO parts (description, uom, buyer, vendor, vendor_pn, lt_days, cost, sales_price, ord_qty, quantity, qoh, ss, committed)

VALUES ("Mac Book - 15in", "EA", "2150", "APPLE", "HXY567229", "20", "1500", "2000", "1", "10", "3", "2", "1"), ("Mac Book - 11in", "EA", "2150", "APPLE", "FHG6261876", "15", "1200", "1800", "1", "9", "2", "2", "1"), ("Mircosoft laptop - 11in", "EA", "2050", "DELL", "67239202020", "15", "1200", "1800", "1", "9", "2", "2", "1");

ALTER TABLE parts AUTO_INCREMENT= 17922;

CREATE TABLE purchase_orders
(
po_num INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
vendor VARCHAR(100) NOT NULL
);

ALTER TABLE purchase_orders AUTO_INCREMENT=62033330;

INSERT INTO purchase_orders (vendor)
VALUES ("APPLE");

CREATE TABLE purchase_order_lines
(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
po_num INT NOT NULL,
po_ln INT NOT NULL,
pn INT NOT NULL,
order_qty INT NOT NULL,
delivered_qty INT NOT NULL,
due_date DATE NOT NULL,
open BOOLEAN NOT NULL DEFAULT 0,
FOREIGN KEY (po_num) REFERENCES purchase_orders (po_num)
);

INSERT INTO purchase_order_lines (po_num, po_ln, pn, order_qty, delivered_qty , due_date)

VALUES ("62033330", "1", "17922", "10", "0", "2018-03-03");


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

INSERT INTO sales_orders (so_num, so_ln, pn, customer, order_qty, delivered_qty, due_date)

VALUES ("200000", "1", "17922", "Trilogy", "50", "0", "2019-01-01"),("200000", "2", "17923", "Trilogy", "30", "0", "2018-10-10"), ("200001", "1", "17924", "Univ Texas", "10", "0", "2018-11-11"), ("200002", "1", "17922", "Univ Texas", "5", "0", "2019-02-02");
