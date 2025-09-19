const miniCartBtn = document.querySelector('.miniCart');
    const cart = document.querySelector('.cart');
    const closeCartBtn = document.querySelector('.close-cart');

    miniCartBtn.addEventListener('click', () => {
        cart.style.display = 'block';
    });

    closeCartBtn.addEventListener('click', () => {
        cart.style.display = 'none';
    });

    
