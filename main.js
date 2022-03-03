import { test } from "./test.js";
import { addParams } from "./test.js";
console.log(test);
console.log(addParams("nnn"));

// ##############################################################################

import { customers } from "./customers.js";
import { orders } from "./orders.js";
import { products } from "./products.js";

console.log(
  `There are ${customers.length} customers, ${orders.length} orders and ${products.length} products`
);

const title = (title) => {
  console.log(`

  === ${title} ===
  
  `);
};

// (1) display all company names of customers
title("(1) display all company names of customers");
customers.forEach((m) => console.log(m.companyName));

// (2) display **city - customerName**
title("(2) display **city - customerName**");
customers.forEach((m) => console.log(`${m.address.city} - ${m.companyName}`));

// (3) display **city - customerName** only for those from London
title("(3) display **city - customerName** only for those from London");
const customersInLondon = customers.filter((m) => m.address.city === "London");
customersInLondon.forEach((m) =>
  console.log(`${m.address.city} - ${m.companyName}`)
);

//(4) create function `displayCustomerOrders(customerId)` which returns a string the following information
/*
- `console.log(displayCustomerOrders('AROUT'));`
- returns Around the Horn (AROUT) has 14 orders
*/
title(
  "(4) create function `displayCustomerOrders(customerId)` which returns a string the following information"
);
const displayCustomerOrders = (customerId) => {
  const customer = customers.find((m) => m.customerID === customerId);
  const custOrders = orders.filter((m) => m.customerID === customerId);
  return `${customer.companyName} (${customerId}) has ${custOrders.length} orders`;
};

console.log(displayCustomerOrders("AROUT"));

const displayCustomerOrdersAndProductKinds = (customerId) => {
  const numOfProducts = orders
    .filter((m) => m.customerID === customerId)
    .reduce((sum, order) => {
      return sum + order.details.length;
    }, 0);

  return `${numOfProducts} products`;
};

console.log(displayCustomerOrdersAndProductKinds("AROUT"));

const displayCustomerOrdersAndProducts = (customerId) => {
  const numOfProducts = orders
    .filter((m) => m.customerID === customerId)
    .reduce((sum, order) => {
      sum += order.details.length;
      return sum;
    }, 0);
};

console.log(displayCustomerOrdersAndProducts("AROUT"));

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
title(
  "(5) create function `getCustomerOrderObject(customerId)` which returns an objects the following information:"
);

const getCustomerOrderObject = (customerId) => {
  const customer = customers.find((m) => m.customerID === customerId);
  const custOrders = orders.filter((m) => m.customerID === customerId);
  return {
    id: customerId,
    name: customer.companyName,
    orderIds: custOrders.map((m) => m.orderID),
  };
};
console.log(getCustomerOrderObject("AROUT"));

// (6) create function `getProductsOrderedByCustomer(customerId)` which returns an array of the names of products a customer has ordered:
/*
[
  'Valkoinen suklaa',
  'Guaraná Fantástica',
  'Ravioli Angelo',
  ...
]
*/

title(
  "(6) create function `getProductsOrderedByCustomer(customerId)` which returns an array of the names of products a customer has ordered:"
);

// function getProductsById to get product name by product ID
const getProductById = (productId) => {
  const productName = products.find((m) => m.productID === productId).name;
  return productName;
};

// function getProductsOrderedByCustomer to get name of products ordered by a customer
const getProductsOrderedByCustomer = (customerId) => {
  // find customer
  const customer = customers.find((m) => m.customerID === customerId);
  // filter orders by customer
  const custOrders = orders.filter((m) => m.customerID === customerId);
  // get product IDs of ordered products by the customer
  const productIds = custOrders
    .map((order) => order.details.map((detail) => detail.productID))
    .flat();

  // get array with names of products listed up in productIds
  const orderedProducts = [];
  productIds.forEach((id) => {
    orderedProducts.push(getProductById(id));
  });

  return {
    id: customerId,
    name: customer.companyName,
    orderedProducts,
  };
};

console.log(getProductsOrderedByCustomer("AROUT"));

// const custOrders = orders.filter((m) => m.customerID === "AROUT");
// console.log(custOrders.map((m) => m.details.map((n) => n.productID)).flat());

// const idArray = custOrders.map((m) => m.details.map((n) => n.productID)).flat();
