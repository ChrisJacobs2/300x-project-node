--
-- File generated with SQLiteStudio v3.4.4 on Fri Mar 29 16:54:59 2024
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: CartProducts
CREATE TABLE IF NOT EXISTS CartProducts (
    cartProductID INT PRIMARY KEY,
    cartID        INT,
    productID     INT,
    itemQty       INT NOT NULL,
	cookie        TEXT,
    FOREIGN KEY (
        cartID
    )
    REFERENCES Carts (cartID),
    FOREIGN KEY (
        productID
    )
    REFERENCES Products (productID) 
);


-- Table: Carts
CREATE TABLE IF NOT EXISTS Carts (
    cartID       INT           PRIMARY KEY,
    cartStatus   VARCHAR (255) NOT NULL,
    creationDate DATE          NOT NULL,
    userID       INT,
    FOREIGN KEY (
        userID
    )
    REFERENCES Users (userID) 
);


-- Table: Categories
CREATE TABLE IF NOT EXISTS Categories (
    categoryID    INT           PRIMARY KEY,
    categoryName  VARCHAR (255),
    categoryOrder INT           UNIQUE
);


-- Table: Products
CREATE TABLE IF NOT EXISTS Products (
    productID          INT             PRIMARY KEY,
    productName        VARCHAR (255)   NOT NULL
                                       UNIQUE,
    productDescription VARCHAR (255)   NOT NULL
                                       UNIQUE,
    productImageURL    VARCHAR (255)   NOT NULL,
    productPrice       DECIMAL (10, 2) NOT NULL,
    categoryID         INT,
    featuredProduct    BOOLEAN,
    FOREIGN KEY (
        categoryID
    )
    REFERENCES Categories (categoryID) 
);


-- Table: Users
CREATE TABLE IF NOT EXISTS Users (
    userID       INT           PRIMARY KEY,
    dateCreated  DATE          NOT NULL,
    timeCreated  TIME          NOT NULL,
    userName     VARCHAR (255) NOT NULL
                               UNIQUE,
    userEmail    VARCHAR (255) NOT NULL
                               UNIQUE,
    userPassword VARCHAR (255) NOT NULL,
    userType     VARCHAR (255) NOT NULL
);


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
