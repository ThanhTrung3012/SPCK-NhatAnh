document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("sign-up_form")

    if(registerForm) {
        registerForm.addEventListener("submit", function(event){
            event.preventDefault();

            // Lấy các gía trị từ ô input
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const cfpassword = document.getElementById("cfpassword").value;

            //Kiểm tra định dạng tk 
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Địa chỉ email không hợp lệ");
                return;
            }
            if (password !== cfpassword){
                alert("Mật khẩu không khớp");
                return;
            }
            if (password.length < 8) {
                aler("Mật khẩu cần ít nhất 8 ký tự");
                return;
            }
            if ( !(/[A-Z]/.test(password))) {
                alert("Mật khẩu cần chứ ít nhất 1 chữ cái viết hoa");
                return;
            }
            if ( !(/[0-9]/.test(password))) {
                alert("Mật khẩu cần chứa ít nhất 1 số");
                return;
            }
            // Kiểm tra tk đã tồn tại trong local chưa
            const storedEmail = localStorage.getItem("email")
            if ( storedEmail === email) {
                alert("Tài khoản đã tồn tại")
                return;
            }
            // Nếu đủ điều kiện đăng kí thì lưu trên local
            localStorage.setItem("email",email)
            localStorage.setItem("password",password)
            alert("Đăng ký thành công")
        })
    }
})