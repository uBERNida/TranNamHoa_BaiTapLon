

// const detailContainer = document.querySelector('.products');
// const getData = async () => {
//     const response = await fetch('../js/data.json');

//     const data = await response.json();

//     console.log(data)
// }
// getData();


const products = document.querySelector('.products');
const getData = async () => {
    const response = await fetch('../js/data.json');

    const data = await response.json();

    if (data) {
        products.innerHTML = data.map(item => {
            return `
                <div class="product-item">
                    <div class="product-img">
                        <img src="${item.img}" alt="">
                    </div>
                    <div class="product-info">
                        <h3>${item.title}</h3>
                        <p class="product-price">${item.price}</p>
                        <p>${item.rating}</p>
                        <a href="../html/thongtinSP.html?id=${item.id}" class="btn">View</a>
                    </div>
                </div>
            `;
        }).join('');
        
    }
}

getData();
