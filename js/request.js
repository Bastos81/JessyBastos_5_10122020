const searchInput = document.getElementById("search");
const results = document.getElementById("productList");
const panierLogo = document.getElementById("link-panier");

let searchTerm = '';
let cameras;

// Consultation de l'API
const getCameras = async() => {
	cameras = await fetch("http://localhost:3000/api/cameras")
    .then(res => res.json())
    .catch((error) => {
        errorMessage
      })
};

//Création d'un message d'erreur
const errorMessage = 
  results.innerHTML = 
      ` 
      <div class="col-12 mt-2">
          <div class="card camera-item mb-4 border-light shadow-lg product-page">
              <div class="card-header bg-dark text-white">
                <h1 class="card-title camera-name">Oups... Une erreur est survenue</h1>
              </div>
              <div class="card-body camera-info">
                <p class="card-text camera-description">Nos techniciens sont déjà au travail pour régler le problème!</p>
                <a href="../index.html" class="stretched-link btn btn-dark col-8">Retour à l'accueil</a>
              </div>
            </div>
      </div>
      ` ; 



// Permet de mettre un écart entre les chiffres
function numberWithCommas(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}