"use strict";
const db = require("../models/db-conn");
const path = require("path");

function getAllById(id) {
  let sql = `
    SELECT p.productName, p.productImageURL, p.productPrice, cp.itemQty, cp.cartProductID
    FROM Products p
    INNER JOIN CartProducts cp ON p.productID = cp.productID
    INNER JOIN Carts c ON cp.cartID = c.cartID
    WHERE c.userID = ?;
  `;
  const data = db.all(sql, id);
  return data;
};

function checkCart(userID) {
  let sql = `
    SELECT 1
    FROM Carts
    WHERE userID = ?
    LIMIT 1;
    `;
  const data = db.get(sql, userID);
  return data != null;
}

// Carts table MUST be set to autoincrement the cartID
function createNewCart(userID) {

  const creation_date = new Date().toLocaleDateString();
  const cart_status = "new"
  let sql = `
    INSERT INTO Carts (cartStatus, creationDate, userID)
    VALUES (?, ?, ?);
  `;
  const params = [cart_status, creation_date, userID];
  const data = db.run(sql, params);
  return data;
}


function deleteById(id) {
  let sql = 'DELETE FROM CartProducts WHERE cartProductID =?';
  const response = db.run(sql, id);
  return response;
};

function checkout(userID) {
  console.log("Checking out cart for user ", userID);
    // Delete the CartProducts records
    let sql = `
        DELETE FROM CartProducts
        WHERE CartProducts.cartID IN (
            SELECT Carts.cartID
            FROM Carts
            WHERE Carts.userID = ?
        )
    `;
    db.run(sql, userID);

    // Delete the Cart record
    sql = 'DELETE FROM Carts WHERE userID = ?';
    const response = db.run(sql, userID);
    return response;
}

function update(params) {
  let sql = 'UPDATE cartProducts SET itemQty =? WHERE cartProductID =?;';
  const response = db.run(sql, params);
  return response;
};

// params: productID, quantity, userID
function addProduct(params) {

  // get the cartID
  let sql = 'SELECT cartID FROM Carts WHERE userID = ?';
  let response = db.get(sql, params[2]);
  let cartID = response.cartID;

  // if the cartID exists, add the product to the cart
  if (cartID) {
    sql = 'INSERT INTO CartProducts (cartID, productID, itemQty) VALUES (?, ?, ?)';
    response = db.run(sql, [cartID, params[0], params[1]]);
  
  }
  
  return response;
}




module.exports = {
  getAllById,
  deleteById,
  update,
  checkCart,
  createNewCart,
  checkout,
  addProduct,
};
