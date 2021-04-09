// Confirmation de la commande

function addConfirmationOrder() {
    // Récupération des éléments stockés dans le sessionStorage
    let commandeContact = JSON.parse(sessionStorage.getItem('contact'));
    let commandePrixTotal = JSON.parse(sessionStorage.getItem('montantCommande'));
    let orderId = sessionStorage.getItem('orderConfirmationId');
    results.innerHTML =
    ` 
    <div class="col-12 mt-2">
      <div class="card my-4 border-light shadow-lg product-page">
        <div class="card-header bg-dark text-white">
          <h1 class="card-title py-2 confirm-title">${"Merci pour votre commande, " + commandeContact.firstName + " !"}</h1>
        </div>
        <div class="card-body confirm-info">
          <h2 class="page-sous-titre mb-4 font-weight-bolder"><u>Récapitulatif de votre commande :</u></h2>
          <p class="card-text confirm-montant font-weight-bolder"><u>Montant total de votre commande :</u></p>
          <p class="card-text confirm-montant font-weight-bolder">${commandePrixTotal + " €"}</p>
          <p class="card-text confirm-idcommande font-weight-bolder"><u>Votre numéro de commande :</u></p>
          <p class="card-text confirm-idcommande font-weight-bolder">${orderId}</p>
          <a href="../index.html" class="stretched-link btn btn-dark col-8">Retour à l'accueil</a>
        </div>
      </div>
    </div>
  ` ;
}

addConfirmationOrder()
