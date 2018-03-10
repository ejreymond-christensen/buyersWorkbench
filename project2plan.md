--==::Phase 1 - Essential Stuff::==--

We will have three pages:
1. Login - validation (Joseph has been looking into passport)
2. Req/PO page - this is where the purchasers will have a list of things to order.
3. Item Inquiry page - This is the page the buyer can view all info on a searched part.

________________________________________________________________________________
Login-
TODO's:
-Make the HTML.
-The login, will need a table named users.

________________________________________________________________________________
Req/PO page-
The user should be able to search by their buyer number on the top right. We will have to join multiple tables to do the math. (Supply + Inventory) - (Demand+SS(ie safety stocking levels)). supply (PO's) will be a table and demand(SO's) will be a table. Inventory and SS will be found on the part table (this is the table with all the info on the part (ie the get request for the item inquiry page)). We can do this by joining three table ... not sure if it is possible. Or we can update the part table anytime an order is created (SO or PO), then pull our requirements out of this. Also note, when we create our record, the PO will need to be treated like a key, it should augment by value of 1. We can't set the PO as the key, because multiple items can be ordered on one order, so PO line1 , line2 , line3 means the PO has three different parts ordered.

TODO's:
-*HTML layout is done.*
-Need to convert the table into handlebars.
-Get request filtered by the buyer (info set in part table). calculate what needs to be ordered.
-Push all the orders the buyer has placed, into the supply table.

Nice to haves:
-make the PN in the req page a link to the part inquiry page.

________________________________________________________________________________
Item inquiry page-

The buyer can search the top right by the item number. This will all the info from multiple tables (pn, demand, supply) and display all the info into the inquiry section.

TODO's:
-*HTML layout is done.*
-Need to convert into handlebars.
-Search will send a GET for all the part info. it will also send a GET to supply and demand tables, to search for the SO and PO information where that part is ordered and open respectively in the tables.

Nice to haves:
- **simple** algorithm to calculate forecast then display on the forecast area via graph. ie, (total sales for the last 4 months) / 4. This would be very crud, but enough for an example.

________________________________________________________________________________
Structure-

Most likely we will need the following tables.
-user table
-item table (holds all item info).
-demand table(holds all sales order info).
-supply table(holds all the purchase order info).

________________________________________________________________________________

--==::Phase 2 - if possible Stuff::==--

-A sales portal that shows the limited info.
-capture data from vendor and customer.
-more metic visuals.
