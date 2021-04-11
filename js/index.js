// Vérification de la contenance du panier pour changement de couleur logo et ajout du nombre de produit au panier
colorPanier ();

// Permet de récupérer l'url de la page
indexUrlPathname = getUrlPage.pathname;

// Création des map produit
const showCameras = async() => {
	await getCameras();
    let cameraFiltreIndex = cameras.filter(camera => camera.name.toLowerCase().includes(searchTerm.toLowerCase()));
    let cameraFiltreIndexNombre = cameraFiltreIndex.length;
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

// Permet de faire une recherche de produit
searchInput.addEventListener('input', (e) => {searchTerm = e.target.value;
  showCameras();
});

