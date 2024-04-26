# How to run?
clone repository


in console, run "npm install"

If you want to build the database yourself, create one named demo.db using the provided sql file

then, run "node server.js"

Currently, the user is identified via google auth. Log in by pressing the log in button. Otherwise, if you
access certain parts of the page, you need to be logged in, and it will redirect you.

To see the product details endpoints for each item, use this format: "http://localhost:8000/details/item/1"

relevant links
http://localhost:8000/
http://localhost:8000/products/all
http://localhost:8000/details/item/1
http://localhost:8000/cart/all/:1
http://localhost:8000/admin/add
