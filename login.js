// 用戶數據存取
const users = []; // 簡單的模擬數據

// 註冊功能
document.getElementById('registerBtn').addEventListener('click', function() {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const messageDiv = document.getElementById('message');

    // 簡單的註冊重複檢查
    if (users.find(user => user.username === username)) {
        messageDiv.textContent = '帳號重複，請選擇其他帳號名稱';
        return;
    }

    // 註冊用戶
    users.push({ username, password });
    messageDiv.textContent = '註冊成功，請登入';

    // 清空註冊表單
    document.getElementById('register').reset();

    // 延遲切換到登入畫面
    setTimeout(() => {
        document.getElementById('registerForm').style.display = 'none'; // 隱藏註冊表單
        document.getElementById('loginForm').style.display = 'block'; // 顯示登入表單
        messageDiv.textContent = ''; // 清空消息
    }, 1000); // 1秒後切换
});

// 登入功能
document.getElementById('loginBtn').addEventListener('click', function() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const messageDiv = document.getElementById('message');

    // 驗證用戶
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        // messageDiv.textContent = `歡迎回來，${username}！`;
        window.location.href = "cart.html";
    } else {
        messageDiv.textContent = '帳號或密碼錯誤。';
    }
});

// 顯示註冊表單
document.getElementById('showRegister').addEventListener('click', function(e) {
    e.preventDefault(); // 防止默認行為
    document.getElementById('loginForm').style.display = 'none'; // 隱藏註冊表單
    document.getElementById('registerForm').style.display = 'block'; // 顯示註冊表單
});

// 顯示登入表單
document.getElementById('showLogin').addEventListener('click', function(e) {
    e.preventDefault(); // 防止默認行為
    document.getElementById('registerForm').style.display = 'none'; // 隱藏註冊表單
    document.getElementById('loginForm').style.display = 'block'; // 顯示登入表單
});
