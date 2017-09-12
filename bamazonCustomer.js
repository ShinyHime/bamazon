// Storing required npm packages into variables
var mysql = require('mysql');
var inquirer = require('inquirer');

var Table = require('cli-table');

// instantiate CLI-TABLE npm package
var displayItemTable = new Table({
    head: ['item_id', 'product_name', 'price']
  , colWidths: [10, 40, 10]
});


// THIS RUNS THE APP
// ********

// OPEN: Store Connection information
var connection = mysql.createConnection({
  //information
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Re182769!",

  database: "bamazon"
}); //CLOSE: Store Connection information


// OPEN: What happens when we connect
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  console.log("");
  console.log("----------")

  displayItems();

}); // CLOSE: What happens when we connect

// ********
// ABOVE RUNS THE APP

// --------

//FUNCTIONS

// OPEN: Function to display items
function displayItems() {

  // OPEN: Connect to products table to display items
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;

    // OPEN: Loop to display items
    for (var i = 0; i < results.length; i++) {

      displayItemTable.push(
      [results[i].item_id, results[i].product_name, results[i].price ]
      );

    } // CLOSE: Loop to display items

    console.log(displayItemTable.toString());
    confirmToOrder();

  }); // CLOSE: Connect to products table to display items

} // CLOSE: Function to display items

//OPEN: Function to confirm if users would like to place an order
function confirmToOrder() {

  inquirer.prompt([

  {
    type: "list",
    name: "confirm",
    message: "Would you like to place an order?",
    choices: ["Yes", "No"]
  }

]).then(function (answer) {

  if (answer.confirm === 'Yes'){
    orderItems();
  } else {
    console.log("Thank you for visiting Bamazon! Have a nice day!");
    connection.end();
  }

  });

} //CLOSE: Function to confirm if users would like to place an order

// OPEN: Function to orderItems
function orderItems() {

  // OPEN: Connect to table
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;

    var choiceArray = [];

    for (var i = 0; i < results.length; i++) {
      //needs to be string or wont work in inq
      choiceArray.push( '' + results[i].item_id + '' );
    }

    inquirer.prompt([

      {
        type: "list",
        name: "choice",
        message: "What is the ID of the product that you want to buy?",
        choices: choiceArray
      },
      {
        name: "units",
        type: "input",
        message: "How many units would you like to buy?"
      }


    ]).then(function (answers) {
      // get the information of the chosen item

          var chosenItem;

          for (var i = 0; i < results.length; i++) {
            //needs to be a string or wont work
            var temp = '' + results[i].item_id + '';

            if (temp === answers.choice) {
              chosenItem = results[i].item_id;
            }
          }

          console.log("");
          console.log("");
          console.log("*********")
          console.log("");
          console.log("");

          console.log("Item ID: " + chosenItem);

          connection.query("SELECT * FROM products WHERE item_id=?", [chosenItem], function(err, res) {
            if (err) throw err;
            console.log("Item Name:" + res[0].product_name + " || In Stock Quantity: " + res[0].stock_quantity);

            console.log("");
            console.log("");
            console.log("*********")
            console.log("");
            console.log("");

            // if statement that checks if unit input is less than stock quantitiy
            if (answers.units <= res[0].stock_quantity ) {
              console.log("You bought: " + res[0].product_name + " [" + answers.units + " unit(s)]");
              console.log("Your total bill is: " + (parseInt(answers.units) * res[0].price) );


              var newStockAmount = res[0].stock_quantity - parseInt(answers.units);
                connection.query(
                  "UPDATE products SET ? WHERE ?",
                  [
                    {
                      stock_quantity: newStockAmount
                    },
                    {
                      item_id: chosenItem
                    }
                  ]);

                  console.log("");
                  console.log("");
                  console.log("*********")
                  console.log("");
                  console.log("");

                  confirmToOrder();

            } else {
              console.log("Unfortunately, there isn't enough in stock. Please Try Again.");
              console.log("");
              console.log("");
              console.log("*********")
              console.log("");
              console.log("");
              orderItems();
            }

          });


    });

  }); // CLOSE: Connect to table

} // CLOSE: Function to orderItems
