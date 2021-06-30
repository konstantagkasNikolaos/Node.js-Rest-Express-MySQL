const express = require("express");
const app = express();
const customers = require("./controller/customerController");

// parse requests of content-type: application/json
app.use(
  express.urlencoded({
    extended: false,
  })
);

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.json());

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
