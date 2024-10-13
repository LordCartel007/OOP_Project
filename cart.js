// Product class to store id, name, price, and image
class Product {
  constructor(id, name, price, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image; // Store the image URL
    this.liked = false; // To track if the product is liked
  }
}

// ShoppingCartItem class to store a product and its quantity
class ShoppingCartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  totalPrice() {
    return this.product.price * this.quantity;
  }
}

// ShoppingCart class to manage cart items
class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(product, quantity) {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push(new ShoppingCartItem(product, quantity));
    }
  }

  removeItem(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
  }

  getTotal() {
    return this.items.reduce((total, item) => total + item.totalPrice(), 0);
  }

  displayItems() {
    return this.items;
  }

  updateItemQuantity(productId, newQuantity) {
    const item = this.items.find((item) => item.product.id === productId);
    if (item && newQuantity > 0) {
      item.quantity = newQuantity;
    } else {
      this.removeItem(productId);
    }
  }
}

// Global variables
let cart = null;
let products = [];
let presetProducts = [];

// Load preset products on page load
// creating on page product
function loadPresetProducts() {
  const presetData = [
    {
      id: "2982",
      name: "Tesla Cybertruck",
      price: 95000.0,
      image:
        "https://www.motortrend.com/uploads/sites/5/2019/11/Tesla-Cybertruck-Electric-Pickup-with-Extendable-Ramps-and-Tesla-ATV.jpg",
    },
    {
      id: "2192",
      name: "Bugatti Type 57SC Atlantic",
      price: 35000000.0,
      image:
        "https://wheelz.me/wp-content/uploads/2015/09/csm_03_Bugatti_Vision_GT_Pebble_Beach_Concept_Lawn_59336c0894.jpg",
    },
    {
      id: "3271",
      name: "Lamborghini Aventador 2024",
      price: 2000000.0,
      image:
        "https://www.exoticcarhacks.com/wp-content/uploads/2024/02/uFcbfiuL-scaled.jpeg",
    },
    {
      id: "4",
      name: "	Lamborghini Revuelto 2025",
      price: 4500000.0,
      image:
        "https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?cs=srgb&dl=pexels-adrian-dorobantu-989175-2127733.jpg&fm=jpg",
    },
  ];

  // for each created product
  presetData.forEach((data) => {
    const product = new Product(data.id, data.name, data.price, data.image);
    presetProducts.push(product);
    addPresetProductToList(product);
  });
}

// Add preset product to the displayed list
function addPresetProductToList(product) {
  const productDiv = document.createElement("div");
  productDiv.classList.add("product");
  productDiv.innerHTML = `
      ${
        product.image
          ? `<img src="${product.image}" alt="${product.name}" />`
          : ""
      }
      <span>${
        product.name
      } -<span class="text-success"> $${product.price.toFixed(2)}</span>
      <div>
          <button onclick="addToCart('${product.id}')">Add to Cart</button>
          <button onclick="likeProduct('${product.id}')">${
    product.liked ? "Unlike" : "Like"
  }</button>
      </div>
  `;
  document.getElementById("presetProductList").appendChild(productDiv);
}

// Create a shopping cart
function createShoppingCart() {
  cart = new ShoppingCart();
  document.getElementById("productCreation").style.display = "block";
  document.getElementById("cart").style.display = "block";
  alert("Shopping cart created!");
}

// Create a product
function createProduct() {
  const id = document.getElementById("productId").value;
  const name = document.getElementById("productName").value;
  const price = parseFloat(document.getElementById("productPrice").value);
  const imageInput = document.getElementById("productImage");
  const image =
    imageInput.files.length > 0 ? URL.createObjectURL(imageInput.files[0]) : "";

  if (!id || !name || isNaN(price)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  const product = new Product(id, name, price, image);
  products.push(product);
  addProductToList(product);

  // Clear input fields
  document.getElementById("productId").value = "";
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  imageInput.value = ""; // Clear image input
}

// Add the created product to the displayed list
function addProductToList(product) {
  const productDiv = document.createElement("div");
  productDiv.classList.add("product");
  productDiv.innerHTML = `
      ${
        product.image
          ? `<img src="${product.image}" alt="${product.name}" />`
          : ""
      }
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <div>
          <button onclick="addToCart('${product.id}')">Add to Cart</button>
          <button onclick="likeProduct('${product.id}')">${
    product.liked ? "Unlike" : "Like"
  }</button>
      </div>
  `;
  document.getElementById("presetProductList").appendChild(productDiv);
}

// Add to cart
function addToCart(productId) {
  const product =
    products.find((p) => p.id === productId) ||
    presetProducts.find((p) => p.id === productId);
  const quantity = 1; // Default quantity is now 1
  if (product) {
    cart.addItem(product, quantity);
    displayCart(); // Update the cart display
    alert(`Added ${product.name} to the cart.`);
  } else {
    alert("Product not found.");
  }
}

// Like or unlike a product
function likeProduct(productId) {
  const product =
    products.find((p) => p.id === productId) ||
    presetProducts.find((p) => p.id === productId);
  if (product) {
    product.liked = !product.liked; // Toggle the liked status
    document.getElementById("presetProductList").innerHTML = ""; // Clear the list to re-render
    presetProducts.forEach(addPresetProductToList); // Re-add preset products
    products.forEach(addProductToList); // Re-add created products
  }
}

// Display cart items
function displayCart() {
  const cartItemsDiv = document.getElementById("cartItems");
  cartItemsDiv.innerHTML = ""; // Clear previous cart items

  if (!cart || cart.items.length === 0) {
    cartItemsDiv.innerHTML = "Your cart is empty.";
    return;
  }

  const items = cart.displayItems();
  let cartContents = "";
  items.forEach((item) => {
    cartContents += `
          <div class="cart-item">
              <span>${item.product.name}</span>
              <span><span class="text-success">$${item.product.price.toFixed(
                2
              )}</span>
              <div class="quantity-controls">
                  <button onclick="updateQuantity('${
                    item.product.id
                  }', -1)">-</button>
                  <span>${item.quantity}</span>
                  <button onclick="updateQuantity('${
                    item.product.id
                  }', 1)">+</button>
              </div>
              <span>Total: $${item.totalPrice().toFixed(2)}</span>
              <button onclick="removeFromCart('${
                item.product.id
              }')">Remove</button>
          </div>
      `;
  });

  const total = cart.getTotal();
  cartContents += `<div class="cart-item"><strong>Total: $${total.toFixed(
    2
  )}</strong></div>`;
  cartItemsDiv.innerHTML = cartContents;
}

// Update item quantity in the cart
function updateQuantity(productId, change) {
  const item = cart.items.find((item) => item.product.id === productId);
  if (item) {
    const newQuantity = item.quantity + change;
    cart.updateItemQuantity(productId, newQuantity);
    displayCart(); // Refresh the cart display
  }
}

// Remove from cart
function removeFromCart(productId) {
  cart.removeItem(productId);
  displayCart(); // Refresh the cart display
}

// Load preset products on page load
window.onload = loadPresetProducts;
