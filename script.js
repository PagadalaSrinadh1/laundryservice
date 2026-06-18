var cartItems = []
var serviceNames = ["Dry Cleaning", "Wash & Fold", "Ironing", "Stain Removal", "Leather & Suede Cleaning", "Wedding Dress Cleaning"]
var servicePrices = [200, 100, 30, 500, 999, 2800]
var allButtons = document.querySelectorAll(".js-add-list-button")

for (var i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("click", function() {
        // find which button was clicked using index
        var clickedButton = this
        var buttonIndex = -1

        for (var j = 0; j < allButtons.length; j++) {
            if (allButtons[j] === clickedButton) {
                buttonIndex = j
            }
        }

        var alreadyAdded = false
        for (var k = 0; k < cartItems.length; k++) {
            if (cartItems[k].name === serviceNames[buttonIndex]) {
                alreadyAdded = true
            }
        }

        if (alreadyAdded === true) {
            var newCart = []
            for (var m = 0; m < cartItems.length; m++) {
                if (cartItems[m].name !== serviceNames[buttonIndex]) {
                    newCart.push(cartItems[m])
                }
            }
            cartItems = newCart
            clickedButton.innerHTML = 'Add Item <ion-icon name="add-circle-outline"></ion-icon>'
            clickedButton.style.backgroundColor = "#f4f4f4"
            clickedButton.style.color = "#1e2324"
        } else {
            var newItem = {
                name: serviceNames[buttonIndex],
                price: servicePrices[buttonIndex]
            }
            cartItems.push(newItem)
            clickedButton.innerHTML = 'Remove Item <ion-icon name="remove-circle-outline"></ion-icon>'
            clickedButton.style.backgroundColor = "#fff0f0"
            clickedButton.style.color = "#e83d3d"
        }
        updateCart()
    })
}

function updateCart() {
    var tableBody = document.querySelector(".cart-table tbody")
    var emptyCart = document.querySelector(".empty-cart")
    var totalSpan = document.querySelector(".total span")
    var tableHead = document.querySelector(".cart-table thead")
    tableBody.innerHTML = ""

    if (cartItems.length === 0) {
        emptyCart.style.display = "flex"
        tableHead.style.display = ""
        tableBody.style.overflowY = "hidden"
        totalSpan.textContent = "₹0"
    } else {
        emptyCart.style.display = "none"
        tableHead.style.display = ""
        tableBody.style.overflowY = "auto"
        var total = 0
        for (var i = 0; i < cartItems.length; i++) {
            var row = document.createElement("tr")
            row.innerHTML = "<td>" + (i + 1) + "</td><td colspan='3'>" + cartItems[i].name + "</td><td>₹" + cartItems[i].price + ".00</td>"
            tableBody.appendChild(row)
            total = total + cartItems[i].price
        }
        totalSpan.textContent = "₹" + total
    }
}

var bookingForm = document.querySelector(".book-now-form")
var bookingMessage = document.getElementById("bookingMessage")

bookingForm.addEventListener("submit", function(e) {
    e.preventDefault()

    if (cartItems.length === 0) {
        bookingMessage.textContent = "⚠ Add the items to the cart to book"
        bookingMessage.style.color = "red"
        return
    }

    var fullName = document.getElementById("fullName").value
    var email = document.getElementById("email").value
    var phone = document.getElementById("phone").value
    var servicesList = ""
    var totalAmount = 0
    for (var i = 0; i < cartItems.length; i++) {
        servicesList = servicesList + cartItems[i].name + " - ₹" + cartItems[i].price + "\n"
        totalAmount = totalAmount + cartItems[i].price
    }

    var templateParams = {
        to_name: fullName,
        from_name: fullName,
        email: email,
        phone: phone,
        services: servicesList,
        total: "₹" + totalAmount
    }

    emailjs.send("service_qok7rkd", "template_zk4bxgi", templateParams).then(function(response) {
        // success - show success message
        bookingMessage.textContent = "✅ Email Has been sent successfully"
        bookingMessage.style.color = "green"
        document.getElementById("fullName").value = ""
        document.getElementById("email").value = ""
        document.getElementById("phone").value = ""
    }, function(error) {
        bookingMessage.textContent = "⚠ Add the items to the cart to book"
        bookingMessage.style.color = "red"
    })
})