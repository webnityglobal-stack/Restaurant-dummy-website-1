
/* =====================================
   SPICEHUT RESTAURANT WEBSITE
   Vanilla JavaScript
===================================== */


/* 1. Product Data */

const products = [
 {
    id: 1,
    name: "Chicken Biryani",
    category: "Biryani",
    price: 249,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=700&q=80",
    description: "Aromatic basmati rice with tender chicken and Indian spices."
},
    {
        id: 2,
        name: "Mutton Biryani",
        category: "Biryani",
        price: 299,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=700&q=80",
        description: "Slow-cooked mutton with fragrant basmati rice."
    },
    {
        id: 3,
        name: "Veg Biryani",
        category: "Biryani",
        price: 199,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=700&q=80",
        description: "Fresh vegetables, basmati rice and aromatic spices."
    },
    {
        id: 4,
        name: "Royal Special Thali",
        category: "Thali",
        price: 299,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80",
        description: "A complete Indian meal with dal, sabzi, roti and rice."
    },
    {
        id: 5,
        name: "Butter Paneer",
        category: "Paneer",
        price: 199,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80",
        description: "Soft paneer in a creamy tomato and butter gravy."
    },
    {
        id: 6,
        name: "Kadai Paneer",
        category: "Paneer",
        price: 219,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=700&q=80",
        description: "Paneer, capsicum and onion with kadai masala."
    },
    {
        id: 7,
        name: "Dal Makhani",
        category: "Dal & Curry",
        price: 169,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80",
        description: "Slow-cooked black lentils with butter and cream."
    },
    {
        id: 8,
        name: "Butter Naan",
        category: "Naan & Roti",
        price: 49,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=700&q=80",
        description: "Soft tandoor-baked naan brushed with butter."
    },
  {
    id: 9,
    name: "Gulab Jamun",
    category: "Desserts",
    price: 89,
    rating: 4.8,
    image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/11/gulab-jamun.jpg",
    description: "Soft and delicious gulab jamun dipped in sweet cardamom sugar syrup."
},
    {
        id: 10,
        name: "Mango Lassi",
        category: "Drinks",
        price: 99,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=700&q=80",
        description: "A chilled yoghurt drink blended with mango."
    }
];


/* 2. Cart Storage */

const CART_KEY = "spicehut_cart";

function getCart() {
    try {
        return JSON.parse(
            localStorage.getItem(CART_KEY) || "{}"
        );
    } catch (error) {
        return {};
    }
}

function saveCart(cart) {
    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

    updateCartCount();
}


/* 3. Update Cart Count */

function updateCartCount() {
    const cart = getCart();

    const count = Object.values(cart).reduce(
        (total, quantity) => total + quantity,
        0
    );

    const counter = document.getElementById("cartCount");

    if (counter) {
        counter.textContent = count;
    }
}


/* 4. Add Product to Cart */

function addToCart(productId) {
    const cart = getCart();

    cart[productId] = (cart[productId] || 0) + 1;

    saveCart(cart);

    showToast("Product added to your cart!");
}


/* 5. Toast Notification */

function showToast(message) {
    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");

        toast.id = "toast";
        toast.className = "toast";

        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}


/* 6. Format Price */

function formatPrice(price) {
    return "₹" + price.toLocaleString("en-IN");
}


/* 7. Create Product Cards */

function createProductCard(product) {
    return `
        <article class="product-card reveal">

            <a href="product.html?id=${product.id}">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >
            </a>

            <div class="product-info">

                <h3>
                    <a href="product.html?id=${product.id}">
                        ${product.name}
                    </a>
                </h3>

                <p>${product.description}</p>

                <div class="product-meta">

                    <span class="price">
                        ${formatPrice(product.price)}
                    </span>

                    <span class="rating">
                        ★ ${product.rating}
                    </span>

                </div>

                <div class="product-actions">

                    <button
                        onclick="addToCart(${product.id})"
                    >
                        + Add to Cart
                    </button>

                    <a
                        class="btn view-btn"
                        href="product.html?id=${product.id}"
                    >
                        Details
                    </a>

                </div>

            </div>

        </article>
    `;
}


