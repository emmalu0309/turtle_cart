// 初始化購物車
let cart = [];

// 添加商品到購物車
function addToCart(productName, productPrice) {
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity++;
    
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    updateCart();
    saveCartToLocalStorage(); // 保存購物車數據到 localStorage  
    // 執行添加到購物車的動畫
    animateAddToCart(); 
}


// 更新購物車顯示
function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const totalPriceElement = document.getElementById("totalPrice");

    cartItems.innerHTML = ""; // 清空當前購物車列表

    let totalPrice = 0;
    cart.forEach(item => {
        const itemElement = document.createElement("li");
        itemElement.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        cartItems.appendChild(itemElement);

        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `總價: $${totalPrice}`;
}

// 保存購物車數據 localStorage
function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// 頁面加載時從 localStorage 恢復數據庫資料
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// 初始化頁面時調用
loadCartFromLocalStorage();

function animateAddToCart() {
    const productImage = document.querySelector(".product-image");
    const cartIcon = document.querySelector(".cart-icon");

    const flyingImage = productImage.cloneNode(true);
    flyingImage.classList.add("flying-image");

    // 確認位置是否正確
    const productRect = productImage.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    console.log("商品圖片位置:", productRect);
    console.log("購物車圖標位置:", cartRect);

    // 動畫初始位置
    flyingImage.style.top = `${productRect.top}px`;
    flyingImage.style.left = `${productRect.left}px`;
    document.body.appendChild(flyingImage);

    // 最終位置
    setTimeout(() => {
        flyingImage.style.top = `${cartRect.top}px`;
        flyingImage.style.left = `${cartRect.left}px`;
        flyingImage.style.width = "20px";
        flyingImage.style.height = "20px";
        flyingImage.style.opacity = 0;
    }, 10);

    flyingImage.addEventListener("transitionend", () => {
        flyingImage.remove();
    });
}
