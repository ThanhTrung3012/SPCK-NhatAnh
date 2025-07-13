const products = [
    {
        id: 1,
        name: "Macbook Air M4-A",
        price: 299000,
        quantity: 1,
        image: "",
    },
    {
        id: 2,
        name: "Macbook Air M4-B",
        price: 399000,
        quantity: 1,
        image: "/img/Mac1.jpg",
    },
    {
        id: 3,
        name: "Macbook Air M4-C",
        price: 159000,
        quantity: 1,
        image: "/img/Mac1.jpg",
    },
    {
        id: 4,
        name: "Macbook Air M4-D",
        price: 499000,
        quantity: 1,
        image: "/img/MbAm2_3.webp",
    },
    {
        id: 5,
        name: "Macbook Air M4-E",
        price: 499000,
        quantity: 1,
        image: "/img/MbAm2_3.webp",
    },
    {
        id: 6,
        name: "Macbook Air M4-F",
        price: 499000,
        quantity: 1,
        image: "/img/MbAm2_3.webp",
    },
    {
        id: 7,
        name: "Macbook Air M4-G",
        price: 499000,
        quantity: 1,
        image: "/img/MbAm2_3.webp",
    },
    {
        id: 8,
        name: "Macbook Air M4-H",
        price: 499000,
        quantity: 1,
        image: "/img/MbAm2_3.webp",
    },
    {
        id: 9,
        name: "Macbook Air M4-I",
        price: 499000,
        quantity: 1,
        image: "/img/MbAm2_3.webp",
    },
    {
        id: 10,
        name: "Macbook Air M4-K",
        price: 499000,
        quantity: 1,
        image: "/img/MbAm2_3.webp",
    },
];
// Cart 
// Lưu sản phẩm mẫu vào localStorage nếu chưa có
if (!localStorage.getItem('products')) {
  localStorage.setItem('products', JSON.stringify(products));
}
function getProducts() {
  return JSON.parse(localStorage.getItem('products') || '[]');
}
 
// Lấy giỏ hàng từ localStorage hoặc khởi tạo mới
function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}
 
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
 
function updateQty(id, qty) {
  let cart = getCart();
  let item = cart.find(i => i.id === id);
  if (item) {
    item.qty = qty > 0 ? qty : 1;
  }
  saveCart(cart);
  renderCart();
}
 
function removeFromCart(id) {
  let cart = getCart().filter(item => item.id !== id);
  saveCart(cart);
  renderCart();
}
 
function clearCart() {
  localStorage.removeItem('cart');
  renderCart();
}
 
function renderCart() {
  let cart = getCart();

  let tbody = document.querySelector('#cart-table tbody');
  if (!tbody) return;

  tbody.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    let row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.price.toLocaleString()} đ</td>
      <td><input type="number" min="1" value="${item.qty}" onchange="updateQty(${item.id}, this.value)"></td>
      <td>${(item.price * item.qty).toLocaleString()} đ</td>
      <td><button onclick="removeFromCart(${item.id})">Xóa</button></td>
    `;
    tbody.appendChild(row);
    total += item.price * item.qty;
  });

  const totalElement = document.getElementById('cart-total');
  if (totalElement) {
    totalElement.textContent = total.toLocaleString();
  }
}

// Khởi tạo hiển thị sản phẩm và giỏ hàng khi tải trang
window.onload = function () {
    const cartTable = document.querySelector("#cart-table tbody");
    if (cartTable) {
        renderCart(); // chỉ gọi nếu có giỏ hàng
    }
};

