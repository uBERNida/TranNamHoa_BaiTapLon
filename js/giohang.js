const productGrid = document.querySelector('.product-grid');

// Xóa toàn bộ sản phẩm hiện có trước khi thêm mới
productGrid.innerHTML = '';

const getData = async () => {
    try {
        
        const response = await fetch('../js/data.json');
        const data = await response.json();

        if(data && data.length > 0) {
            // Chỉ lấy 4 sản phẩm đầu tiên (phòng trường hợp JSON có nhiều hơn 4)
            const productsToShow = data.slice(0, 4);
            
            productsToShow.forEach(item => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <div class="product-img">
                        <img src="${item.img}" alt="${item.title}">
                        ${item.sale ? `<span class="sale-badge">-${item.sale}%</span>` : ''}
                    </div>
                    <div class="product-info">
                        <span class="product-category">${item.category}</span>
                        <h3 class="product-title">${item.title}</h3>
                        <div class="product-price">$${item.price}</div>
                        <div class="product-rating">${'★'.repeat(item.rating || 4)}${'☆'.repeat(5-(item.rating || 4))}</div>
                        <div class="product-actions">
                            <a href="thongtinSP.html?id=${item.id}">
                                <button class="add-to-cart"
                                data-title="${item.title}"
                                data-price="${item.price}"
                                data-image="${item.img}">
                                Thêm vào giỏ
                            </button>
                            </a>
                            
                            <button class="wish-btn">♡</button>
                        </div>
                    </div>
                `;
                productGrid.appendChild(productCard);
            });
        }
        console.log(data);
    } catch (error) {
        console.error('Error loading products:', error);
    }
    
}
    
getData();

