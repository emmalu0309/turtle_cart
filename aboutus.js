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