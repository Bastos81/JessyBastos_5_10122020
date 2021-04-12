// Déclaration des constantes et des variables
const trierPar = document.getElementById("trier-par-select");
    // Valeur du tri ( - au + ou + au -)
let trierParValue;
    // Nouvel ordre d'affichage en fonction du tri
let resultDuTri;
let cameraFiltreIndex;

// Vérification de la contenance du panier pour changement de couleur logo et ajout du nombre de produit au panier
colorPanier ();

// Permet de récupérer l'url de la page
indexUrlPathname = getUrlPage.pathname;

// Création des map produit
const showCameras = async() => {
	await getCameras();
    // Création du filtre de la barre de recheche
    cameraFiltreIndex = cameras.filter(camera => camera.name.toLowerCase().includes(searchTerm.toLowerCase()));
    let cameraFiltreIndexNombre = cameraFiltreIndex.length;
    // Vérification de l'ordre d'affichage via l'option de triage
    trierMap();
    // Si la recherche ne correspond à aucun produit présent dans l'api
    if (cameraFiltreIndexNombre === 0) {
        results.innerHTML = 
        ` 
        <div class="col-12 mt-2">
            <div class="card mb-4 border-light shadow-lg product-page">
            <div class="card-header bg-dark text-white">
                <h1 class="card-title error-title">Aucun produit ne correspond à votre recherche</h1>
            </div>
            <div class="card-body error-info">
                <p class="card-text error-description">Mais rassurez-vous, nous en avons beaucoup d'autres!</p>
                <a href="index.html" class="stretched-link btn btn-dark col-8">Retour à l'accueil</a>
            </div>
            </div>
        </div>
        ` ; 
    // Affichage des map sans recherche ou si la recherche correspond à un produit présent dans l'api
    // et avec ou sans l'option de triage
    } else {
        results.innerHTML = (
            cameraFiltreIndex.map(camera => ( 
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

// Fonction permettant de changer l'ordre d'affichage des maps produits
function trierMap(){
    // Création d'objet temporaire qui contient les positions
        // par prix
    let mappedPrix = cameraFiltreIndex.map(function(e, i) {
        return { index: i, value: e.price};
    })
        // par ordre alphabétique
    let mappedAlpha = cameraFiltreIndex.map(function(e, i) {
        return { index: i, value: e.name};
    })
    if (trierParValue == "Prix croissant"){
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
        cameraFiltreIndex = mappedPrix.map(function(e){
        return cameraFiltreIndex[e.index];
        });
    } else if (trierParValue == "Prix décroissant"){
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
        cameraFiltreIndex = mappedPrix.map(function(e){
        return cameraFiltreIndex[e.index];
        });
    } else if (trierParValue == "Ordre alphabétique"){
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
        cameraFiltreIndex = mappedAlpha.map(function(e){
        return cameraFiltreIndex[e.index];
        });
    }    
}

// Ecoute de l'option de triage des maps
trierPar.addEventListener("change" , (event) =>{
    event.preventDefault();
    trierParValue = trierPar.options[trierPar.selectedIndex].text;
    showCameras();
})

// Permet de faire une recherche de produit par nom
searchInput.addEventListener('input', (e) => {searchTerm = e.target.value;
    showCameras();
});