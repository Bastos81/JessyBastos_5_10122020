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
    let verificationPrenom = contact.firstName;
    let verificationNom = contact.lastName;
    let verificationAddresse = contact.address;
    let verificationVille = contact.city;
    let verificationEmail = contact.email;
    // Récupération de tous les formulaires auxquels nous voulons appliquer des styles de validation Bootstrap personnalisés
    var forms = document.getElementsByClassName("needs-validation");
    // Boucle empêchant la soumission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.classList.add("was-validated");
    });
    // Vérification du formulaire via les regex
    if(formPrenomNomVilleRegex.test(verificationPrenom)){
        console.log("ok prénom");
        if(formPrenomNomVilleRegex.test(verificationNom)){
            console.log("ok nom");
            if(formAdressRegex.test(verificationAddresse)){
                console.log("ok adress");
                if(formPrenomNomVilleRegex.test(verificationVille)){
                    console.log("ok city");
                    if(formEmailRegex.test(verificationEmail) && verificationEmail != ""){
                        console.log("ok email");
                        return true;
                    } else {
                        console.log("not ok email");
                        return false;
                    }
                } else {
                    console.log("not ok city")
                    return false;
                }
            } else {
                console.log("not ok adress")
                return false;
            }
        } else {
            console.log("not ok nom")
            return false;
        }
    } else {
        console.log("not ok prénom")
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
            localStorage.clear();
            document.location.href = "../html/confirm.html"
        } else {
            console.error('Retour du serveur : ', response.status);
        }
    } catch (e) {
        alert("Le serveur semble injoignable, réessayer dans quelques instants!");
    }
}

//Récupération de l'id de commande renvoyée par l'API et stockage de l'ensemble des informations dans le sessionStorage
function getOrderConfirmationId(responseId) {
    let orderId = responseId.orderId;
    console.log(orderId);
    sessionStorage.setItem("orderConfirmationId", orderId);
    sessionStorage.setItem("montantCommande", JSON.stringify(prixTotal));
    sessionStorage.setItem("contact", JSON.stringify(contact));
    sessionStorage.setItem("productCommande", JSON.stringify(productPanier));
}

//Validation de la commande et envoie de l'objet contact et du tableau product à l'API
function confirmationOrder() {
    dataToSend = JSON.stringify({ contact, products });
    console.log(dataToSend);
    postForm(dataToSend);
}

//Validation du formulaire
function validateForm() {
    bouttonValiderForm.addEventListener('click', (event) => {event.preventDefault();
        getForm();
        if(ValidationElementsForm()){
            confirmationOrder()
            console.log("ok form");
        } else {
            console.log("not ok form");
        }
    })
}


validateForm();