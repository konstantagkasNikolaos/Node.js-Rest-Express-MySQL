const express = require("express");
const app = express();
const customers = require("./controller/customerController");
const bodyParser = require("body-parser");

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// log request
app.use((req, res, next) => {
  console.log(`A ${req.method} request was made to ${req.url}`);
  next();
});

// Create a new Customer
app.post("/customers", customers.create);

// Retrieve all Customers
app.get("/customers", customers.findAll);

// Retrieve a single Customer with customerId
app.get("/customers/:customerId", customers.findOne);

// Update a Customer with customerId
app.put("/customers/:customerId", customers.update);

// Delete a Customer with customerId
app.delete("/customers/:customerId", customers.delete);

// Create a new Customer
app.delete("/customers", customers.deleteAll);

app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});
