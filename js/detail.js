function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  let found = cart.find((item) => item.id === id);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} đã được thêm vào giỏ hàng!`);
}

function buyNow(id, name, price) {
  addToCart(id, name, price);
  window.location.href = "cart.html";
}
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

