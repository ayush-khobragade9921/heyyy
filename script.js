document.addEventListener('DOMContentLoaded', () => {

    
    const serviceSection = document.querySelector('.class18');
    const cartTable = document.getElementById('cartItems');
    const totalDisplay = document.getElementById('totalAmount');
    const alertBox = document.getElementById('confirmationMessage');
    const bookingForm = document.getElementById('bookingForm');

   
    let cartItems = [];

   
    function showAlert(msg, color) {
        alertBox.textContent = msg;
        alertBox.style.color = color;
        alertBox.style.marginTop = '10px';
        alertBox.classList.remove('class32');
    }

    function hideAlert() {
        alertBox.classList.add('class32');
    }

    function refreshButtons() {
        const serviceDivs = document.querySelectorAll('.class20');
        serviceDivs.forEach(div => {
            const id = div.getAttribute('data-id');
            const btn = div.querySelector('.class46');
            const inCart = cartItems.some(item => item.id === id);

            if (inCart) {
                btn.classList.remove('class47');
                btn.classList.add('remove-btn');
                btn.textContent = 'Remove Item';
            } else {
                btn.classList.remove('remove-btn');
                btn.classList.add('class47');
                btn.textContent = 'Add Item';
            }
        });
    }

    function updateCartTable() {
        cartTable.innerHTML = '';
        let total = 0;

        cartItems.forEach((item, index) => {
            const row = document.createElement('tr');
            const priceNum = Number(item.price);
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td class="class25">₹${priceNum}</td>
            `;
            cartTable.appendChild(row);
            total += priceNum;
        });

        totalDisplay.textContent = `₹${total}`;
        refreshButtons();
    }

    function clearCartAndForm() {
        setTimeout(() => {
            cartItems = [];
            bookingForm.reset();
            updateCartTable();
            hideAlert();
        }, 3000);
    }

    

   
    serviceSection.addEventListener('click', (e) => {
        const button = e.target.closest('.class46');
        if (!button) return;

        const serviceDiv = button.closest('.class20');
        const name = serviceDiv.getAttribute('data-name');
        const price = serviceDiv.getAttribute('data-price');
        const id = serviceDiv.getAttribute('data-id');

        if (button.classList.contains('class47')) {
            if (!cartItems.some(item => item.id === id)) {
                cartItems.push({ id, name, price });
            }
        } else {
            cartItems = cartItems.filter(item => item.id !== id);
        }

        updateCartTable();
        hideAlert();
    });

    
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const customerName = document.getElementById('fullName').value.trim();
        const customerEmail = document.getElementById('emailId').value.trim();
        const customerPhone = document.getElementById('phoneNumber').value.trim();

        if (cartItems.length === 0) {
            showAlert('Your cart is empty!', 'red');
            return;
        }

        if (!customerName || !customerEmail || !customerPhone) {
            showAlert('Please fill out all details.', 'red');
            return;
        }

        const orderId = Math.floor(Math.random() * 1000000);
        const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

        emailjs.send("service_wxbcq5q", "template_luhk00e", {
            email: customerEmail,
            order_id: orderId,
            orders: cartItems.map(item => ({ name: item.name, units: 1, price: item.price })),
            cost: { shipping: 50, tax: 0, total: totalPrice + 50 }
        }, "ccc1rh5sGQhJSPP88")
        .then(() => {
            showAlert('Your order is confirmed!', 'green');
            clearCartAndForm();
        })
        .catch(err => {
            console.error('Email sending failed:', err);
            showAlert('Order saved but email failed', 'red');
            clearCartAndForm();
        });
    });

 
    hideAlert();
    updateCartTable();
});




