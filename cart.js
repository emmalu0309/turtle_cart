//從localStorage 加載購物車數據
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

// 結帳功能
function checkout() {
    let cart = getCart();
    if (cart.length === 0) {
        alert("購物車是空的！");
        return;
    }

    let messageDiv = document.getElementById("checkoutMessage");
    messageDiv.textContent = "結帳成功！感謝您的購買。";

    localStorage.removeItem("cart");  // 清空購物車
    displayCart();
}

// 初始化購物車頁面
if (window.location.pathname.includes("cart.html")) {
    displayCart();
}

document.getElementById("checkoutBtn").addEventListener("click", function() {
    // 顯示寄送資料表單
    document.getElementById("shippingForm").style.display = "block";
});

// 處理表單提交
document.getElementById("shippingInfoForm").addEventListener("submit", function(event) {
    event.preventDefault(); // 防止表單提交後刷新頁面

    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    // 在此處可以添加保存或發送訂單資料的代碼
    alert(`訂單已確認！\n${cart} 姓名: ${name}\n地址: ${address}\n電話: ${phone}\n電子郵件: ${email}`);

    // 清空表單並隱藏寄送資料表單
    document.getElementById("shippingInfoForm").reset();
    document.getElementById("shippingForm").style.display = "none";
});


