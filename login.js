// 用戶數據存取
const users = []; // 簡單的模擬數據

document.addEventListener("DOMContentLoaded", function () {
    // 初始載入購物車數量
    const cartLength = parseInt(localStorage.getItem("CartLength"), 10) || 0;
    document.getElementById("cartTotal").textContent = cartLength;

    // 監聽 storage 事件以同步更新
    window.addEventListener("storage", function (event) {
        if (event.key === "CartLength") {
            // 更新顯示的購物車總數
            document.getElementById("cartTotal").textContent = event.newValue || 0;
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const loginForm = document.getElementById("loginForm");
    const userInfoForm = document.getElementById("userInfoForm");
    const messageDiv = document.getElementById("message");

    if (isLoggedIn) {
        loginForm.style.display = "none";
        userInfoForm.style.display = "block";
        loadUserInfo(); // 加載會員資訊
    } else {
        loginForm.style.display = "block";
        userInfoForm.style.display = "none";
    }
});

function loadUserInfo() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
        document.getElementById("displayUsername").value = currentUser.username;
        document.getElementById("displayPassword").value = currentUser.password;
        document.getElementById("displayAddress").value = currentUser.address || '';
        document.getElementById("displayPhone").value = currentUser.phone || '';
        document.getElementById("displayEmail").value = currentUser.email || '';
        document.getElementById("displayName").value = currentUser.name || "";
    }
}


// 登入功能
document.getElementById('loginBtn').addEventListener('click', function () {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const messageDiv = document.getElementById('message');

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // 驗證用戶
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        localStorage.setItem('isLoggedIn', 'true'); // 設定登入狀態
        localStorage.setItem('currentUser', JSON.stringify(user)); // 儲存當前登入用戶
        window.location.href = "cart.html"; // 跳轉到購物車頁面
    } else {
        messageDiv.textContent = '帳號或密碼錯誤。';
    }
});

// 儲存會員修改後的資料
document.getElementById("saveBtn").addEventListener("click", function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
        currentUser.address = document.getElementById("displayAddress").value;
        currentUser.phone = document.getElementById("displayPhone").value;
        currentUser.email = document.getElementById("displayEmail").value;
        currentUser.password = document.getElementById("displayPassword").value;
        currentUser.name = document.getElementById("displayName").value;
        
        // 更新用戶資料
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        
        // 如果有多位用戶，更新整個 `users` 數組
        const users = JSON.parse(localStorage.getItem("users"));
        const updatedUsers = users.map(user => user.username === currentUser.username ? currentUser : user);
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        alert("會員資訊已更新！");
    }
});


// 登出功能
document.getElementById('logoutBtn').addEventListener('click', function () {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = "login.html"; // 返回登入頁面
});


