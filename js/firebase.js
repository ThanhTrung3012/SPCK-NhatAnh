  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
  import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
  } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";
  const firebaseConfig = {
    apiKey: "AIzaSyC16tMnWPITM0zWMuurKv0nSQv_4T3g5I4",
    authDomain: "macbook-ae3ba.firebaseapp.com",
    projectId: "macbook-ae3ba",
    storageBucket: "macbook-ae3ba.firebasestorage.app",
    messagingSenderId: "970356112325",
    appId: "1:970356112325:web:c039d9165c39e6d4ac29ac",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  auth.languageCode = "en";
  const provider = new GoogleAuthProvider();

  const loginGG = document.getElementById("gg-signup-btn");
if (loginGG) {
  loginGG.addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        window.location.href = "/html/home.html";
      })
      .catch((error) => {
        console.error("Error signing in:", error);
      });
  });
}

  // Avatar 
  onAuthStateChanged(auth, (user) => {
    const currentPath = window.location.pathname;

    if (user) {
      // Nếu đang ở trang login mà đã đăng nhập → chuyển sang home
      if (currentPath === "/html/index.html") {
        window.location.href = "/html/home.html";
      } else {
        // Đã đăng nhập, hiển thị thông tin người dùng
        const name = user.displayName;
        const avatar = user.photoURL;

        const nameDiv = document.getElementById("name");
        if (nameDiv) {
          nameDiv.innerHTML = name;
        }
        const avatarImg = document.getElementById("avatar");
        if (avatarImg) {
          avatarImg.src = avatar;
          avatarImg.style.width = "30px";
          avatarImg.style.height = "30px";
          avatarImg.style.borderRadius = "50%";
          avatarImg.style.marginLeft = "10px";
        }

        const overlay = document.getElementById("overlay");
        if (overlay) {
          let opacity = 1;
          const interval = setInterval(() => {
            if (opacity <= 0) {
              clearInterval(interval);
              overlay.remove();
            } else {
              overlay.style.opacity = opacity;
              opacity -= 0.1;
            }
          }, 50);
        }
      }
    } else {
      // Nếu đang KHÔNG ở login.html → redirect về login
      if (currentPath !== "/html/index.html") {
        window.location.href = "/html/index.html";
      }
    }
  });
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      signOut(auth)
        .then(() => {
          window.location.href = "/html/index.html";
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