/* 8. Show Popular Products on Home Page */

function showPopularProducts() {
    const container = document.getElementById(
        "popularProducts"
    );

    if (!container) return;

    const popularIds = [1, 5, 7, 4];

    const popularProducts = products.filter(
        product => popularIds.includes(product.id)
    );

    container.innerHTML = popularProducts
        .map(createProductCard)
        .join("");

    setupRevealAnimation();
}


/* 9. Mobile Navigation */

function setupMobileMenu() {
    const toggle = document.getElementById("menuToggle");
    const nav = document.getElementById("navLinks");

    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
        nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
        });
    });
}


/* 10. Scroll Reveal Animation */

function setupRevealAnimation() {
    const elements = document.querySelectorAll(
        ".reveal:not(.visible)"
    );

    if (!("IntersectionObserver" in window)) {
        elements.forEach(element => {
            element.classList.add("visible");
        });

        return;
    }

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1
        }
    );

    elements.forEach(element => {
        observer.observe(element);
    });
}


/* 11. Current Year */

function setupYear() {
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }
}


/* 12. Initialize Website */

document.addEventListener("DOMContentLoaded", () => {

    updateCartCount();

    showPopularProducts();

    setupMobileMenu();

    setupRevealAnimation();

    setupYear();

});

/* =====================================
   MENU SEARCH AND FILTERS
===================================== */

let selectedCategory = "All";


function renderMenu() {
    const container = document.getElementById("menuProducts");

    // Do nothing if we are not on the menu page.
    if (!container) return;

    const searchInput = document.getElementById("searchInput");
    const sortSelect = document.getElementById("sortSelect");
    const resultCount = document.getElementById("resultCount");
    const emptyState = document.getElementById("emptyState");

    const searchTerm = searchInput.value
        .trim()
        .toLowerCase();

    let filteredProducts = products.filter(product => {
        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm);

        return matchesCategory && matchesSearch;
    });

    // Sort products.
    switch (sortSelect.value) {
        case "low":
            filteredProducts.sort((a, b) => a.price - b.price);
            break;

        case "high":
            filteredProducts.sort((a, b) => b.price - a.price);
            break;

        case "rating":
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
    }

    resultCount.textContent =
        `${filteredProducts.length} dishes found`;

    container.innerHTML = filteredProducts
        .map(createProductCard)
        .join("");

    emptyState.hidden = filteredProducts.length > 0;

    container.hidden = filteredProducts.length === 0;

    setupRevealAnimation();
}


function setupMenuFilters() {
    const container = document.getElementById("menuProducts");

    if (!container) return;

    const searchInput = document.getElementById("searchInput");
    const sortSelect = document.getElementById("sortSelect");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const resetButton = document.getElementById("resetFilters");

    searchInput.addEventListener("input", renderMenu);

    sortSelect.addEventListener("change", renderMenu);

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            selectedCategory = button.dataset.category;

            filterButtons.forEach(item => {
                item.classList.toggle(
                    "active",
                    item === button
                );
            });

            renderMenu();
        });
    });

    resetButton.addEventListener("click", () => {
        selectedCategory = "All";
        searchInput.value = "";
        sortSelect.value = "default";

        filterButtons.forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.category === "All"
            );
        });

        renderMenu();
    });

    // Support category links from the home page.
    const params = new URLSearchParams(window.location.search);
    const requestedCategory = params.get("category");

    const validCategories = [
        "All",
        ...new Set(products.map(product => product.category))
    ];

    if (validCategories.includes(requestedCategory)) {
        selectedCategory = requestedCategory;

        filterButtons.forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.category === selectedCategory
            );
        });
    }

    renderMenu();
}


// Run after the page has loaded.
document.addEventListener("DOMContentLoaded", () => {
    setupMenuFilters();
});

