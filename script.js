// lógica para o modal do carrinho
const miniCartBtn = document.querySelector(".miniCart");
const cart = document.querySelector(".cart");
const closeCartBtn = document.querySelector(".close-cart");
miniCartBtn.addEventListener("click", () => {
  cart.style.display = "block";
});

closeCartBtn.addEventListener("click", () => {
  cart.style.display = "none";
});

function adicionarAoCarrinho(produto) {
  let carrinho = JSON.parse(window.localStorage.getItem("carrinho")) ?? [];

  //verifica se o produto já está no carrinho
  const itemExistente = carrinho.find((item) => item.id === produto.id);

  //se já estiver, incrementa a quantidade, se não, adiciona um novo item
  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    carrinho.push({ id: produto.id, nome: produto.name, quantidade: 1 });
  }

  window.localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarCarrinho();
}

function createProductList(products) {
  const productList = document.querySelector(".product-list");

  //percorre a lista de produtos criando um card para cada produto da lista
  products.map((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            ${
              product.discounts
                ? `<p class="discounts">Discount: $${product.discounts.toFixed(
                    2
                  )}</p>`
                : ""
            }
            <button class="add-to-cart" data-id="${
              product.id
            }">Add to Cart</button>
        `;
    productList.appendChild(productCard);
  });

  //para cada botão de adicionar ao carrinho, ouve o clique, acha o produto pelo id e adiciona ao carrinho
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      const id = Number(event.target.dataset.id);
      const product = products.find((p) => p.id === id);
      adicionarAoCarrinho(product);
    });
  });
}

//carrega o json e cria a lista de produtos
async function loadProducts() {
  try {
    const response = await fetch("/products.json");
    const products = await response.json();
    createProductList(products);
  } catch (error) {
    console.error("Erro ao carregar os produtos:", error);
  }
}

function atualizarCarrinho() {
  const cartItemsContainer = document.querySelector(".cart-items");
  let carrinho = JSON.parse(window.localStorage.getItem("carrinho")) ?? [];

  cartItemsContainer.innerHTML = "";
  if (carrinho.length === 0) {
    cartItemsContainer.innerHTML = `<p>No items in cart</p>`;
    return;
  }

  //percorre o array do carrinho e cria a linha de cada item
  carrinho.forEach((produto) => {
    const itemElement = document.createElement("p");
    itemElement.textContent = `${produto.nome} (x${produto.quantidade})`;
    cartItemsContainer.appendChild(itemElement);
  });
}

loadProducts();
atualizarCarrinho();
