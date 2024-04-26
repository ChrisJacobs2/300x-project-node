BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Categories" (
	"categoryID"	INT,
	"categoryName"	VARCHAR(255),
	"categoryOrder"	INT UNIQUE,
	PRIMARY KEY("categoryID")
);
CREATE TABLE IF NOT EXISTS "Products" (
	"productID"	INT,
	"productName"	VARCHAR(255) NOT NULL UNIQUE,
	"productDescription"	VARCHAR(255) NOT NULL UNIQUE,
	"productImageURL"	VARCHAR(255) NOT NULL,
	"productPrice"	DECIMAL(10, 2) NOT NULL,
	"categoryID"	INT,
	"featuredProduct"	BOOLEAN,
	PRIMARY KEY("productID"),
	FOREIGN KEY("categoryID") REFERENCES "Categories"("categoryID")
);
CREATE TABLE IF NOT EXISTS "Users" (
	"userID"	TEXT NOT NULL UNIQUE,
	"dateCreated"	DATE NOT NULL,
	"timeCreated"	TIME NOT NULL,
	"userEmail"	VARCHAR(255) NOT NULL UNIQUE,
	"userType"	VARCHAR(255) NOT NULL,
	PRIMARY KEY("userID")
);
CREATE TABLE IF NOT EXISTS "Carts" (
	"cartID"	INTEGER NOT NULL,
	"cartStatus"	VARCHAR(255) NOT NULL,
	"creationDate"	DATE NOT NULL,
	"userID"	TEXT NOT NULL,
	PRIMARY KEY("cartID" AUTOINCREMENT),
	FOREIGN KEY("userID") REFERENCES "Users"("userID")
);
CREATE TABLE IF NOT EXISTS "CartProducts" (
	"cartProductID"	INTEGER NOT NULL UNIQUE,
	"cartID"	INT NOT NULL,
	"productID"	INT NOT NULL,
	"itemQty"	INT NOT NULL,
	PRIMARY KEY("cartProductID" AUTOINCREMENT),
	FOREIGN KEY("productID") REFERENCES "Products"("productID"),
	FOREIGN KEY("cartID") REFERENCES "Carts"("cartID")
);
INSERT INTO "Categories" ("categoryID","categoryName","categoryOrder") VALUES (1,'Chains',1),
 (2,'Body',2),
 (3,'Spikes',3),
 (4,'Performance',4),
 (5,'Exhaust',5),
 (6,'Flamethrower',6),
 (7,'Cabin',7),
 (8,'Lights',8),
 (9,'Nitro',9);
INSERT INTO "Products" ("productID","productName","productDescription","productImageURL","productPrice","categoryID","featuredProduct") VALUES (1,'Prod1','prodd','chains0.png',12,1,0),
 (2,'Prod2','prodd1','chains1.jpg',24.01,1,0),
 (3,'Prod3','prodd2','chains2.webp',3.5,1,0),
 (4,'Shiny Bumper Chain','Get some bling bling for your eighty thousand dollar pickup truck?','chains3.jpg',5000,1,0),
 (5,'Rusty Bumper Chains','Shiny chains are too showy? Get some MANLY rusty chains. Make sure you''ve had a tetanus shot in the last few years.','chains4.jpg',600,1,0),
 (6,'Turbo Exhaust','Not enough greenhouse gasses in your area? Speed up the universal heat-death that much quicker!','exhaust0.jpg',400,5,0),
 (7,'Jet Engine (Bed Mount)','Over 5 tonnes of thrust. We are not liable for any vehicle damage, hearing loss, death, or dismemberment.','exhaust1.jpg',30000,5,0),
 (8,'Upgraded Jet Engine (Bed Mount)','You could probably fly your big rig with this. We are not liable for any vehicle damage, hearing loss, environmental damage, burns, death, or dismemberment.','exhaust2.webp',60000,5,0),
 (9,'Rocket Engine (Bed Mount)','Honestly if you buy this there''s a good chance this will be your last purchase. We are not liable for any vehicle damage, hearing loss, environmental damage, burns, death, dismemberment, or any other legal situations arising from the use of this modification.','exhaust3.webp',90000000,5,0),
 (10,'Rim Spikes','Add some nice, road-legal spikes to your hubcap.','spikes1.webp',200,3,0),
 (11,'Tire screws','Gotta get a grip!','spikes2.jpg',40,3,0),
 (12,'Premium spikes','What a lovely hubcap! Comes with a bottle of polish.','spikes3.jpg',800,3,0);
INSERT INTO "Users" ("userID","dateCreated","timeCreated","userEmail","userType") VALUES ('111198790850313464743','4/25/2024','10:01:17 PM','cmjacobs@uncg.edu','customer');
INSERT INTO "Carts" ("cartID","cartStatus","creationDate","userID") VALUES (2,'new','4/26/2024','111198790850313464743');
INSERT INTO "CartProducts" ("cartProductID","cartID","productID","itemQty") VALUES (13,2,1,1),
 (14,2,2,1),
 (15,2,3,1);
COMMIT;
