(A) This code implements a simple shopping cart system using JavaScript, allowing users to view products, add them to a cart, manage quantities, and like/unlike items.

Product Class

class Product {
constructor(id, name, price, image) {
this.id = id; // Sets the product ID
this.name = name; // Sets the product name
this.price = price; // Sets the product price
this.image = image; // Stores the image URL
this.liked = false; // Initializes the liked status to false
}
}
Class Declaration: Defines a class named Product.
Constructor: This method runs when creating a new Product instance, initializing its attributes.

(B) ShoppingCartItem Class

class ShoppingCartItem {
constructor(product, quantity) {
this.product = product; // Sets the associated product
this.quantity = quantity; // Sets the quantity of this product
}

totalPrice() {
return this.product.price \* this.quantity; // Calculates total price for this item
}
}

Class Declaration: Defines a class named ShoppingCartItem.
Constructor: Initializes the product and its quantity.
totalPrice Method: Returns the total price of the item by multiplying the product's price by the quantity.

(C) ShoppingCart Class

class ShoppingCart {
constructor() {
this.items = []; // Initializes an empty array for cart items
}
Class Declaration: Defines a class named ShoppingCart.
Constructor: Initializes the cart with an empty items array.

(D) Adding Items

addItem(product, quantity) {
const existingItem = this.items.find(
(item) => item.product.id === product.id // Checks if the item already exists in the cart
);
if (existingItem) {
existingItem.quantity += quantity; // If exists, update the quantity
} else {
this.items.push(new ShoppingCartItem(product, quantity)); // Otherwise, add new item
}
}

addItem Method:
Purpose: Adds a product to the cart.
Logic:
Checks if the product is already in the cart using find().
If found, it increases the quantity; if not, it creates a new ShoppingCartItem and pushes it to the items array.

(E) Removing Items

removeItem(productId) {
this.items = this.items.filter((item) => item.product.id !== productId); // Filters out the item by ID
}
removeItem Method:
Purpose: Removes an item from the cart.
Logic: Uses filter() to create a new array excluding the item with the specified product ID.

(F) Getting Total Price
getTotal() {
return this.items.reduce((total, item) => total + item.totalPrice(), 0); // Sums up total prices of items
}

(G) getTotal Method:
Purpose: Calculates the total price of all items in the cart.
Logic: Uses reduce() to sum the total prices of each item, invoking totalPrice() on each ShoppingCartItem.

(H) Displaying Items
displayItems() {
return this.items; // Returns the current items in the cart
}
displayItems Method:
Purpose: Returns the items array for displaying in the UI.

(I) Updating Item Quantity
updateItemQuantity(productId, newQuantity) {
const item = this.items.find((item) => item.product.id === productId); // Finds the item
if (item && newQuantity > 0) {
item.quantity = newQuantity; // Updates quantity if valid
} else {
this.removeItem(productId); // Removes item if quantity is zero or invalid
}
}
}

updateItemQuantity Method:
Purpose: Updates the quantity of a specific product.
Logic:
Finds the item by product ID.
If found and the new quantity is valid, it updates the quantity; otherwise, it removes the item.

(J) Global Variables

let cart = null; // Initializes cart variable
let products = []; // Array for user-created products
let presetProducts = []; // Array for preset products

Purpose: Declares variables to hold the current cart and lists of products.

(K) Loading Preset Products
function loadPresetProducts() {
const presetData = [
// Array of preset product objects with id, name, price, and image
];

presetData.forEach((data) => {
const product = new Product(data.id, data.name, data.price, data.image); // Creates product instance
presetProducts.push(product); // Adds to preset products
addPresetProductToList(product); // Displays the product
});
}

loadPresetProducts Function:
Purpose: Loads predefined products into the application.
Logic: Iterates over presetData, creates Product instances, adds them to presetProducts, and displays them.

(L) Adding Products to Display
function addPresetProductToList(product) {
const productDiv = document.createElement("div"); // Creates a new div for the product
productDiv.classList.add("product"); // Adds class for styling
productDiv.innerHTML = `      ${product.image ?`<img src="${product.image}" alt="${product.name}" />`: ""}
      <span>${product.name} -<span class="text-success"> $${product.price.toFixed(2)}</span>
      <div>
          <button onclick="addToCart('${product.id}')">Add to Cart</button>
          <button onclick="likeProduct('${product.id}')">${product.liked ? "Unlike" : "Like"}</button>
      </div>
 `;
document.getElementById("presetProductList").appendChild(productDiv); // Appends the product div to the display
}
addPresetProductToList Function:
Purpose: Displays a product in the UI.
Logic:
Creates a div, populates it with product details, and includes buttons for adding to the cart and liking/unliking.
Appends this div to an element with ID presetProductList.

