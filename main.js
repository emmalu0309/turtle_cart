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
