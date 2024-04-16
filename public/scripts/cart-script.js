document.addEventListener('DOMContentLoaded', function () {
    const addButtons = document.querySelectorAll('.add');
    addButtons.forEach(button => {
        button.addEventListener('click', function () {
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);

        });
    });
});
