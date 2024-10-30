// 初始化購物車
let cart = [];

// 添加商品到購物車並觸發動畫
function addToCart(productName, productPrice) {
    
     // 執行添加到購物車的動畫
     animateAddToCart();

    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    updateCart();
    saveCartToLocalStorage(); // 保存購物車數據到 localStorage

   
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

// 保存購物車數據到 localStorage
function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// 頁面加載時從 localStorage 恢復購物車資料
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// 初始化頁面時調用
loadCartFromLocalStorage();

// 動畫效果：將商品圖片飛入購物車
function animateAddToCart() {
    const productImage = document.querySelector(".product-image"); // 假設商品圖片有該類別
    const cartIcon = document.querySelector(".cart-icon");

    const flyingImage = productImage.cloneNode(true);
    flyingImage.classList.add("flying-image");
    document.body.appendChild(flyingImage);

    // 取得商品圖片和購物車圖標的位置
    const productRect = productImage.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    // 設置飛行圖片的初始位置
    flyingImage.style.position = "absolute";
    flyingImage.style.top = `${productRect.top + window.scrollY}px`; // 考慮頁面滾動
    flyingImage.style.left = `${productRect.left + window.scrollX}px`;
    flyingImage.style.width = `${productRect.width}px`;
    flyingImage.style.height = `${productRect.height}px`;
    flyingImage.style.transition = "all 1s ease-in-out";

    // 延遲一段時間以觸發動畫
    setTimeout(() => {
        flyingImage.style.top = `${cartRect.top + window.scrollY}px`;
        flyingImage.style.left = `${cartRect.left + window.scrollX}px`;
        flyingImage.style.width = "20px";
        flyingImage.style.height = "20px";
        flyingImage.style.opacity = 0;
    }, 10);

    // 動畫結束後移除飛行圖片
    flyingImage.addEventListener("transitionend", () => {
        flyingImage.remove();
    });
}
