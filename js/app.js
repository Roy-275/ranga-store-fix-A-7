// Load data from the api
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");

    // set inner html of single product div
    div.innerHTML = `
      <div class="single-product bg-danger">
        <div>
          <img class="product-image" src=${image}></img>
        </div>
        <h3>${product.title}</h3>
        <p>Category: ${product.category}</p>
        <h2>Price: $ ${product.price}</h2>
        <h4 class="text-info"> Rating: ${product.rating.rate} <br> Total rated: ${product.rating.count}</h4>
        <button onclick="addToCart(${product.id},${product.price}), updateTotal()" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
        <button onclick="getDetails(${product.id})" id="details-btn" class="btn btn-danger">Details</button>
      </div>`;
    document.getElementById("all-products").appendChild(div);
  }
};

// count the number of products and show in the cart
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

// Get details of the products 
const getDetails = productId => {
  const url = `https://fakestoreapi.com/products/${productId}`;
  fetch(url)
    .then(response => response.json())
    .then(data => showDetails(data))
}

// showing product details to the UI
const showDetails = details => {
  const detailsContainer = document.getElementById('product-details');
  detailsContainer.innerHTML = ``;
  const cartContainer = document.getElementById('my-cart');
  cartContainer.style.marginTop = '-400px';
  const div = document.createElement('div');
  div.innerHTML = `
  <div class="flexbox">
    <img src="${details.image}" width="300px"/>
    <div class="text-details">
     <h2 class="title">${details.title}</h2><br><br>
     <p>
     <h4><b>Category:</b> ${(details.category).toUpperCase()}</h4><br>
     <h4><b>Description:</b> ${details.description}</h4>
     </p>
    </div>
  </div>
    `;
  detailsContainer.appendChild(div);
}

// get input value from the product id
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = parseFloat(convertedOldPrice) + parseFloat(convertPrice);
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");

  // if cost goes over 200 dollar
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", (priceConverted * 0.2).toFixed(2));
  }

  // if cost goes over 400 dollar
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", (priceConverted * 0.3).toFixed(2));
  }

  // if cost goes over 500 dollar
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", (priceConverted * 0.4).toFixed(2));
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};