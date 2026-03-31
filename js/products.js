let cart = []; 

const addButtons = document.querySelectorAll(".add");
const rows = document.querySelector("#cartTable tbody");
const totalEl = document.getElementById("totalPrice");
const msg = document.getElementById("msg");

// Fonction pour générer un numéro de livraison
function generateDeliveryNumber() {
    return "LIV-" + Math.floor(100000 + Math.random() * 900000);
}

// AJOUTER UN PRODUIT AU PANIER
addButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        const card = btn.parentElement;
        const name = card.querySelector("h3").textContent;
        const price = parseFloat(card.querySelector(".price").dataset.price);
        const qty = parseInt(card.querySelector(".qty").value);
        const date = new Date(); // Date de commande

        if (qty < 1 || qty > 99) {
            alert("Quantité invalide !");
            return;
        }

        const existing = cart.find(item => item.name === name);

        if (existing) {
            existing.qty += qty;
            existing.date = new Date(); // mise à jour si on rajoute
        } else {
            cart.push({ name, price, qty, date });
        }

        updateCart();
    });
});

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const productCards = document.querySelectorAll(".product-card");

function filterProducts() {
    const searchValue = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    productCards.forEach((card) => {
        const productName = card.dataset.name.toLowerCase();
        const productCategory = card.dataset.category;

        const matchesSearch = productName.includes(searchValue);
        const matchesCategory =
            selectedCategory === "all" || productCategory === selectedCategory;

        card.style.display = matchesSearch && matchesCategory ? "block" : "none";
    });
}

searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

// METTRE À JOUR LE PANIER
function updateCart() {
    rows.innerHTML = "";
    let total = 0;

    cart.forEach((item, i) => {
        let subtotal = item.price * item.qty;
        total += subtotal;

        let tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.price} TND</td>
            <td>
                <input type="number" min="1" max="99" value="${item.qty}" class="editQty" data-index="${i}">
            </td>
            <td>${subtotal} TND</td>
            <td>
                <button class="remove-btn" data-index="${i}">X</button>
                <button class="cancel-btn" data-index="${i}">Annuler</button>
            </td>
        `;

        rows.appendChild(tr);
    });

    totalEl.textContent = total;

    attachEvents();
}

// GÉRER LES ÉVÉNEMENTS DU PANIER
function attachEvents() {
    // SUPPRIMER UN PRODUIT
    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            cart.splice(btn.dataset.index, 1);
            updateCart();
        });
    });

    // MODIFIER LA QUANTITÉ
    document.querySelectorAll(".editQty").forEach(input => {
        input.addEventListener("input", () => {
            let i = input.dataset.index;
            let q = parseInt(input.value);

            if (q < 1 || q > 99) return;

            cart[i].qty = q;
            updateCart();
        });
    });

    // ANNULATION DE COMMANDE GRATUITE 24H
    document.querySelectorAll(".cancel-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            let i = btn.dataset.index;
            const now = new Date();
            const orderTime = new Date(cart[i].date);
            const hoursPassed = (now - orderTime) / 1000 / 3600;

            if (hoursPassed <= 24) {
                cart.splice(i, 1);
                updateCart();
                msg.textContent = "✔ Commande annulée avec succès (gratuit).";
                msg.style.color = "green";
            } else {
                msg.textContent = "❌ Impossible d’annuler : délai de 24h dépassé.";
                msg.style.color = "red";
            }
        });
    });
}

// CONFIRMER LA COMMANDE AVEC NUMÉRO DE LIVRAISON
document.getElementById("confirm").addEventListener("click", () => {
    if (cart.length === 0) {
        msg.textContent = "❌ Aucun produit sélectionné.";
        msg.style.color = "red";
        return;
    }

    const deliveryNumber = generateDeliveryNumber(); // Générer le numéro
    msg.innerHTML = `✔ Commande confirmée ! Merci ❤️ <br>Numéro de livraison : <strong>${deliveryNumber}</strong>`;
    msg.style.color = "green";

    // Vider le panier après confirmation
    cart = [];
    updateCart();
});

// RÉINITIALISER LE PANIER
document.getElementById("reset").addEventListener("click", () => {
    cart = [];
    updateCart();
    msg.textContent = "";
});
