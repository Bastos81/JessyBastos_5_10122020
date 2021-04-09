const resultsTotalCommande = document.getElementById("total-commande");
const bouttonValiderForm = document.getElementById("contact-form-btn");
// Vérification de la contenance du panier pour changement de couleur logo
colorPanier ();

//Création du tableau qui va être envoyé au serveur avec les id des caméras
let products = [];

//Permettra de stocker le prix de la commande
let prixTotal;

//Ajout des id des articles choisis dans le tableau idProductPanier
function addIdProducts(productPanier) {
    products.push(productPanier[j].idCamera);
}

//------------------------------PANIER------------------------------//

// Création du panier
async function getPanier() {
    if (productPanier === null || productPanier == 0) {
        results.innerHTML = 
            ` 
                <tr>
                    <th scope="row" colspan="6">Votre panier est vide</th>
                </tr>
            `;
    } else {
        for (j = 0; j < productPanier.length; j++) {
            addIdProducts(productPanier);
            results.innerHTML = (
              
                productPanier
                .map(cameraPanier => ( 
                     ` 
                        <tr id="${cameraPanier.idCamera}">
                            <th scope="row">${cameraPanier.nameCamera}</th>
                            <td>${cameraPanier.resultsLensesChoice}</td>
                            <td>${cameraPanier.priceCamera}</td>
                            <td>${cameraPanier.quantityCamera}</td>
                            <td>${numberWithCommas(cameraPanier.totalPriceCamera+ ",00 €")}</td>
                            <td><button class="btn-supprimer btn btn-dark"><i class="fas fa-trash-alt"></i></button></td>
                        </tr>
                    `
                )).join('')
            );
        }
        // Calcul du montant total du panier
        let calculTotalPanier = []; 
        for (p = 0; p < productPanier.length; p++) {
            let tableauPrixPanier = productPanier[p].totalPriceCamera;
            calculTotalPanier.push(tableauPrixPanier);
        }
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        prixTotal = calculTotalPanier.reduce(reducer);
        resultsTotalCommande.innerHTML = (
            ` 
            ${prixTotal + ",00 €"}
            `
        );
    }
    
}

getPanier();


// Supprimer un article du panier

let bouttonsSupprimer = document.querySelectorAll(".btn-supprimer")
function deleteCamera() {
    for (let k = 0; k < bouttonsSupprimer.length; k++){
        bouttonsSupprimer[k].addEventListener("click" , (event) =>{
            event.preventDefault();
            let idSupressionSelector = productPanier[k].idCamera + ":" + productPanier[k].resultsLensesChoice;
            productPanier = productPanier.filter(
                (el) => el.idCamera + ":" + el.resultsLensesChoice !== idSupressionSelector
            );
            localStorage.setItem("productPanier", JSON.stringify(productPanier));
            alert("Le produit a bien été supprimer du panier")
            window.location.reload();
            })
        }
}

deleteCamera();