// Get the button element
const addToCartButton = document.getElementById('add-to-cart');

// Add event listener to the button
addToCartButton.addEventListener('click', function() {
    // Get the product ID from the button's data attribute
    const productID = addToCartButton.getAttribute('data-product-id');

    // Make a POST request to the /add route
    fetch('/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productID }),
    });
});
