# Pied Piper ERP
Buyer's Enterprise Resource Planning System using node, sequelize and MySQL

## Description

This is an app that helps purchasing departments that are using ERP systems to get an overview/dashboard to facilitate purchasing operations. Uses HTML - CSS - JS - jQuery - Handlebars - node - sequelize - MySQL.

## What this App Fixes

Procurement departments have many moving parts across the supply-chain, and viewing data from various different sources can slow production and cause errors. This app will be able to hook into the ERP systems DB. This allows the purchaser to work off one dashboard to view and submit the information they need.

## How to use Pied Piper

From the landing page you can have a new buyer register by opening the employee registration modal.

![modal image](https://github.com/ejreymond-christensen/buyersWorkbench/blob/master/readmeImg/register.png)

Registered buyers can sign in with their name and buyer id in the employee sign in modal.

![req image](https://github.com/ejreymond-christensen/buyersWorkbench/blob/master/readmeImg/signin.png)

On clicking submit in the Employee Sign in modal the user will be redirected to the req. page.

##### Req. Page
On the req. page our site will allow the buyer to filter through existing sales orders with their buyer id.

![req image](https://github.com/ejreymond-christensen/buyersWorkbench/blob/master/readmeImg/buyeridsearch.png)

![req image](https://github.com/ejreymond-christensen/buyersWorkbench/blob/master/readmeImg/buyer.png)

The buyer can then select which parts they want to create a purchase order for while giving them the flexibility to change the quantity and date if necessary.

![req image](https://github.com/ejreymond-christensen/buyersWorkbench/blob/master/readmeImg/req.png)

Once the buyer hits the submit button a new purchase order is created.

##### Inquiry Page

On the inquiry page the user can search for part numbers. All of the relevant data about the part number is displayed on the dashboard.

##### Graphs and Charts

On the inquiry page there is a bar graph displaying the amount of parts purchased in the previous 30, 60, 90 days, current quarter and future quarter.

![chart image](https://github.com/ejreymond-christensen/buyersWorkbench/blob/master/readmeImg/chart1.png)

If the user clicks on the hamburger in the top left corner of the page and vendor outlook button will show. This button will open a new model showing the user an interactive chart showing quarter 1, quarter 2, and quarter 3 results for each vendor.

![chart image](https://github.com/ejreymond-christensen/buyersWorkbench/blob/master/readmeImg/vendor.png)

## How to run the program

You can simply go to our deployed site through [Heroku](https://pied-piper-bw.herokuapp.com/)
