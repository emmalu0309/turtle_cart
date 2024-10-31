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
    if (cartItems != null) {
        cartItems.innerHTML = ""; // 清空當前購物車列表
    }

    cart.forEach(item => {
        const itemElement = document.createElement("li");
        itemElement.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        cartItems.appendChild(itemElement);

        totalPrice += item.price * item.quantity;
    });

    if (totalPriceElement != null) {
        totalPriceElement.textContent = `總價: $${totalPrice}`;
    }
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

// 結帳按鈕點擊事件，檢查購物車是否有內容
document.getElementById("checkoutBtn")?.addEventListener("click", function () {

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (isLoggedIn) {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser && cart.length != 0) {
            // 顯示會員資訊表單並填入資料
            document.getElementById("userInfo").style.display = "block";
            document.getElementById("displayName").value = currentUser.name || "";
            document.getElementById("displayAddress").value = currentUser.address || "";
            document.getElementById("displayPhone").value = currentUser.phone || "";
            document.getElementById("displayEmail").value = currentUser.email || "";
            document.getElementById("displayUsername").value = currentUser.username;
            document.getElementById("displayPassword").value = currentUser.password;
        }
    } else {
        alert("請先登入以查看您的會員資訊");
        window.location.href = "login.html"; // 跳轉到登入頁面
    }
    
});

// 處理表單提交
document.getElementById("userForm")?.addEventListener("submit", function (event) {
    event.preventDefault(); // 防止表單提交後刷新頁面

    const name = document.getElementById("displayName").value;
    const address = document.getElementById("displayAddress").value;
    const phone = document.getElementById("displayPhone").value;
    const email = document.getElementById("displayEmail").value;
 

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
    // document.getElementById("shippingInfoForm").reset();
    document.getElementById("userInfo").style.display = "none";

    // 清空購物車
    localStorage.removeItem("cart");
    displayCart();

    //更新會員資料
    const updatedUser = {
        address: document.getElementById("displayAddress").value,
        phone: document.getElementById("displayPhone").value,
        email: document.getElementById("displayEmail").value,
        name: document.getElementById("displayName").value,
        password: document.getElementById("displayPassword").value,
        username: document.getElementById("displayUsername").value
    };

    // 更新 currentUser 資料並儲存到 localStorage
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    // 更新 users 列表
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map(user => user.username === updatedUser.username ? updatedUser : user);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

});

// 初始化購物車頁面
if (window.location.pathname.includes("cart.html")) {
    displayCart();
}

document.addEventListener("DOMContentLoaded", displayCart);

function displayCart() {
    let cart = getCart();
    let cartItems = document.getElementById("cartItems");
    let totalPrice = document.getElementById("totalPrice");

    console.log(cart.length);
    let cartLength = cart.length;
    document.getElementById("cartTotal").textContent = cartLength;
    localStorage.setItem("CartLength", cartLength);


    if (cartItems != null) {
        cartItems.innerHTML = ""; // 清空當前購物車列表
    }
    let total = 0;

    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price} x ${item.quantity} `;

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "刪除";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", function () {
            removeFromCart(index);
        });

        li.appendChild(deleteButton);
        cartItems.appendChild(li);

        total += item.price * item.quantity;

    });
    if (totalPrice != null) {
        totalPrice.textContent = `總價: $${total}`;
    }

}

function removeFromCart(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    displayCart();
}






