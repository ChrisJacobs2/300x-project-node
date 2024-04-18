# How to run?
clone repository

set up the database

in console, run "npm install"

then, run "node server.js"

Setting up the database:
In your favorite SQLite editor, run the created_tables.sql file. Then,
add some entries to the Products, Carts, CartProducts tables. 

Currently, the user is identified via cookie. It's hard coded as "1"
for convenience, but the code does work. Otherwise, a unique (and long) id
is saved as a cookie. This will be changed once Google Auth is implemented,
and the user is identified that way.

relevant links
http://localhost:8000/
http://localhost:8000/products/all
http://localhost:8000/details/item/:1
http://localhost:8000/cart/all/:1


