let container = document.querySelector(".containerz");
let cartContainer = document.querySelector(".cart-container");
let cartSummary = document.querySelector(".cart-summary");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const renderCartItem = async () => {
  const response = await fetch("../js/data.json");
  const data = await response.json();

  if (cart.length !== 0) {
    cartContainer.innerHTML = cart.map(itemCart => {
      let search = data.find(itemData => itemData.id === itemCart.id) || {};
      return `
        <div class="cart-part">
          <div class="cart-image">
            <img src="../images/${search.img}" alt="" width="50%">
          </div>
          <div class="cart-desc">
            <h3>${search.title}</h3>
          </div>
          <div class="cart-quanity">
            <input type="number" min="0" value="${itemCart.count}" id="${search.id}" onchange="update(${search.id})">
          </div>
          <div class="cart-price">
            <h4>$${search.price}</h4>
          </div>
          <div class="cart-total">
            <h4>$${(search.price * itemCart.count).toLocaleString()}</h4>
          </div>
          <div class="cart-remove">
            <button onclick="removeItem(${search.id})">Remove</button>
          </div>
        </div>
      `;
    }).join("");
  } else {
    container.innerHTML = `
      <div class="cart-emty text-center p-5">
        <h2>Your cart is empty</h2>
        <a href="../html/home.html">
          <button class="HomeBtn btn btn-primary mt-3">Back to home</button>
        </a>
      </div>
    `;
  }
  bindEvents();
};

const update = (id) => {
  let searchIndex = cart.findIndex(item => item.id === id);
  if (searchIndex !== -1) {
    let quantityElement = document.getElementById(id);
    if (quantityElement) {
      cart[searchIndex].count = parseInt(quantityElement.value) || 0;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartItem();
      totalProduct();
    }
  }
};

const totalProduct = async () => {
  const response = await fetch("../js/data.json");
  const data = await response.json();

  if (cart.length !== 0) {
    let total = cart.map(item => {
      let search = data.find(i => i.id === item.id) || {};
      return item.count * search.price;
    }).reduce((x, y) => x + y, 0);

    cartSummary.innerHTML = `
      <div class="product-total">
        <h2>Total Product: <span id="total">$${total.toLocaleString()}</span></h2>
      </div>
      <div class="product-checkout mt-3">
        <button type="button" class="btn btn-success" id="btnThanhToan">Thanh toán</button> 
      </div>
      <button class="removeAll btn btn-danger mt-2">Clear cart</button>
    `;
  }
  bindEvents();
};

const removeItem = (id) => {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartItem();
  totalProduct();
};

const bindEvents = () => {
  const btnThanhToan = document.getElementById("btnThanhToan");
  if (btnThanhToan) {
    btnThanhToan.addEventListener("click", () => {
      // Hiển thị modal
      const modal = new bootstrap.Modal(document.getElementById("modalThanhToanThanhCong"));
      modal.show();

      // Xóa giỏ hàng
      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      
      // Cập nhật giao diện
      renderCartItem();
      totalProduct();
    });
  }

  const clearBtn = document.querySelector(".removeAll");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartItem();
      totalProduct();
    });
  }
};

renderCartItem();
totalProduct();
