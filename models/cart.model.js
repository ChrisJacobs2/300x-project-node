"use strict";
const db = require("../models/db-conn");
const path = require("path");

function getAllById(id) {
  let sql = `
    SELECT p.productName, p.productImageURL, p.productPrice, cp.itemQty
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

// function createNew(params) {
//   let sql =
//     'INSERT INTO menu ("id","name","category","subcategory","price","cost") ' +
//     "VALUES(?, ?, ?, ?, ?, ?);";
//   const item = db.run(sql, params);
//   return item;
// };


function deleteById(id) {
  let sql = 'DELETE FROM MENU WHERE id =?';
  const response = db.run(sql, id);
  return response;
};

function update(params) {
  let sql = 'UPDATE menu SET name =?, category =?,subcategory =?,price =?,cost =? WHERE id =?;';
  const response = db.run(sql, params);
  return response;
};



module.exports = {
  getAllById,
  deleteById,
  update,
  checkCart,
  createNewCart,
};