(M) Creating a Shopping Cart
function createShoppingCart() {
cart = new ShoppingCart(); // Initializes a new ShoppingCart
document.getElementById("productCreation").style.display = "block"; // Shows product creation UI
document.getElementById("cart").style.display = "block"; // Shows cart UI
alert("Shopping cart created!"); // Alerts the user
}

createShoppingCart Function:
Purpose: Initializes the shopping cart and displays relevant UI sections.
Logic: Sets up a new ShoppingCart instance and changes the visibility of UI elements.

(N) Creating a Product

function createProduct() {
const id = document.getElementById("productId").value; // Retrieves input values
const name = document.getElementById("productName").value;
const price = parseFloat(document.getElementById("productPrice").value); // Parses price to float
const imageInput = document.getElementById("productImage");
const image = imageInput.files.length > 0 ? URL.createObjectURL(imageInput.files[0]) : ""; // Handles image upload

if (!id || !name || isNaN(price)) { // Validates input
alert("Please fill in all fields correctly."); // Alerts if invalid
return; // Exits function if invalid
}

const product = new Product(id, name, price, image); // Creates new product
products.push(product); // Adds to user products
addProductToList(product); // Displays the new product

// Clear input fields
document.getElementById("productId").value = "";
document.getElementById("productName").value = "";
document.getElementById("productPrice").value = "";
imageInput.value = ""; // Clears image input
}

createProduct Function:
Purpose: Creates a new product based on user input.
Logic:
Gathers values from input fields, validates them, and creates a new Product instance.
Adds the product to the list and clears the input fields.

(O) Adding Created Product to Display

function addProductToList(product) {
const productDiv = document.createElement("div"); // Creates a div for the product
productDiv.classList.add("product"); // Adds class for styling
productDiv.innerHTML = `      ${product.image ?`<img src="${product.image}" alt="${product.name}" />`: ""}
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <div>
          <button onclick="addToCart('${product.id}')">Add to Cart</button>
          <button onclick="likeProduct('${product.id}')">${product.liked ? "Unlike" : "Like"}</button>
      </div>
 `;
document.getElementById("presetProductList").appendChild(productDiv); // Appends product div to the display
}

addProductToList Function:
Purpose: Similar to addPresetProductToList, but for user-created products.
Logic: Displays the created product with its details and action buttons.

(P) Adding to Cart
function addToCart(productId) {
const product = products.find((p) => p.id === productId) || presetProducts.find((p) => p.id === productId); // Finds product
const quantity = 1; // Default quantity is now 1
if (product) {
cart.addItem(product, quantity); // Adds item to cart
displayCart(); // Updates cart display
alert(`Added ${product.name} to the cart.`); // Alerts user
} else {
alert("Product not found."); // Alerts if product doesn't exist
}
}

addToCart Function:
Purpose: Adds a product to the shopping cart.
Logic: Searches for the product in either the user or preset lists. If found, it adds it to the cart and updates the display.

(Q) Liking/Unliking a Product

function likeProduct(productId) {
const product = products.find((p) => p.id === productId) || presetProducts.find((p) => p.id === productId); // Finds product
if (product) {
product.liked = !product.liked; // Toggles the liked status
document.getElementById("presetProductList").innerHTML = ""; // Clears the list to re-render
presetProducts.forEach(addPresetProductToList); // Re-adds preset products
products.forEach(addProductToList); // Re-adds created products
}
}

likeProduct Function:
Purpose: Toggles the liked status of a product.
Logic: Finds the product and changes its liked status. It then refreshes the displayed product list.

(R) Displaying Cart Items
function displayCart() {
const cartItemsDiv = document.getElementById("cartItems");
cartItemsDiv.innerHTML = ""; // Clears previous cart items

if (!cart || cart.items.length === 0) {
cartItemsDiv.innerHTML = "Your cart is empty."; // Displays message if cart is empty
return;
}

const items = cart.displayItems(); // Retrieves current cart items
let cartContents = "";
items.forEach((item) => {
cartContents += `         <div class="cart-item">
              <span>${item.product.name}</span> 
              <span><span class="text-success">$${item.product.price.toFixed(2)}</span>
              <div class="quantity-controls">
                  <button onclick="updateQuantity('${item.product.id}', -1)">-</button> 
                  <span>${item.quantity}</span> 
                  <button onclick="updateQuantity('${item.product.id}', 1)">+</button> // Increases quantity
              </div>
          </div>
  `;
});
cartItemsDiv.innerHTML = cartContents; // Updates the cart display
}

displayCart Function:
Purpose: Displays the contents of the shopping cart.
Logic:
Clears the previous display and checks if the cart is empty. If so, it shows a message.
If not empty, it builds the HTML for each cart item and displays it.
Summary
This code defines a simple shopping cart system that allows users to create products, manage their cart, and toggle the liked status of products. Each method has a specific role in managing product data, updating the cart, and interacting with the user interface.
