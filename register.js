const users = JSON.parse(localStorage.getItem('users')) || [];

// 註冊功能
document.getElementById('registerBtn').addEventListener('click', function () {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const messageDiv = document.getElementById('message');

    // 檢查帳號是否重複
    if (users.find(user => user.username === username)) {
        messageDiv.textContent = '帳號重複，請選擇其他帳號名稱';
        return;
    }

    // 註冊用戶
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users)); // 確保用戶數據存儲
    messageDiv.textContent = '註冊成功，請登入';
    setTimeout(() => {
        window.location.href = "login.html"; // 跳轉到登入頁面
    }, 1000); // 1秒後跳轉
});

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
