const products = [
  {
    id: 1,
    name: "Macbook Air M4-A",
    price: 29900000,
    quantity: 1,
    image: "/img/Mac1.jpg",
    sold: "1.2k",
    rating: 5,
  },
  {
    id: 2,
    name: "iPhone 16 Plus 128GB",
    price: 21990000,
    quantity: 1,
    image: "https://cdn2.fptshop.com.vn/unsafe/750x0/filters:format(webp):quality(75)/iphone_16_plus_pink_9ea3233dfe.png",
    sold: "1.5k",
    rating: 5,
  },
  {
    id: 3,
    name: "AirPods 4",
    price: 5990000,
    quantity: 1,
    image: "https://cdn2.fptshop.com.vn/unsafe/750x0/filters:format(webp):quality(75)/tai_nghe_airpods_4_25feb1efc3.jpg",
    sold: "850",
    rating: 4,
  },
  {
    id: 4,
    name: "OPPO Reno14 F 5G",
    price: 10990000,
    quantity: 1,
    image: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/oppo_reno14_f_xanh_0a5b091f91.jpg",
    sold: "430",
    rating: 5,
  },
  {
    id: 5,
    name: "iPad Pro M4 11 inch",
    price: 28990000,
    quantity: 1,
    image: "https://cdn2.fptshop.com.vn/unsafe/750x0/filters:format(webp):quality(75)/2024_5_10_638509364503658668_ipad-pro-11-inch-m4-2024-bac.jpg",
    sold: "320",
    rating: 5,
  },

  // ➕ Thêm sản phẩm khác ở đây
];
localStorage.removeItem("products");
if (!localStorage.getItem("products")) {
  localStorage.setItem("products", JSON.stringify(products));
}

function getProducts() {
  return JSON.parse(localStorage.getItem("products") || "[]");
}

function renderProductsHome(productArray) {
  const container = document.getElementById("products-list");
  if (!container) return;
  container.innerHTML = "";

  productArray.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    // Nếu là sản phẩm id 4 → bọc bằng <a> để chuyển trang
    const isLink = product.id === 4;
    const wrapperStart = isLink ? `<a href="detail.html?id=${product.id}" style="text-decoration: none; color: inherit;">` : `<div>`;
    const wrapperEnd = isLink ? `</a>` : `</div>`;

    card.innerHTML = `
      ${wrapperStart}
        <img src="${product.image}" class="product-image" alt="${product.name}">
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">${product.price.toLocaleString()}₫</p>
          <p class="product-sold">${product.sold} đã bán</p>
          <div class="product-rating">
            ${"★".repeat(product.rating)}${"☆".repeat(5 - product.rating)}
          </div>
        </div>
      ${wrapperEnd}
      <div class="product-buttons">
        <button class="btn buy-btn" onclick="buyNow(${product.id}, '${product.name}', ${product.price})">
          <i class="fa-solid fa-bolt"></i><span>Mua</span>
        </button>
        <button class="btn cart-btn" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
          <i class="fa-solid fa-cart-plus"></i><span>Thêm</span>
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}
function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  let found = cart.find((item) => item.id === id);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  countCart();
  alert(`${name} đã được thêm vào giỏ hàng!`);
}

function buyNow(id, name, price) {
  addToCart(id, name, price);
  window.location.href = "cart.html";
}

function countCart() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartIcon = document.getElementById("cart-icon");
  if (cartIcon) {
    cartIcon.innerHTML = `<i class="fa-solid fa-cart-shopping"></i><span id='cart-qty'>${total}</span>`;
  }
}

window.onload = function () {
  renderProductsHome(getProducts());
  countCart();
};
document.getElementById("search").addEventListener("input", function (e) {
  const keyword = e.target.value.trim().toLowerCase();
  const products = getProducts();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(keyword)
  );

  renderProductsHome(filteredProducts);
});
