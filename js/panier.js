const resultsproductPanier = document.getElementById("product-panier");
const resultsTotalCommande = document.getElementById("total-commande");
const bouttonValiderForm = document.getElementById("contact-form-btn");
let productPanier = JSON.parse(localStorage.getItem("productPanier"));
// Permet de mettre un écart entre les chiffres
function numberWithCommas(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
//////Création de l'objet contact contenant les données du formulaire qui va être envoyé au serveur
let contact = {};
//////Création d'une classe pour structurer l'objet contact
class ContactData {
    constructor(firstName, lastName, address, city, codePostal, telNumber, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.codePostal = codePostal;
        this.telNumber = telNumber;
        this.email = email;
    }
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
            window.location.href = "../html/panier.html";
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
    let codePostal = document.getElementById('form-codepostal').value;
    let telNumber = document.getElementById('form-tel').value;
    let email = document.getElementById('form-email').value;
    contact = new ContactData(firstname, lastname, address, city, codePostal, telNumber, email);
}


//Validation des données du formulaire
function validateForm() {
     bouttonValiderForm.addEventListener('click', function () {
        let firstname = document.getElementById('form-prenom').value;
        let lastname = document.getElementById('form-nom').value;
        let address = document.getElementById('form-adresse').value;
        let city = document.getElementById('form-ville').value;
        let codePostal = document.getElementById('form-codepostal').value;
        let telNumber = document.getElementById('form-tel').value;
        let email = document.getElementById('form-email').value;
        if (firstname, lastname, city, email != "" && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            console.log("ok")
            return true;
        } else {
            alert("Saisissez tous les champs et entrez un email valide");
            return false;
        }
})
}
validateForm();

//Validation de la commande et envoie de l'objet contact et du tableau product à l'API
function confirmationOrder() {
    getForm();
    dataToSend = JSON.stringify({ contact, products });
    console.log(dataToSend);
    postForm(dataToSend);
}

//Requête POST pour envoyer l'objet Contact et le tableau products à l'API
async function postForm(dataToSend) {
    try {
        let response = await fetch("http://localhost:3000/api/cameras/order", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: dataToSend,
        });
        if (response.ok) {
            let responseId = await response.json();
            getOrderConfirmationId(responseId);
            window.location.href = "confirm.html";
        } else {
            console.error('Retour du serveur : ', response.status);
        }
    } catch (e) {
        console.log(e);
    }
}