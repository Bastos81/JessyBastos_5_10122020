const showCameras = async() => {
	await getCameras();
  
    results.innerHTML = (
  
        cameras
        .filter(camera => camera.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(camera => ( 

            ` 
                <div class="col-12 mt-2">
                    <div class="card camera-item mb-4 border-light shadow-lg product-page">
                        <img class="camera-image card-img-top" alt="Appareil Photo Vintage" src="${camera.imageUrl}" />
                        <div class="card-header bg-dark text-white">
                            <h1 class="card-title camera-name">${camera.name}</h1>
                        </div>
                        <div class="card-body camera-info">
                            <p class="card-text camera-description">${camera.description}</p>
                            <p class="card-text camera-prix font-weight-bold">${numberWithCommas(camera.price/100 + " €")}</p>


                            <a href="../index.html" class="stretched-link btn btn-dark col-4">Retour à l'accueil</a>
                            <a href="./html/produit.html" class="stretched-link btn btn-dark col-4">Ajouter au panier</a>
                        </div>
                    </div>
                </div>
            `
        )).join('')
    );
}; 

showCameras();

searchInput.addEventListener('input', (e) => {searchTerm = e.target.value;
  showCameras();	
});
  
function numberWithCommas(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}