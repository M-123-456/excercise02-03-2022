import { test } from "./test.js";
console.log(test);

import { customers } from "./customers.js";
import { orders } from "./orders.js";
import { products } from "./products.js";

console.log(
  `There are ${customers.length} customers, ${orders.length} orders and ${products.length} products`
);

console.log();
console.log("====Q1====");
console.log();
// (1) display all company names of customers
customers.forEach((m) => console.log(m.companyName));

console.log();
console.log("====Q2====");
console.log();
// (2) display **city - customerName**
customers.forEach((m) => console.log(`${m.address.city} - ${m.companyName}`));

console.log();
console.log("====Q3====");
console.log();
// (3) display **city - customerName** only for those from London
const customersInUK = customers.filter((m) => m.address.country === "UK");
customersInUK.forEach((m) =>
  console.log(`${m.address.city} - ${m.companyName}`)
);

console.log();
console.log("====Q4====");
console.log();
//(4) create function `displayCustomerOrders(customerId)` which returns a string the following information
/*
- `console.log(displayCustomerOrders('AROUT'));`
- returns Around the Horn (AROUT) has 14 orders
*/

const displayCustomerOrders = (customerId) => {
  const customer = customers.find((m) => m.customerID === customerId);
  const custOrders = orders.filter((m) => m.customerID === customerId);
  return `${customer.companyName} (${customerId}) has ${custOrders.length} orders`;
};

console.log(displayCustomerOrders("AROUT"));

console.log();
console.log("====Q5====");
console.log();
// (5) create function `getCustomerOrderObject(customerId)` which returns an objects the following information:
/*
  - `console.log(getCustomerOrderObject('AROUT'));`
  - returns:

```
{
  id: 'AROUT',
  name: 'Around the Horn',
  orderIds: ['10741', '10743', '10920', ...]
}
```
*/
const getCustomerOrderObject = (customerId) => {
  const customer = customers.find((m) => m.customerID === customerId);
  const custOrders = orders.filter((m) => m.customerID === customerId);
  return {
    id: customer.customerID,
    name: customer.companyName,
    orderIds: custOrders.map((m) => m.orderID),
  };
};
console.log(getCustomerOrderObject("AROUT"));

console.log();
console.log("====Q6====");
console.log();
// (6) create function `getProductsOrderedByCustomer(customerId)` which returns an array of the names of products a customer has ordered:
/*
[
  'Valkoinen suklaa',
  'Guaraná Fantástica',
  'Ravioli Angelo',
  ...
]
*/

// function getProductsById to get product name by product ID
const getProductsById = (productId) => {
  const productName = products.find((m) => m.productID === productId).name;
  return productName;
};

// function getProductsOrderedByCustomer to get name of products ordered by a customer
const getProductsOrderedByCustomer = (customerId) => {
  // get orders from the customer
  const custOrders = orders.filter((m) => m.customerID === customerId);

  // get product IDs of ordered products by the customer
  // orders.map ->
  const productIds = custOrders
    .map((m) => m.details.map((n) => n.productID))
    .flat();

  // get array with names of products listed up in productIds
  const productNames = [];
  // go through the productIds
  productIds.forEach((id) => {
    // push the product name got by getProductsById to array productNames
    productNames.push(getProductsById(id));
  });

  return productNames;
};

console.log(getProductsOrderedByCustomer("AROUT"));

// const custOrders = orders.filter((m) => m.customerID === "AROUT");
// console.log(custOrders.map((m) => m.details.map((n) => n.productID)).flat());

// const idArray = custOrders.map((m) => m.details.map((n) => n.productID)).flat();