/* =====================================
   CONTACT FORM
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");

    if (!contactForm) return;

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const name = document.getElementById("contactName").value.trim();

        showToast(`Thank you ${name}! Your message is ready.`);

        contactForm.reset();

    });

});

/* =====================================
   PRODUCT DETAILS JAVASCRIPT
===================================== */

function setupProductDetails() {

    const productContainer =
        document.getElementById("productDetails");

    if (!productContainer) return;

    const params = new URLSearchParams(window.location.search);

    const productId = Number(params.get("id"));

    const product = products.find(
        item => item.id === productId
    );

    if (!product) {

        productContainer.innerHTML = `
            <div class="product-not-found">

                <h2>Dish Not Found!</h2>

                <p>Sorry, this product is not available.</p>

                <br>

                <a href="menu.html" class="btn">
                    Explore Our Menu
                </a>

            </div>
        `;

        return;
    }

    let quantity = 1;

    productContainer.innerHTML = `

        <div class="product-detail">

            <div class="product-detail-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="product-detail-info">

                <p class="eyebrow">
                    FRESHLY PREPARED
                </p>

                <h1>${product.name}</h1>

                <div class="product-detail-rating">
                    ⭐ ${product.rating} / 5
                </div>

                <div class="product-detail-price">
                    ${formatPrice(product.price)}
                </div>

                <p class="product-detail-description">
                    ${product.description}
                    Prepared with fresh ingredients and authentic
                    Indian spices for a delicious experience.
                </p>

                <p class="product-detail-label">
                    Select Quantity
                </p>

                <div class="quantity-control">

                    <button id="decreaseQuantity">
                        −
                    </button>

                    <span id="productQuantity">
                        1
                    </span>

                    <button id="increaseQuantity">
                        +
                    </button>

                </div>

                <button
                    class="btn product-add-button"
                    id="productAddToCart"
                >
                    🛒 Add To Cart
                </button>

                <br>

                <a href="menu.html" class="product-back-link">
                    ← Back to Menu
                </a>

            </div>

        </div>

    `;


    const quantityDisplay =
        document.getElementById("productQuantity");


    document.getElementById("increaseQuantity")
        .addEventListener("click", () => {

            quantity++;

            quantityDisplay.textContent = quantity;

        });


    document.getElementById("decreaseQuantity")
        .addEventListener("click", () => {

            if (quantity > 1) {

                quantity--;

                quantityDisplay.textContent = quantity;

            }

        });


    document.getElementById("productAddToCart")
        .addEventListener("click", () => {

            for (let i = 0; i < quantity; i++) {

                addToCart(product.id);

            }

            showToast(
                `${quantity} ${product.name} added to cart!`
            );

        });

}


document.addEventListener("DOMContentLoaded", () => {

    setupProductDetails();

});

/* ================= CART PAGE FUNCTIONALITY ================= */

/* ================= CART PAGE FUNCTIONALITY ================= */

