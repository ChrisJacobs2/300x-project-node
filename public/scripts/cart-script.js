const quantityBoxes = document.querySelectorAll('.quantity-box');



quantityBoxes.forEach(box => {
    const cartProductID = box.getAttribute('data-cart-product-id');
    const deleteButton = box.querySelector('.delete');
    const updateButton = box.querySelector('.update');
    // reference to the input element
    const quantityInput = box.querySelector('input');


    // Add event listener to the delete button
    deleteButton.addEventListener('click', () => {
        deleteProduct(cartProductID);
    });

    // Add event listener to the update button
    updateButton.addEventListener('click', () => {
        const newQuantity = quantityInput.value;
        fetch(`/cart/update/${cartProductID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: cartProductID, quantity: newQuantity }),
        })
        .then(response => {
            if (response.ok) {
                window.location.reload();
            } else {
                console.error('Failed to update product');
            }
        });
    });
    
});




function deleteProduct(cartProductID) {
    fetch(`/cart/delete/${cartProductID}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            window.location.reload();
        } else {
            console.error('Failed to delete product');
        }
    });
}

