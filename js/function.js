const searchInput = document.getElementById("search");
const results = document.getElementById("productList");
const panierLogo = document.getElementById("link-panier");
let productPanier = JSON.parse(localStorage.getItem("productPanier"));
let product;
let searchTerm = '';
let cameras;
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// Consultation de l'API
const getCameras = async() => {
	cameras = await fetch("http://localhost:3000/api/cameras")
    .then(res => res.json())
    .catch((error) => {
      errorMessage();
    })
};

//Création d'un message d'erreur
function errorMessage() {
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
};


// Permet de mettre un écart entre les chiffres
function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Vérification de la contenance du panier pour changement de couleur logo et ajout du nombre de produit au panier
let calculTotalQuantityPanier= [];
let panierProductQuantity; 
let quantityTotal;
function colorPanier() {
  const targetDiv = document.querySelector(".header--cart--counter");
  if (productPanier === null) {
    panierLogo.classList.remove("text-warning");
    targetDiv.classList.add("hidden");

  } else if (productPanier.length === 0) {
    panierLogo.classList.remove("text-warning");
    targetDiv.classList.add("hidden");

  } else { 
      for (let n = 0; n < productPanier.length; n++){
        panierProductQuantity = productPanier[n].quantityCamera;
        calculTotalQuantityPanier.push(panierProductQuantity);
      }
      quantityTotal = calculTotalQuantityPanier.reduce(reducer);
      panierLogo.classList.add("text-warning");
      targetDiv.classList.remove("hidden");
      targetDiv.textContent = quantityTotal;
    };
}

// Envoi de la fiche produit dans le localstorage
function productToLocalstorage() {
  productPanier.push(product);
  localStorage.setItem("productPanier", JSON.stringify(productPanier));
}