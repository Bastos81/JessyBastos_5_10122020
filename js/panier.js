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


//------------------------------FORMULAIRE------------------------------//

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

//Récupération des données du formulaire dans l'objet contact
function getForm() {
    let firstName = document.getElementById('form-prenom').value;
    let lastName = document.getElementById('form-nom').value;
    let address = document.getElementById('form-adresse').value;
    let city = document.getElementById('form-ville').value;
    let email = document.getElementById('form-email').value;
    contact = new ContactData(firstName, lastName, address, city, email);
}

//Fonction de validation du formulaire qui ne sera appelé qu'au submit
function ValidationElementsForm() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName("needs-validation");
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.classList.add("was-validated");
    });
    if(/^[a-zA-Z\sàâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ-]{3,20}$/.test(contact.firstName)){
        console.log("ok prénom");
        if(/^[a-zA-Z\sàâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ-]{3,20}$/.test(contact.lastName)){
            console.log("ok nom");
            if(/^[a-zA-Z0-9\sàâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ-]{3,40}$/.test(contact.address)){
                console.log("ok adress");
                if(/^[a-zA-Z\sàâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ-]{3,20}$/.test(contact.city)){
                    console.log("ok city");
                    if(/^[a-zA-Z\sàâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ-]{3,20}$/.test(contact.email)){
                        console.log("ok email");
                        return true;
                    } else {
                        console.log("not ok email");
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
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
            document.location.href = "../html/confirm.html"
        } else {
            console.error('Retour du serveur : ', response.status);
        }
    } catch (e) {
        console.log(e);
    }
}

//Récupération de l'id de commande renvoyée par l'API et stockage dans le localStorage
function getOrderConfirmationId(responseId) {
    let orderId = responseId.orderId;
    console.log(orderId);
    localStorage.setItem("orderConfirmationId", orderId);
}

//Validation de la commande et envoie de l'objet contact et du tableau product à l'API
function confirmationOrder() {
    getForm();
    dataToSend = JSON.stringify({ contact, products });
    console.log(dataToSend);
    postForm(dataToSend);
}

//Validation du formulaire
function validateForm() {
    bouttonValiderForm.addEventListener('click', (event) => {event.preventDefault();
        if(ValidationElementsForm()){
            localStorage.setItem("montantCommande", JSON.stringify(prixTotal));
            confirmationOrder()
            console.log("ok form");
        } else {
            console.log("not ok form");
        }
    })
}


validateForm();