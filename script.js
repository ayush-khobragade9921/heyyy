let cart = [];
const cartList = document.getElementById("cart-list");
const totalAmount = document.getElementById("total-amount");


document.querySelectorAll(".add-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const name = btn.getAttribute("data-name");
        const price = Number(btn.getAttribute("data-price"));

       
        const existing = cart.findIndex(item => item.name === name);

        if (existing === -1) {
            
            cart.push({ name, price });
            btn.textContent = "Remove";
            btn.classList.add("remove-btn");
        } else {
            
            cart.splice(existing, 1);
            btn.textContent = "Add";
            btn.classList.remove("remove-btn");
        }

        renderCart();
    });
});

function renderCart() {
    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, i) => {
        total += item.price;

        cartList.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${item.name}</td>
                <td>₹${item.price}</td>
            </tr>
        `;
    });

    totalAmount.textContent = total;
}

document.getElementById("book-btn").addEventListener("click", () => {
    const userName = document.getElementById("full-name").value.trim();
    const userEmail = document.getElementById("email").value.trim();

    if (!userName || !userEmail) {
        alert("Please enter your name and email!");
        return;
    }

    if (cart.length === 0) {
        alert("Your cart is empty!");
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
            total: Number(totalAmount.textContent)
        },
        email: userEmail,
        order_id: Math.floor(Math.random() * 900000) + 100000
    })
    .then(() => {
        alert("Order placed successfully! Email sent.");
        cart = [];
        renderCart();

        // reset buttons to "Add"
        document.querySelectorAll(".add-btn").forEach(btn => {
            btn.textContent = "Add";
            btn.classList.remove("remove-btn");
        });
    })
    .catch(err => {
        console.error("EmailJS Error:", err);
        alert("Email sending failed. Check console for details.");
    });
});
