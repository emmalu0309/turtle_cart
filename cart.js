// 從 localStorage 加載購物車數據
function loadCartFromLocalStorage() {
    const cartItems = document.getElementById("cartItems");
    const totalPriceElement = document.getElementById("totalPrice");
    
    const savedCart = localStorage.getItem("cart");
    if (!savedCart) {
        cartItems.innerHTML = "<li>購物車為空</li>";
        totalPriceElement.textContent = "總價: $0";
        return;
    }
    
    const cart = JSON.parse(savedCart);
    let totalPrice = 0;

    cartItems.innerHTML = ""; // 清空當前購物車列表

    cart.forEach(item => {
        const itemElement = document.createElement("li");
        itemElement.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        cartItems.appendChild(itemElement);

        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `總價: $${totalPrice}`;
}

// 頁面加載
document.addEventListener("DOMContentLoaded", loadCartFromLocalStorage);

// 檢查本地儲存的購物車資料
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// 更新購物車並儲存到本地儲存
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// 將商品加入購物車
function addToCart(name, price) {
    let cart = getCart();
    let item = cart.find(product => product.name === name);
    if (item) {
        item.quantity += 1;  // 如果商品已存在，增加數量
    } else {
        cart.push({ name: name, price: price, quantity: 1 });  // 新增商品
    }
    saveCart(cart);
    alert(`${name} 已加入購物車`);
}

// 在 cart.html 顯示購物車內容
function displayCart() {
    let cart = getCart();
    let cartItems = document.getElementById("cartItems");
    let totalPrice = document.getElementById("totalPrice");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    totalPrice.textContent = `總價: $${total}`;
}

// 結帳按鈕點擊事件，檢查購物車是否有內容
document.getElementById("checkoutBtn").addEventListener("click", function() {
    let cart = getCart();
    if (cart.length === 0) {
        alert("購物車是空的，無法結帳！");
    } else {
        // 顯示寄送資料表單
        document.getElementById("shippingForm").style.display = "block";
    }
});

// 處理表單提交
document.getElementById("shippingInfoForm").addEventListener("submit", function(event) {
    event.preventDefault(); // 防止表單提交後刷新頁面

    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    // 新增訂單商品及價格的訊息
    const cart = getCart();
    let orderDetails = "訂單內容：\n";
    let total = 0;
    
    cart.forEach(item => {
        orderDetails += `${item.name} - $${item.price} x ${item.quantity}\n`;
        total += item.price * item.quantity;
    });
    
    orderDetails += `總價: $${total}`;

    // 顯示訂單確認訊息，包括訂單內容
    alert(`訂單已確認！\n姓名: ${name}\n地址: ${address}\n電話: ${phone}\n電子郵件: ${email}\n\n${orderDetails}`);

    // 清空表單並隱藏寄送資料表單
    document.getElementById("shippingInfoForm").reset();
    document.getElementById("shippingForm").style.display = "none";

    // 清空購物車
    localStorage.removeItem("cart");
    displayCart();
});

// 初始化購物車頁面
if (window.location.pathname.includes("cart.html")) {
    displayCart();
}
// 結帳按鈕點擊事件，檢查購物車是否有內容
document.getElementById("checkoutBtn").addEventListener("click", function() {
    let cart = getCart();
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn) {
        alert("請先登入才能結帳！");
        window.location.href = "login.html"; // 導向登入頁面
    } else if (cart.length === 0) {
        alert("購物車是空的，無法結帳！");
    } else {
        // 顯示寄送資料表單
        document.getElementById("shippingForm").style.display = "block";
    }
});

