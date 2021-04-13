// Déclaration des constantes et des variables
const trierPar = document.getElementById("trier-par-select");
const filtrerPar = document.getElementById("filtrer-par-select");
    // Valeur du tri ( - au + ou + au - ou alphabétique)
let trierParValue;
    // Valeur du filtre (tranche de prix)
let filtrerParValue;
    // Nouvel ordre d'affichage en fonction du tri
let cameraIndex;

// Vérification de la contenance du panier pour changement de couleur logo et ajout du nombre de produit au panier
colorPanier ();

// Permet de récupérer l'url de la page
indexUrlPathname = getUrlPage.pathname;

//------------------------------Index fonctions principales------------------------------//
// Création des map produit
const showCameras = async() => {
	await getCameras();
    // Filtre de la barre de recheche
    cameraIndex = cameras.filter(camera => camera.name.toLowerCase().includes(searchTerm.toLowerCase()));
    // Filtre "filtrer par tranche de prix"
    filtrerMap();
    // Vérification de l'ordre d'affichage via l'option de triage
    trierMap();
    // Si la recherche ne correspond à aucun produit présent dans l'api
    let cameraIndexNombre = cameraIndex.length;
    if (cameraIndexNombre === 0) {
        results.innerHTML = 
        ` 
        <div class="col-12 mt-2">
            <div class="card mb-4 border-light shadow-lg product-page">
            <div class="card-header bg-dark text-white">
                <h1 class="card-title error-title">Aucun produit ne correspond à votre recherche</h1>
            </div>
            <div class="card-body error-info">
                <p class="card-text error-description">Nous vous invitons à vérifier chaque élément de votre recherche</p>
                <p class="card-text error-description">Sinon rassurez-vous, nous avons beaucoup d'autres produits!</p>
                <a href="index.html" class="stretched-link btn btn-warning col-8">Réinitialiser ma recherche</a>
            </div>
            </div>
        </div>
        ` ; 
    // Affichage des map sans recherche ou si la recherche correspond à un produit présent dans l'api
    // et avec ou sans l'option de triage
    } else {
        results.innerHTML = (
            cameraIndex.map(camera => ( 
                ` 
                    <div class="col-12 col-lg-4">
                        <div class="card camera-item mb-4 border-light rounded shadow-lg product-index">
                            <img class="camera-image card-img-top" alt="Appareil Photo Vintage" src="${camera.imageUrl}" />
                            <div class="card-header bg-dark text-white">
                                <h5 class="card-title camera-name">${camera.name}</h5>
                            </div>
                            <div class="card-body camera-info">
                                <p class="card-text camera-description">${camera.description}</p>
                                <p class=" card-text camera-prix font-weight-bold">${numberWithCommas("Prix :"+ " " + camera.price/100 + " € / unité")}</p>
                                <a href="./html/produit.html?id= ${camera._id}" class="stretched-link btn btn-dark camera-btn">Voir le produit</a>
                            </div>
                        </div>
                    </div>
                `
            )).join('')
        );
    } 
}; 

showCameras();

//------------------------------Fonction de tri------------------------------//

// Fonction permettant de changer l'ordre d'affichage des maps produits
function trierMap(){
    // Création d'objet temporaire qui contient les positions
        // par prix
    let mappedPrix = cameraIndex.map(function(e, i) {
        return { index: i, value: e.price};
    })
        // par ordre alphabétique
    let mappedAlpha = cameraIndex.map(function(e, i) {
        return { index: i, value: e.name};
    })
    if (trierParValue == 1){
        mappedPrix.sort(function(a, b) {
            if (a.value > b.value) {
                return 1;
            }
            if (a.value < b.value) {
                return -1;
            }
            return 0;
            });
          
        // Nouvel ordre d'affichage par prix croissant
        cameraIndex = mappedPrix.map(function(e){
        return cameraIndex[e.index];
        });
    } else if (trierParValue == 2){
        mappedPrix.sort(function(a, b) {
            if (b.value > a.value) {
                return 1;
            }
            if (b.value < a.value) {
                return -1;
            }
            return 0;
            });
          
        // Nouvel ordre d'affichage par prix décroissant
        cameraIndex = mappedPrix.map(function(e){
        return cameraIndex[e.index];
        });
    } else if (trierParValue == 3){
        mappedAlpha.sort(function(a, b) {
            if (a.value > b.value) {
                return 1;
            }
            if (a.value < b.value) {
                return -1;
            }
            return 0;
            });
          
        // Nouvel affichage par ordre alphabétique
        cameraIndex = mappedAlpha.map(function(e){
        return cameraIndex[e.index];
        });
    }    
}

// Ecoute de l'option de triage des maps
trierPar.addEventListener("change" , (event) =>{
    event.preventDefault();
    trierParValue = trierPar.options[trierPar.selectedIndex].value;
    showCameras();
})

//------------------------------Fonctions de filtres------------------------------//

// Barre de recherche - Permet de faire une recherche de produit par nom
searchInput.addEventListener('input', (e) => {searchTerm = e.target.value;
    showCameras();
});

// Fonction de fitre par tranche de prix
function filtrerMap(){
    let tranche1 = 150000;
    let tranche2 = 300000;
    if(filtrerParValue == 1){
        cameraIndex = cameraIndex.filter(camera => camera.price < tranche1);
    } else if (filtrerParValue == 2){
        cameraIndex = cameraIndex.filter(camera => camera.price > tranche1 && camera.price < tranche2);
    } else if (filtrerParValue == 3){
        cameraIndex = cameraIndex.filter(camera => camera.price > tranche2);
    }
}

// Ecoute de l'option de filtrage par tranche de prix
filtrerPar.addEventListener("change" , (event) =>{
    event.preventDefault();
    filtrerParValue = filtrerPar.options[filtrerPar.selectedIndex].value;
    showCameras();
})