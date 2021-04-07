const resultsproductPanier = document.getElementById("product-panier");
const resultsTotalCommande = document.getElementById("total-commande");
let productPanier = JSON.parse(localStorage.getItem("productPanier"));
// Permet de mettre un écart entre les chiffres
function numberWithCommas(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}


// Création du panier

async function getPanier() {
    if (productPanier === null || productPanier == 0) {
        resultsproductPanier.innerHTML = ` 
            <tr>
                <th scope="row" colspan="6">Votre panier est vide</th>
            </tr>
            `;
    } else {
        for (j = 0; j < productPanier.length; j++) {
            resultsproductPanier.innerHTML = (
              
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
    }
    
}

getPanier();

// Calcul du montant total du panier
let calculTotalPanier = []; 
for (p = 0; p < productPanier.length; p++) {
    let tableauPrixPanier = productPanier[p].totalPriceCamera;
    calculTotalPanier.push(tableauPrixPanier);
}
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = calculTotalPanier.reduce(reducer);
resultsTotalCommande.innerHTML = (
    ` 
    ${prixTotal + ",00 €"}
    `
);
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
            window.location.href = "../html/panier.html";
            })
        }
}

deleteCamera();


(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();