// 初始化購物車
let cart = [];

// 添加商品到购物车
function addToCart(productName, productPrice) {
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    updateCart();
    saveCartToLocalStorage(); // 保存购物车数据到 localStorage
}

// 更新购物车显示
function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const totalPriceElement = document.getElementById("totalPrice");

    cartItems.innerHTML = ""; // 清空当前购物车列表

    let totalPrice = 0;
    cart.forEach(item => {
        const itemElement = document.createElement("li");
        itemElement.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        cartItems.appendChild(itemElement);

        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `總價: $${totalPrice}`;
}

// 保存购物车数据到 localStorage
function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// 页面加载时从 localStorage 恢复购物车数据
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// 初始化页面时调用
loadCartFromLocalStorage();
