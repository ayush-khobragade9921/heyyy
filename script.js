let cart = [];
const cartList = document.getElementById("cart-list");
const totalAmount = document.getElementById("total-amount");

document.querySelectorAll(".add-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const name = btn.getAttribute("data-name");
        const price = Number(btn.getAttribute("data-price"));

        cart.push({ name, price });
        renderCart();
    });
});


function renderCart() {
    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>₹${item.price}</td>
            </tr>
        `;
        cartList.innerHTML += row;
    });

    totalAmount.textContent = total;
}


document.getElementById("book-btn").addEventListener("click", () => {
    const name = document.getElementById("full-name").value;
    const email = document.getElementById("email").value;

    if (!name || !email) {
        alert("Please enter your name and email!");
        return;
    }

    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    
    emailjs.send("service_wxbcq5q", "template_p8aaivh", {
        orders: cart.map(item => ({
            name: item.name,
            price: item.price,
            units: 1
        })),
        cost: {
            shipping: 0,
            tax: 0,
            total: Number(totalAmount.textContent)   // FINAL FIX
        },
        email: email,
        order_id: Math.floor(Math.random() * 900000) + 100000
    })
    .then(() => {
        alert("Order placed successfully! Email sent.");
        cart = [];
        renderCart();
    })
    .catch((err) => {
        console.error("EmailJS Error:", err);
        alert("Email failed! Check console.");
    });
});
