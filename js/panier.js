const resultsproductPanier = document.getElementById("product-panier");
let productPanier = JSON.parse(localStorage.getItem("productPanier"));


// Création du panier

async function getPanier() {
    if (productPanier) {
        for (j = 0; j < productPanier.length; j++) {
            resultsproductPanier.innerHTML = (
              
                productPanier
                .map(cameraPanier => ( 
                     ` 
                        <tr>
                            <th scope="row">${cameraPanier.nameCamera}</th>
                            <td>${cameraPanier.resultsLensesChoice}</td>
                            <td>${cameraPanier.priceCamera}</td>
                            <td>${cameraPanier.quantityCamera}</td>
                            <td>${cameraPanier.totalPriceCamera}</td>
                            <td><button class="btn-supprimer btn btn-dark"><i class="fas fa-trash-alt"></i></button></td>
                        </tr>
                    `
                )).join('')
            );
        }
        } else {
            resultsproductPanier.innerHTML = ` 
            <tr>
                <th scope="row" colspan="6">Votre panier est vide</th>
            </tr>
        `;
    }
    
}

getPanier();

// Supprimer un article du panier

let bouttonsSupprimer = document.querySelectorAll(".btn-supprimer")
console.log(bouttonsSupprimer);

function deleteCamera() {
    if (productPanier) {
        let buttonSupprimer = document.getElementById('btn-supprimer');
        buttonSupprimer.addEventListener('click', function () {
        localStorage.removeItem();
    })
        } else {
            resultsproductPanier.innerHTML = ` 
            <tr>
                <th scope="row" colspan="6">Votre panier est vide</th>
            </tr>
        `;
    }
}

deleteCamera()