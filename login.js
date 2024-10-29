// 用戶數據存取
const users = []; // 簡單的模擬數據

// 登入功能
document.getElementById('loginBtn').addEventListener('click', function() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const messageDiv = document.getElementById('message');
    
    const users = JSON.parse(localStorage.getItem('users')) || []; // 確保正確獲取用戶數據
    
    // 驗證用戶
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        localStorage.setItem('isLoggedIn', 'true'); // 設置登入狀態
        window.location.href = "cart.html"; // 跳轉到購物車頁面
    } else {
        messageDiv.textContent = '帳號或密碼錯誤。';
    }
});

// 登出功能
function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = "login.html"; // 導向登入頁面
}

