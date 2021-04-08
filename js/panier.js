const resultsTotalCommande = document.getElementById("total-commande");
const bouttonValiderForm = document.getElementById("contact-form-btn");

//Création de l'objet contact contenant les données du formulaire qui va être envoyé au serveur
let contact = {};

//Création d'une classe pour structurer l'objet contact
class ContactData {
    constructor(firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
}

// Vérification de la contenance du panier pour changement de couleur logo
colorPanier ();

// Création du panier
async function getPanier() {
    if (productPanier === null || productPanier == 0) {
        results.innerHTML = ` 
            <tr>
                <th scope="row" colspan="6">Votre panier est vide</th>
            </tr>
            `;
    } else {
        for (j = 0; j < productPanier.length; j++) {
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
        const prixTotal = calculTotalPanier.reduce(reducer);
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

//Récupération des données du formulaire dans l'objet contact
function getForm() {
    let firstname = document.getElementById('form-prenom').value;
    let lastname = document.getElementById('form-nom').value;
    let address = document.getElementById('form-adresse').value;
    let city = document.getElementById('form-ville').value;
    let email = document.getElementById('form-email').value;
    contact = new ContactData(firstname, lastname, address, city, email);
}