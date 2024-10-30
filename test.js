function animateAddToCart() {
    const productImage = document.querySelector(".product-image");
    const cartIcon = document.querySelector(".cart-icon");

    const flyingImage = productImage.cloneNode(true);
    flyingImage.classList.add("flying-image");

    // 確認位置是否正確
    const productRect = productImage.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    console.log("商品圖片位置:", productRect);
    console.log("購物車圖標位置:", cartRect);

    // 動畫初始位置
    flyingImage.style.top = `${productRect.top}px`;
    flyingImage.style.left = `${productRect.left}px`;
    document.body.appendChild(flyingImage);

    // 最終位置
    setTimeout(() => {
        flyingImage.style.top = `${cartRect.top}px`;
        flyingImage.style.left = `${cartRect.left}px`;
        flyingImage.style.width = "20px";
        flyingImage.style.height = "20px";
        flyingImage.style.opacity = 0;
    }, 10);

    flyingImage.addEventListener("transitionend", () => {
        flyingImage.remove();
    });
}
