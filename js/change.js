const container = document.getElementById("container");
const toSignIn = document.getElementById("switch-to-signin");
const toSignUp = document.getElementById("switch-to-signup");

toSignIn?.addEventListener("click", function (e) {
  e.preventDefault();
  container.classList.remove("active");
});

toSignUp?.addEventListener("click", function (e) {
  e.preventDefault();
  container.classList.add("active");
});