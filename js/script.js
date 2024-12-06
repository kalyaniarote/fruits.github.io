// Get all the elements needed
const searchForm = document.querySelector('.search-form');
const shoppingCart = document.querySelector('.shopping-cart');
const loginForm = document.querySelector('.login-form');
const navbar = document.querySelector('.navbar');

// Toggle shopping cart display
document.querySelector('#cart-btn').onclick = toggleShoppingCart;

// Toggle navbar display
document.querySelector('#menu-btn').onclick = toggleNavbar;

// Hide all elements on scroll
window.onscroll = hideAllElements;

// Initialize Swiper for product slider
initializeSwiper(".product-slider");

// Initialize Swiper for review slider
initializeSwiper(".review-slider");

// Get all the "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.products .btn');

// Add event listeners to "Add to Cart" buttons
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

function toggleShoppingCart() {
    shoppingCart.classList.toggle('active');
    hideOtherElements();
}

function toggleNavbar() {
    navbar.classList.toggle('active');
    hideOtherElements();
}

function hideAllElements() {
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

function hideOtherElements() {
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
}

function initializeSwiper(selector) {
    new Swiper(selector, {
        loop: true,
        spaceBetween: 20,
        autoplay: {
            delay: 7500,
            disableOnInteraction: false,
        },
        centeredSlides: true,
        breakpoints: {
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1020: { slidesPerView: 3 },
        },
    });
}

function addToCart(event) {
    event.preventDefault();

    const product = event.target.closest('.box');
    const { productName, productPrice, productImage } = getProductDetails(product);

    const cartItem = createCartItem(productName, productPrice, productImage);
    shoppingCart.appendChild(cartItem);

    updateTotalPrice();

    const increaseQuantityBtn = cartItem.querySelector('.increase-quantity');
    const decreaseQuantityBtn = cartItem.querySelector('.decrease-quantity');
    increaseQuantityBtn.addEventListener('click', increaseQuantity);
    decreaseQuantityBtn.addEventListener('click', decreaseQuantity);
}

function getProductDetails(product) {
    const productName = product.querySelector('h3').innerText;
    const productPrice = parseFloat(product.querySelector('.price').innerText.replace(/[^\d.]/g, ''));
    const productImage = product.querySelector('img').src;
    return { productName, productPrice, productImage };
}

function createCartItem(name, price, image) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('box');
    cartItem.innerHTML = `
        <i class="fas fa-minus-circle decrease-quantity"></i>
        <span class="quantity">1</span>
        <i class="fas fa-plus-circle increase-quantity"></i>
        <img src="${image}" alt="">
        <div class="content">
            <h3>${name}</h3>
            <span class="price">${price}</span>
            <button class="delete-product">Delete</button>
        </div>
    `;
    return cartItem;
}

function increaseQuantity(event) {
    const quantityElement = event.target.parentElement.querySelector('.quantity');
    let quantity = parseInt(quantityElement.textContent);
    quantity++;
    quantityElement.textContent = quantity;
    updateTotalPrice();
}

function decreaseQuantity(event) {
    const quantityElement = event.target.parentElement.querySelector('.quantity');
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
        quantity--;
        quantityElement.textContent = quantity;
        updateTotalPrice();
    }
}

function updateTotalPrice() {
    const cartItems = document.querySelectorAll('.shopping-cart .box');
    let totalPrice = 0;

    cartItems.forEach(item => {
        const price = parseFloat(item.querySelector('.price').innerText.replace(/[^\d.]/g, ''));
        const quantity = parseInt(item.querySelector('.quantity').textContent);
        totalPrice += price * quantity;
    });

    const totalPriceElement = document.querySelector('.shopping-cart .total');
    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// Event listener for deleting a product from the cart
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-product')) {
        event.target.parentElement.parentElement.remove();
        updateTotalPrice();
    }
});

// Get the checkout button
const checkoutBtn = document.querySelector('.shopping-cart .btn');

// Event listener for checkout button click
checkoutBtn.addEventListener('click', function (event) {
    event.preventDefault();

    // Prepare the message with product info
    let message = 'I want to purchase the following items:\n';
    const cartItems = document.querySelectorAll('.shopping-cart .box');
    cartItems.forEach(item => {
        const productName = item.querySelector('h3').innerText;
        const productPrice = item.querySelector('.price').innerText;
        const productQuantity = item.querySelector('.quantity').innerText;
        message += `${productName} - ${productPrice} (${productQuantity})\n`;
    });

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Open WhatsApp with the encoded message and phone number
    window.open(`https://api.whatsapp.com/send?phone=+919552271491&text=${encodedMessage}`);
});

function openMap() {
    // Replace this with the actual map URL for Bhokar, Jalgaon
    window.location.href = "https://www.google.com/maps/place/Bhokar,+Jalgaon,+Maharashtra+425001,+India";
}

// Add scrollbar to the shopping cart
shoppingCart.style.overflowY = 'auto';
shoppingCart.style.maxHeight = '400px';
