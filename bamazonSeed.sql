-- Drop Database for Dev Environment
DROP DATABASE IF EXISTS bamazon;

-- Create a Database called bamazon if it does not exist
CREATE DATABASE IF NOT EXISTS bamazon;

USE bamazon;

-- Create a Table called products
CREATE TABLE IF NOT EXISTS products (
  item_id INTEGER(11) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NULL,
  department_name VARCHAR(20)NULL,
  price DECIMAL(10, 2) NULL,
  stock_quantity INTEGER(10) NULL,
  PRIMARY KEY (item_id)
);

-- Select the product table to view it in MySQL
SELECT * FROM products;

-- Insert mock data into products table
INSERT INTO products
(product_name, department_name, price, stock_quantity)
VALUES
('Splatoon 2', 'Game', 59.99, 11),
('Legend of Zelda: Breath of the Wild', 'Game', 59.99, 4),
('Pokemon Sun', 'Game', 39.99, 53),
('Pokemon Moon', 'Game', 39.99, 27),
('Mario Kart 8 Deluxe', 'Game', 59.99, 8),
('Nintendo Switch', 'Console', 299.99, 3),
('Nintendo 3DS', 'Console', 199.99, 235),
('Nintendo Switch Dock', 'Accessory', 89.99, 22),
('Nintendo Switch Pro Controller', 'Accessory', 69.99, 13),
('Nintendo Switch Traveller Case', 'Accessory', 19.99, 26);
