const sql = require("../db");

// constructor
const Customer = function (customer) {
  this.email = customer.email;
  this.name = customer.name;
  this.active = customer.active;
};

Customer.getAll = () => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM customers", (err, res) => {
      if (err) {
        const errAdd = {
          ERROR: "Error occured while getting all customers",
          REASON: err,
        };
        reject(errAdd);
      } else {
        resolve(res);
      }
    });
  });
};

Customer.findById = (customerId) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT * FROM customers WHERE id = ${customerId}`,
      (err, res) => {
        if (err) {
          const errAdd = {
            ERROR: `Error occured while finding customer with id:${customerId}`,
            REASON: err,
          };
          reject(errAdd);
        } else {
          resolve(res[0]);
        }
      }
    );
  });
};

Customer.create = (newCustomer) => {
  return new Promise((resolve, reject) => {
    sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
      if (err) {
        const errAdd = {
          ERROR: "Error occured while creating a new customer",
          REASON: err,
        };
        reject(errAdd);
      } else {
        const resAdd = {
          SUCCESS: `New customer: ${newCustomer.email} with id:${res.insertId} created`,
        };
        resolve(resAdd);
      }
    });
  });
};

Customer.updateById = (id, customer) => {
  return new Promise((resolve, reject) => {
    sql.query(
      "UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
      [customer.email, customer.name, customer.active, id],
      (err, res) => {
        if (err) {
          const errAdd = {
            ERROR: `Error occured while updating customer with id: ${id}`,
            REASON: err,
          };
          reject(errAdd);
        } else {
          resolve(res.message);
        }
      }
    );
  });
};

Customer.remove = (id) => {
  return new Promise((resolve, reject) => {
    sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
      if (err) {
        const errAdd = {
          ERROR: `Error occured while deleting customer with id: ${id}`,
          REASON: err,
        };
        reject(errAdd);
      } else {
        resolve(`customer with ${id} was deleted`);
      }
    });
  });
};

Customer.removeAll = () => {
  return new Promise((resolve, reject) => {
    sql.query("DELETE FROM customers", (err, res) => {
      if (err) {
        const errAdd = {
          ERROR: `Error occured while deleting all customers`,
          REASON: err,
        };
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

module.exports = Customer;
