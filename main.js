document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.btn-buy');
    const cartItemCount = document.querySelector('.cart-icon span');
    const cartItemsList = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.querySelector('.cart-icon');
    const sidebar = document.getElementById('sidebar');
    const closeButton = document.querySelector('.sidebar-close');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const footerTotal = document.getElementById('footer-total');
    const footerCheckout = document.getElementById('footer-checkout');  

    let cartItems = [];
    let totalAmount = 0;

    document.getElementById('categories-select').addEventListener('change', function () {
    const categoriaSelecionada = this.value;
    const blocos = document.querySelectorAll('.categorie-block');
    const produtos = document.querySelectorAll('.produto');

    blocos.forEach(bloco => {
        const categoria = bloco.getAttribute('data-categoria');

        if (categoriaSelecionada === 'todos' || categoriaSelecionada === categoria) {
            bloco.style.display = 'block';
        } else {
            bloco.style.display = 'none';
        }
    });

    produtos.forEach(produto => {
        const categoria = produto.getAttribute('data-categoria');

        if (categoriaSelecionada === 'todos' || categoria === categoriaSelecionada) {
            produto.style.display = 'block';
        } else {
            produto.style.display = 'none';
        }
    });
});



    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const item = {
                name: document.querySelectorAll('.card .card-title')[index].textContent,
                price: parseFloat(document.querySelectorAll('.price')[index].textContent.slice(3).replace(',', '.')),
                quantity: 1,
            };

            const existingItem = cartItems.find((cartItem) => cartItem.name === item.name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push(item);
            }

            totalAmount += item.price;
            updateCartUI();
        });
    });

    function updateCartUI() {
        updateCartItemCount(cartItems.reduce((acc, cur) => acc + cur.quantity, 0));
        updateCartItemList();
        updateCartTotal();
    }

    function updateCartItemCount(count) {
        cartItemCount.textContent = count;
    }

    function updateCartItemList() {
        cartItemsList.innerHTML = '';
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item', 'individual-cart-item');
            cartItem.innerHTML = `
                <span>(${item.quantity}x) ${item.name}</span>
                <span class="cart-item-price">
                    R$ ${(item.price * item.quantity).toFixed(2)} 
                    <button class="remove-item" data-index="${index}">
                        <i class="fa-solid fa-times"></i>
                    </button>
                </span>
            `;
            cartItemsList.append(cartItem);
        });

        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const index = button.dataset.index;
                removeItemFromCart(index);
            });
        });
    }

    function removeItemFromCart(index) {
        const removedItem = cartItems.splice(index, 1)[0];
        totalAmount -= removedItem.price * removedItem.quantity;
        updateCartUI();
    }

    function updateCartTotal() {
        cartTotal.textContent = `R$ ${totalAmount.toFixed(2)}`;
        footerTotal.textContent = `R$ ${totalAmount.toFixed(2)}`;
    }

    cartIcon.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    closeButton.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });

    

    checkoutBtn.addEventListener('click', () => {
        if (cartItems.length === 0) return alert("Carrinho vazio");

        const pedidoId = Math.floor(Math.random() * 1000);
        const resumo = cartItems
            .map(item => `- (${item.quantity}x) *${item.name}*`)
            .join('\n');

        const mensagem = `*Pedido ${pedidoId}:* \n\n${resumo}\n\n*Total:* R$ ${totalAmount.toFixed(2)}`;
        const url = `https://wa.me/5583993759457?text=${encodeURIComponent(mensagem)}`;
        window.open(url, '_blank');
    });

    footerCheckout.addEventListener('click', () => {
        if (cartItems.length === 0) return alert("Carrinho vazio");

        // const nomeCliente = prompt("Digite seu nome:");
        const pedidoId = Math.floor(Math.random() * 1000);
        const resumo = cartItems
            .map(item => `- (${item.quantity}x) *${item.name}*`)
            .join('\n');

        const mensagem = `*Pedido ${pedidoId}:* \n\n${resumo}\n\n*Total:* R$ ${totalAmount.toFixed(2)}`;
        const url = `https://wa.me/5583993759457?text=${encodeURIComponent(mensagem)}`;
        window.open(url, '_blank');
    });
});
