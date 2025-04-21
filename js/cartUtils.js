function setCartItem() {
    const cartIcon = document.querySelector('.cart');
    const cart = JSON.parse(localStorage.getItem('cart'));

    if (cart && cart.length > 0) {
        const totalCount = cart.reduce((sum, item) => sum + item.count, 0);
        cartIcon.innerHTML = `
            <p class="cart-item cart-count">${totalCount}</p>
            <i class="fa fa-shopping-bag"></i>
        `;
    }
}
