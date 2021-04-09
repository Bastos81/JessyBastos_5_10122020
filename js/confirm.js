// Confirmation de la commande

function addConfirmationOrder() {
    // Récupération des éléments stockés dans le sessionStorage
    let commandeContact = JSON.parse(sessionStorage.getItem('contact'));
    let commandePrixTotal = JSON.parse(sessionStorage.getItem('montantCommande'));
    let orderId = sessionStorage.getItem('orderConfirmationId');
    results.innerHTML =
    ` 
    <div class="col-12 mt-2">
      <div class="card mb-4 border-light shadow-lg product-page">
        <div class="card-header bg-dark text-white">
          <h1 class="card-title confirm-title">${"Merci pour votre commande, " + commandeContact.firstName + " !"}</h1>
        </div>
        <div class="card-body confirm-info">
          <p class="card-text confirm-montant">${"Montant total de votre commande : " + commandePrixTotal + " €"}</p>
          <p class="card-text confirm-idcommande">${"Votre numéro de commande : " + orderId}</p>
          <a href="../index.html" class="stretched-link btn btn-dark col-8">Retour à l'accueil</a>
        </div>
      </div>
    </div>
  ` ;
}

addConfirmationOrder()
