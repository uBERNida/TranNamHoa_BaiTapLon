// Hiển thị thông tin người dùng đã đăng nhập
function showLoggedInUser(email) {
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  const fullname = users[email]?.fullname || email;

  // Cập nhật nội dung hiển thị
  const accountName = document.getElementById("accountname");
  if (accountName) {
    accountName.textContent = fullname;
  }

  // Tạo link đăng xuất nếu chưa có
  if (!document.getElementById("logoutLink")) {
    const logoutLink = document.createElement("a");
    logoutLink.href = "#";
    logoutLink.id = "logoutLink";
    logoutLink.textContent = "Đăng xuất";
    logoutLink.classList.add("ms-2", "text-danger", "text-decoration-none");

    // Thêm link ngay sau phần tài khoản
    const headerAccount = document.querySelector(".header-account");
    headerAccount?.insertAdjacentElement("afterend", logoutLink);

    logoutLink.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("loggedInUser");

      // Reset lại giao diện
      if (accountName) {
        accountName.textContent = "Tài khoản";
      }

      logoutLink.remove(); // Xóa nút đăng xuất
    });
  }
}

// Xử lý khi submit form đăng nhập
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    emailError.textContent = "";
    passwordError.textContent = "";

    let isValid = true;

    if (!email) {
      emailError.textContent = "Email không được để trống";
      isValid = false;
    }

    if (!password) {
      passwordError.textContent = "Mật khẩu không được để trống";
      isValid = false;
    }

    if (isValid) {
      const users = JSON.parse(localStorage.getItem("users") || "{}");
      const user = users[email];

      if (!user || user.password !== password) {
        passwordError.textContent = "Tài khoản hoặc mật khẩu không đúng";
        return;
      }

      const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
      modal?.hide();

      localStorage.setItem("loggedInUser", email);
      showLoggedInUser(email);
    }
  });
}

// Load lại vẫn giữ trạng thái đăng nhập
window.addEventListener("DOMContentLoaded", function () {
  const currentUser = localStorage.getItem("loggedInUser");
  if (currentUser) {
    showLoggedInUser(currentUser);
  }
});
