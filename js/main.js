const detailContainer = document.querySelector('.content');
const cartIcon = document.querySelector('.cart');

const getDetailProduct = async () => {
    const path = new URLSearchParams(window.location.search);
    const productId = path.get('id');

    const response = await fetch('../js/data.json');
    const data = await response.json();

    const findProductId = data.find(item => item.id.toString() === productId.toString());

    detailContainer.innerHTML = `
        <div class="content-left">
            <section>
                <img src="${findProductId.img}" alt="${findProductId.title}" width="80%">
            </section>
        </div>
        <div class="content-right">
            <aside>
                <div class="ten"><strong>${findProductId.title}</strong></div>
                <div class="mota">${findProductId.description}</div>
                <div class="price"><strong>Price: </strong>${findProductId.price}đ</div>
            </aside>
        </div>
        <footer>
            <button class="add-to-cart-btn" id="addcart">Thêm vào giỏ</button>
        </footer>
    `;

    // Gán sự kiện sau khi nút được tạo
    const btnAddCart = document.querySelector('#addcart');

    if (btnAddCart) {
        btnAddCart.addEventListener('click', () => {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            const itemIndex = cart.findIndex(item => item.id === findProductId.id);
            if (itemIndex !== -1) {
                cart[itemIndex].count += 1;
            } else {
                cart.push({
                    id: findProductId.id,
                    count: 1
                });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            setCartItem();
            alert('Đã thêm sản phẩm vào giỏ hàng!');
        });
    } else {
        console.error('Add to Cart button not found!');
    }
}

const setCartItem = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    if (cart && cart.length > 0) {
        const totalCount = cart.reduce((sum, item) => sum + item.count, 0); // Tính tổng số lượng

        cartIcon.innerHTML = `
            <p class="cart-item cart-count">${totalCount}</p>
            <i class="fa fa-shopping-bag"></i>
        `;
    }
};


setCartItem();
getDetailProduct();
