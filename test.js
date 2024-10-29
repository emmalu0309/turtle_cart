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
    alert(`訂單已確認！\n姓名: ${name}\n地址: ${address}\n電話: ${phone}\n電子郵件: ${email}`);

    // 清空表單並隱藏寄送資料表單
    document.getElementById("shippingInfoForm").reset();
    document.getElementById("shippingForm").style.display = "none";
});
