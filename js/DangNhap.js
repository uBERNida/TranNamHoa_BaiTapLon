



  const loginForm = document.getElementById('loginForm');
  const loginLink = document.getElementById('loginLink');

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Reset lỗi
    emailError.textContent = "";
    passwordError.textContent = "";

    let isValid = true;

    // Kiểm tra email
    if (!email) {
      emailError.textContent = "Email không được để trống";
      isValid = false;
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        emailError.textContent = "Email không hợp lệ";
        isValid = false;
      }
    }

    // Kiểm tra mật khẩu
    if (!password) {
      passwordError.textContent = "Mật khẩu không được để trống";
      isValid = false;
    }

    // Kiểm tra thông tin trong localStorage
    if (isValid) {
      const userData = JSON.parse(localStorage.getItem("users") || "{}");

      if (!userData[email] || userData[email] !== password) {
        passwordError.textContent = "Tài khoản hoặc mật khẩu không đúng";
        return;
      }

      // Thành công: ẩn modal, đổi nút đăng nhập
      const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
      modal.hide();
      localStorage.setItem("loggedInUser", email);
      showLoggedInUser(email);
    }
  });


  // Đăng ký
  const registerForm = document.getElementById('registerForm');
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value.trim();
    const confirmPassword = document.getElementById('regConfirmPassword').value.trim();

    const emailError = document.getElementById('regEmailError');
    const passwordError = document.getElementById('regPasswordError');
    const confirmPasswordError = document.getElementById('regConfirmPasswordError');

    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";

    let isValid = true;

    if (!email) {
      emailError.textContent = "Email không được để trống";
      isValid = false;
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        emailError.textContent = "Email không hợp lệ";
        isValid = false;
      }
    }
  
    if (!password) {
      passwordError.textContent = "Mật khẩu không được để trống";
      isValid = false;
    }

    if (password && confirmPassword !== password) {
      confirmPasswordError.textContent = "Mật khẩu nhập lại không khớp";
      isValid = false;
    }

    if (isValid) {
      // Lưu dữ liệu vào localStorage
      let users = JSON.parse(localStorage.getItem("users") || "{}");
      if (users[email]) {
        emailError.textContent = "Email đã được sử dụng";
        return;
      }

      users[email] = password;
      localStorage.setItem("users", JSON.stringify(users));

      // Ẩn modal đăng ký
      const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
      registerModal.hide();

      // Tự động mở lại modal đăng nhập, điền sẵn email
      const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
      document.getElementById('email').value = email;
      document.getElementById('password').value = "";
      loginModal.show();
    }
  });

  // Show mail đăng nhập
  function showLoggedInUser(email) {
  const authContainer = document.getElementById("authContainer");
  authContainer.innerHTML = `
    <span class="me-2 fw-bold text-success">${email}</span>
    <button id="logoutBtn" class="btn btn-sm btn-outline-danger">Đăng xuất</button>
  `;

  document.getElementById("logoutBtn").addEventListener("click", function () {
    // Đăng xuất
    authContainer.innerHTML = `
      <a href="#" id="loginLink" data-bs-toggle="modal" data-bs-target="#loginModal">Đăng nhập</a>
    `;

    // Reset form nếu muốn
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
    document.getElementById('emailError').textContent = "";
    document.getElementById('passwordError').textContent = "";
  });
}

// Load không mất
function showLoggedInUser(email) {
  const authContainer = document.getElementById("authContainer");
  authContainer.innerHTML = `
    <span class="me-2 fw-bold text-success">${email}</span>
    <a href="#" id="logoutLink" class="text-danger">Đăng xuất</a>
  `;

  document.getElementById("logoutLink").addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("loggedInUser");

    // Hiện lại nút đăng nhập
    authContainer.innerHTML = `
      <a href="#" id="loginLink" data-bs-toggle="modal" data-bs-target="#loginModal">Đăng nhập</a>
    `;

    // Reset form đăng nhập
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
    document.getElementById('emailError').textContent = "";
    document.getElementById('passwordError').textContent = "";
  });
}
window.addEventListener("DOMContentLoaded", function () {
  const currentUser = localStorage.getItem("loggedInUser");
  if (currentUser) {
    showLoggedInUser(currentUser);
  }
});
