let cart = [];

const loadAllProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => displayProducts(data));
};

const displayProducts = (products) => {
  console.log("Displaying products...");
  const productContainer = document.querySelector(".shop");
  products.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <div>
        <img src="${product.image}" alt="" style="height: 150px; width: 150px;">
      </div>
      <h3>${product.title}</h3>
      <p>${product.description.slice(0, 150)}</p>
      <h2>$${product.price}</h2>
        <button onclick="addToCart(${product.id}, '${product.title}', ${
      product.price
    })" class="btn btn-primary">Add to cart</button>
        
        <button onclick="showDetails(${
          product.id
        })" class="btn btn-primary">Details</button>

    `;
    productContainer.appendChild(div);
  });
};

const addToCart = (id, title, price) => {
  const product = { id, title, price };
  cart.push(product);
  updateCartDisplay();
};

const updateCartDisplay = () => {
  const cartContainer = document.querySelector(".cart");
  cartContainer.innerHTML = `
    <h2>Cart (${cart.length} items)</h2>
    <ol>
      ${cart
        .map((item) => `<li>${item.title.slice(0, 30)} - $${item.price}</li>`)
        .join("")}
    </ol>
    <h3>Total: $${cart
      .reduce((total, item) => total + item.price, 0)
      .toFixed(2)}</h3>
  `;
};

const showDetails = async (productId) => {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${productId}`
    );
    const product = await response.json();
    console.log("Product details:", product);
    const modalContent = document.querySelector(".modal-content");
    modalContent.innerHTML = `
      <h2>${product.title}</h2>
      <img src="${product.image}" alt="${product.title}" style="height: 150px; width: 150px;">
      <p>${product.description}</p>
      <h2>$${product.price}</h2>
      <button onclick="closeModal()" class="btn btn-primary">Close</button>
    `;
    document.querySelector(".modal").style.display = "flex";
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
};

const closeModal = () => {
  document.querySelector(".modal").style.display = "none";
};

loadAllProducts();
