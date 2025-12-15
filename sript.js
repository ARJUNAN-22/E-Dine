let cart = [];
let total = 0;

// Add to cart (with quantity)
function addToCart(button) {
  const card = button.closest(".item-card");
  const name = card.dataset.name;
  const price = parseInt(card.dataset.price || "0", 10);

  const existing = cart.find((item) => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  updateCart();
}

// Render cart UI
function updateCart() {
  const cartList = document.getElementById("cart-list");
  const totalDisplay = document.getElementById("total");

  cartList.innerHTML = "";
  total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>
        ${item.name}
        <span style="color:#9ca3af;">× ${item.qty}</span>
      </span>
      <span>
        ₹${item.price * item.qty}
        <button type="button"
                class="cart-remove"
                data-index="${index}">
          <i class="fas fa-times"></i>
        </button>
      </span>
    `;
    cartList.appendChild(li);
    total += item.price * item.qty;
  });

  totalDisplay.textContent = total.toString();
}

// Remove item
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Remove button handler
document.addEventListener("click", (e) => {
  if (e.target.closest(".cart-remove")) {
    const btn = e.target.closest(".cart-remove");
    const index = parseInt(btn.dataset.index, 10);
    removeFromCart(index);
  }
});

// Demo submit handler (no backend)
const orderForm = document.getElementById("order-form");
if (orderForm) {
  orderForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    alert("Order placed!\n\n" + JSON.stringify(cart, null, 2));
  });
}

// Mobile nav toggle
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.querySelector(".nav-links");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("nav-open");
  });
}