function renderCartPage() {
    const cartContainer = document.getElementById("cartItems");

    if (!cartContainer) return;

    const cart = getCart();

    // Convert saved object into product array
    const cartItems = Object.entries(cart)
        .map(([id, quantity]) => {
            const product = products.find(
                item => item.id === Number(id)
            );

            if (!product || quantity <= 0) return null;

            return {
                ...product,
                quantity: Number(quantity)
            };
        })
        .filter(Boolean);

    if (cartItems.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-icon">🛒</div>
                <h3>Your Cart is Empty</h3>
                <p>Add some delicious food to your cart.</p>
                <a href="menu.html">Explore Menu</a>
            </div>
        `;

        updateCartTotals(0);
        updateCartCount();
        return;
    }

    cartContainer.innerHTML = cartItems.map(item => `
        <div class="cart-item">

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-item-info">
                <h3>${item.name}</h3>

                <p>${formatPrice(item.price)}</p>

                <div class="cart-item-actions">

                    <button onclick="changeCartQuantity(${item.id}, -1)">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="changeCartQuantity(${item.id}, 1)">
                        +
                    </button>

                    <button
                        class="remove-item"
                        onclick="removeCartItem(${item.id})">
                        Remove
                    </button>

                </div>
            </div>

            <div class="cart-item-total">
                ${formatPrice(item.price * item.quantity)}
            </div>

        </div>
    `).join("");

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    updateCartTotals(subtotal);
    updateCartCount();
}


/* UPDATE CART TOTAL */

function updateCartTotals(subtotal) {

    const delivery = subtotal >= 499 ? 0 : subtotal > 0 ? 40 : 0;

    const tax = Math.round(subtotal * 0.05);

    const total = subtotal + delivery + tax;

    document.getElementById("cartSubtotal").textContent =
        formatPrice(subtotal);

    document.getElementById("deliveryFee").textContent =
        delivery === 0 && subtotal > 0
            ? "FREE"
            : formatPrice(delivery);

    document.getElementById("cartTax").textContent =
        formatPrice(tax);

    document.getElementById("cartTotal").textContent =
        formatPrice(total);
}


/* CHANGE QUANTITY */

function changeCartQuantity(id, change) {

    const cart = getCart();

    const key = String(id);

    if (!cart[key]) return;

    cart[key] += change;

    if (cart[key] <= 0) {
        delete cart[key];
    }

    saveCart(cart);

    renderCartPage();
}


/* REMOVE PRODUCT */

function removeCartItem(id) {

    const cart = getCart();

    delete cart[String(id)];

    saveCart(cart);

    renderCartPage();

    showToast("Item removed from cart!");
}


/* CART PAGE INITIALIZATION */

document.addEventListener("DOMContentLoaded", () => {

    renderCartPage();

    const checkoutBtn = document.getElementById("checkoutBtn");

    if (checkoutBtn) {

        checkoutBtn.addEventListener("click", () => {

            const cart = getCart();

            if (Object.keys(cart).length === 0) {
                showToast("Your cart is empty!");
                return;
            }

            window.location.href = "checkout.html";

        });

    }

});


/* ================= CHECKOUT FUNCTIONALITY ================= */

function renderCheckoutPage() {
  const container = document.getElementById("checkoutItems");

  if (!container) return;

  const cart = getCartProducts();
  function getCartProducts() {
    const cart = getCart();

    return Object.entries(cart)
        .map(([id, quantity]) => {
            const product = products.find(
                item => item.id === Number(id)
            );

            if (!product || quantity <= 0) return null;

            return {
                ...product,
                quantity: Number(quantity)
            };
        })
        .filter(Boolean);
}

  if (!cart.length) {
    window.location.href = "cart.html";
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="checkout-product">
      <span>${item.name} × ${item.quantity}</span>
      <strong>${formatPrice(item.price * item.quantity)}</strong>
    </div>
  `).join("");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  const delivery = subtotal >= 499 ? 0 : 40;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + tax;

  document.getElementById("checkoutSubtotal").textContent =
    formatPrice(subtotal);

  document.getElementById("checkoutDelivery").textContent =
    delivery === 0 ? "FREE" : formatPrice(delivery);

  document.getElementById("checkoutTax").textContent =
    formatPrice(tax);

  document.getElementById("checkoutTotal").textContent =
    formatPrice(total);
}

document.addEventListener("DOMContentLoaded", () => {

  renderCheckoutPage();

  const form = document.getElementById("checkoutForm");

  if (!form) return;

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!form.reportValidity()) return;

   const cart = getCartProducts();
    if (!cart.length) {
      showToast("Your cart is empty!");
      return;
    }

    const paymentMethod = document.querySelector(
      'input[name="paymentMethod"]:checked'
    ).value;

    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity, 0
    );

    const delivery = subtotal >= 499 ? 0 : 40;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + delivery + tax;

    const order = {
      orderId: "SH" + Date.now(),
      customer: {
        name: document.getElementById("customerName").value,
        phone: document.getElementById("customerPhone").value,
        email: document.getElementById("customerEmail").value,
        address: document.getElementById("customerAddress").value,
        city: document.getElementById("customerCity").value,
        pincode: document.getElementById("customerPincode").value,
        notes: document.getElementById("orderNotes").value
      },
      items: cart,
      subtotal,
      delivery,
      tax,
      total,
      paymentMethod,
      status: "Order Placed",
      createdAt: new Date().toISOString()
    };

    localStorage.setItem("spicehut_last_order", JSON.stringify(order));

    localStorage.removeItem("spicehut_cart");

    window.location.href = "order-success.html";
  });

});

