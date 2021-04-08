///// ///// ///// ///// PAGE CONFIRMATION ////// ///// ///// /////

// Confirmation de la commande

// Confirmation de la commande

    const confirmationId = localStorage.getItem("orderConfirmationId");
    const messageConfirmation = document.getElementById("orderId");
    messageConfirmation.innerHTML = "Merci pour votre commande n° " + confirmationId;
    const totalPrice = localStorage.getItem("totalOrder");
    const confirmationPrice = document.getElementById("total-price");
    confirmationPrice.innerHTML = "Prix total : " + totalPrice + " $";

function addConfirmationOrder() {
    const order = JSON.parse(sessionStorage.getItem('order'));
    
    results.innerHTML =
    ` 
    <div class="col-12 mt-2">
      <div class="card mb-4 border-light shadow-lg product-page">
        <div class="card-header bg-dark text-white">
          <h1 class="card-title confirm-title">${"Merci pour votre commande, " + order.contact.firstName + " !"}</h1>
        </div>
        <div class="card-body confirm-info">
          <p class="card-text confirm-montant">${"Montant total : " + order.contact.firstName + " €"}</p>
          <p class="card-text confirm-idcommande">${"Votre numéro de commande : " + order.contact.firstName}</p>
          <a href="../index.html" class="stretched-link btn btn-dark col-8">Retour à l'accueil</a>
        </div>
      </div>
    </div>
  ` ;
}


////////////////////////////////////APPEL DES FONCTIONS/////////////////////////////////////////////////
addConfirmationOrder()
