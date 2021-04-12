// Confirmation de la commande

// Vérification de la contenance du panier pour changement de couleur logo et ajout du nombre de produit au panier
colorPanier ();

function addConfirmationOrder() {
    // Récupération des éléments stockés dans le sessionStorage
    let commandeContact = JSON.parse(sessionStorage.getItem('contact'));
    let commandePrixTotal = JSON.parse(sessionStorage.getItem('montantCommande'));
    let orderId = sessionStorage.getItem('orderConfirmationId');
    let produitCommande = sessionStorage.getItem('productCommande');
    if(produitCommande != null || produitCommande > 0){
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
                <a href="../index.html" class="stretched-link btn btn-warning col-8">Retour à l'accueil</a>
              </div>
            </div>
          </div>
        ` ;
    } else {
      results.innerHTML = 
        ` 
          <div class="col-12 mt-2">
            <div class="card mb-4 border-light shadow-lg product-page">
              <div class="card-header bg-dark text-white">
                <h1 class="card-title error-title">Oups... vous vous êtes perdus!</h1>
              </div>
              <div class="card-body error-info">
                <p class="card-text error-description">Mais pas de panique, il suffit de retourner à l'accueil!</p>
                <a href="../index.html" class="stretched-link btn btn-warning col-8">Retour à l'accueil</a>
              </div>
            </div>
          </div>
        ` ; 
    }
}

addConfirmationOrder()
