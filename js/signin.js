document.addEventListener("DOMContentLoaded",function() {
    const signinForm = document.getElementById("sign-in_form");

    if (signinForm){
        signinForm.addEventListener("submit", function(event) {
            event.preventDefault()
        // Ngăn hành động submit mặc định của form

        // Lấy giá trị của các input
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Lấy thông tin đăng ký từ local
        const signuppedEmail = document.getElementById("email").value;
        const signuppedPassword = document.getElementById("password").value;

        // Kiểm tra 
        if (email !== signuppedEmail || password !== signuppedPassword) {
            alert("Thông tin không chính xác");
            return;
        }

        // Thành công
        localStorage.setItem("isLogin",true);
        alert("Đăng nhập thành công")
        window.location.href = "./home.html"
        })

    }
})