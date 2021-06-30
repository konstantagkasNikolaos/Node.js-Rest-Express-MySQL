const Customer = require("../model/customer.model.js");

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Customer.getAll()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
};

// Find a customer from the database.
exports.findOne = (req, res) => {
  Customer.findById(req.params.customerId)
    .then((data) => {
      if (data === undefined) {
        res
          .status(404)
          .send(`customer with id:${req.params.customerId} not found`);
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => res.status(500).send(err));
};

// Create and Save a new Customer
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
  }

  const customer = new Customer({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active,
  });

  Customer.create(customer)
    .then((data) => res.status(201).send(data))
    .catch((err) => res.status(500).send(err));
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Customer.updateById(req.params.customerId, new Customer(req.body))
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => res.status(500).send(err));
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Customer.remove(req.params.customerId)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => res.status(500).send(err));
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Customer.removeAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.status(500).send(err));
};
