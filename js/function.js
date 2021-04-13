// Déclaration des constantes et des variables
const searchInput = document.getElementById("search");
const results = document.getElementById("productList");
const panierLogo = document.getElementById("link-panier");
const conteneurTrierFiltrer = document.getElementById("cont-filtre-tri");
let productPanier = JSON.parse(localStorage.getItem("productPanier"));
let product;
let searchTerm = '';
let cameras;
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// Récupération de l'Url d'une page
const getUrl = window.location.href;
const getUrlPage = new URL(getUrl);
const getUrlPagePathname = getUrlPage.pathname;
// Déclaration de la variable indexUrlPathname pour personnaliser errorMessage
let indexUrlPathname;

// Déclaration des Regex utilisés dans les formulaires
const formPrenomNomVilleRegex = /^[a-zA-Z\sàâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ-]{3,20}$/;
const formAdressRegex = /^[a-zA-Z0-9\sàâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ-]{3,40}$/;
const formEmailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/;

// Consultation de l'API
const getCameras = async() => {
	cameras = await fetch("http://localhost:3000/api/cameras")
    .then(res => res.json())
    .catch((error) => {
      errorMessage();
    })
};

// Création des messages d'erreur :
function errorMessage() {
  // Index
  if (getUrlPagePathname === indexUrlPathname){
    conteneurTrierFiltrer.classList.add("hidden");
    results.innerHTML = 
      ` 
        <div class="col-12 mt-2">
          <div class="card mb-4 border-light shadow-lg product-page">
            <div class="card-header bg-dark text-white">
              <h1 class="card-title error-title">Il y a visiblement un problème de connexion à notre site!</h1>
            </div>
            <div class="card-body error-info">
              <p class="card-text error-description">Nous vous présentons nos excuses pour le désagrément occasionné.</p>
              <p class="card-text error-description">Nos techniciens sont déjà au travail pour régler le problème!</p>
              <a href="index.html" class="stretched-link btn btn-dark col-8">Actualiser la page</a>
            </div>
          </div>
        </div>
      ` ; 
  // Autres
  } else {
    results.innerHTML = 
      ` 
        <div class="col-12 mt-2">
          <div class="card mb-4 border-light shadow-lg product-page">
            <div class="card-header bg-dark text-white">
              <h1 class="card-title error-title">Oups... Une erreur est survenue</h1>
            </div>
            <div class="card-body error-info">
              <p class="card-text error-description">Nos techniciens sont déjà au travail pour régler le problème!</p>
              <a href="../index.html" class="stretched-link btn btn-dark col-8">Retour à l'accueil</a>
            </div>
          </div>
        </div>
      ` ; 
  }
  
};


// Permet de mettre un écart entre les chiffres "ex : 1 000"
function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Vérification de la contenance du panier pour changement de couleur logo et ajout du nombre de produit au panier
let calculTotalQuantityPanier= [];
let panierProductQuantity; 
let quantityTotalDansPanier;
function colorPanier() {
  const targetDiv = document.querySelector(".header--cart--counter");
  if (productPanier != null || productPanier > 0) {
    for (let n = 0; n < productPanier.length; n++){
        panierProductQuantity = productPanier[n].quantityCamera;
        calculTotalQuantityPanier.push(panierProductQuantity);
      }
    quantityTotalDansPanier = calculTotalQuantityPanier.reduce(reducer);
    panierLogo.classList.add("text-warning");
    targetDiv.classList.remove("hidden");
    targetDiv.textContent = quantityTotalDansPanier;
  } else {
    panierLogo.classList.remove("text-warning");
    targetDiv.classList.add("hidden");
  };
}

// Envoi de la fiche produit dans le localstorage
function productToLocalstorage() {
  productPanier.push(product);
  localStorage.setItem("productPanier", JSON.stringify(productPanier));
}