/* ================= ORDER SUCCESS PAGE ================= */

function renderOrderSuccess() {
  const orderIdElement = document.getElementById("successOrderId");

  if (!orderIdElement) return;

  const orderData = localStorage.getItem("spicehut_last_order");

  if (!orderData) {
    window.location.href = "index.html";
    return;
  }

  const order = JSON.parse(orderData);

  orderIdElement.textContent = order.orderId;

  document.getElementById("successCustomerName").textContent =
    order.customer.name;

  document.getElementById("successCustomerPhone").textContent =
    order.customer.phone;

  document.getElementById("successCustomerAddress").textContent =
    `${order.customer.address}, ${order.customer.city} - ${order.customer.pincode}`;

  document.getElementById("successPayment").textContent =
    order.paymentMethod === "COD"
      ? "Cash on Delivery"
      : "Online Payment (Demo)";

  document.getElementById("successTotal").textContent =
    formatPrice(order.total);

  document.getElementById("successOrderStatus").textContent =
    order.status;

  document.getElementById("successOrderItems").innerHTML =
    order.items.map(item => `
      <div class="success-product">
        <span>${item.name} × ${item.quantity}</span>
        <strong>${formatPrice(item.price * item.quantity)}</strong>
      </div>
    `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderOrderSuccess();
});

/* ================= MY ORDERS FUNCTIONALITY ================= */

function renderMyOrders() {
  const ordersList = document.getElementById("ordersList");

  if (!ordersList) return;

  const savedOrder = localStorage.getItem("spicehut_last_order");

  const orders = savedOrder ? [JSON.parse(savedOrder)] : [];

  document.getElementById("totalOrders").textContent =
    `${orders.length} ${orders.length === 1 ? "Order" : "Orders"}`;

  if (!orders.length) {
    ordersList.innerHTML = `
      <div class="no-orders">
        <div class="empty-icon">📦</div>
        <h3>No Orders Yet</h3>
        <p>Your order history will appear here.</p>
        <a href="menu.html">Explore Our Menu</a>
      </div>
    `;
    return;
  }

  ordersList.innerHTML = orders.map(order => `
    <div class="order-card">

      <div class="order-card-header">
        <div>
          <small>ORDER ID</small>
          <strong>${order.orderId}</strong>
        </div>

        <span class="order-status-badge">
          ${order.status}
        </span>
      </div>

      <div class="order-products">
        ${order.items.map(item => `
          <div class="order-product-row">
            <span>${item.name} × ${item.quantity}</span>
            <strong>${formatPrice(item.price * item.quantity)}</strong>
          </div>
        `).join("")}
      </div>

      <div class="order-card-footer">
        <div>
          <small>Total Amount</small>
          <strong>${formatPrice(order.total)}</strong>
        </div>

        <button class="track-order-btn"
          onclick="toggleOrderTracking('${order.orderId}')">
          Track Order ↓
        </button>
      </div>

      <div class="order-tracking" id="tracking-${order.orderId}" hidden>
        <div class="tracking-step completed">
          <span class="tracking-dot"></span>
          Order Placed
        </div>

        <div class="tracking-step">
          <span class="tracking-dot"></span>
          Preparing
        </div>

        <div class="tracking-step">
          <span class="tracking-dot"></span>
          On The Way
        </div>

        <div class="tracking-step">
          <span class="tracking-dot"></span>
          Delivered
        </div>
      </div>

    </div>
  `).join("");
}

function toggleOrderTracking(orderId) {
  const tracking = document.getElementById(`tracking-${orderId}`);

  if (!tracking) return;

  tracking.hidden = !tracking.hidden;
}

document.addEventListener("DOMContentLoaded", () => {
  renderMyOrders();
});
