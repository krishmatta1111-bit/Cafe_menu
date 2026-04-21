const menuItems = [
    { id: 1, name: "Veg Burger", price: 120, category: "Burger" },
    { id: 2, name: "Cheese Burger", price: 150, category: "Burger" },
    { id: 3, name: "Chicken Burger", price: 170, category: "Burger" },

    { id: 4, name: "Coke", price: 60, category: "Cold Drinks" },
    { id: 5, name: "Fanta", price: 60, category: "Cold Drinks" },
    { id: 6, name: "Sprite", price: 60, category: "Cold Drinks" },

    { id: 7, name: "White Sauce Pasta", price: 180, category: "Pasta" },
    { id: 8, name: "Red Sauce Pasta", price: 170, category: "Pasta" },
    { id: 9, name: "Cheese Pasta", price: 200, category: "Pasta" },

    { id: 10, name: "Veg Noodles", price: 140, category: "Noodles" },
    { id: 11, name: "Chicken Noodles", price: 180, category: "Noodles" },
    { id: 12, name: "Schezwan Noodles", price: 160, category: "Noodles" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const menuDiv = document.getElementById("menu");
const cartDiv = document.getElementById("cart-items");

const selectedCategory = localStorage.getItem("selectedCategory");
if (selectedCategory && document.getElementById("category-title")) {
    document.getElementById("category-title").innerText = selectedCategory;
}

function displayMenu() {
    if (!menuDiv) return;

    menuDiv.innerHTML = "";
    const filteredItems = menuItems.filter(
        item => item.category === selectedCategory
    );

    filteredItems.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        menuDiv.appendChild(card);
    });
}

function addToCart(id) {
    const item = menuItems.find(i => i.id === id);
    const cartItem = cart.find(i => i.id === id);

    if (cartItem) {
        cartItem.qty++;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    saveCart();
    updateCart();
}

function updateCart() {
    cartDiv.innerHTML = "";
    let subtotal = 0;

    cart.forEach((item, index) => {
        subtotal += item.price * item.qty;

        cartDiv.innerHTML += `
            <div class="cart-item">
                ${item.name} × ${item.qty}
                <button onclick="increaseQty(${index})">➕</button>
                <button onclick="decreaseQty(${index})">➖</button>
                <button onclick="removeItem(${index})">❌</button>
            </div>
        `;
    });

    const gst = subtotal * 0.05;
    document.getElementById("subtotal").innerText = subtotal;
    document.getElementById("gst").innerText = gst.toFixed(2);
    document.getElementById("total").innerText = (subtotal + gst).toFixed(2);
}

function increaseQty(index) {
    cart[index].qty++;
    saveCart();
    updateCart();
}

function decreaseQty(index) {
    if (cart[index].qty > 1) {
        cart[index].qty--;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function checkout() {
    const total = document.getElementById("total").innerText;

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("✅ Your total amount is ₹" + total + "\n\nThank you for your order!");

    localStorage.removeItem("cart");
    location.reload();
}

displayMenu();
updateCart();
