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
