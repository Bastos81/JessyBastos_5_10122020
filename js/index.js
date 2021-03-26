const showCameras = async() => {
	await getCameras();
  
    results.innerHTML = (
  
        cameras
        .filter(camera => camera.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(camera => ( 

            ` 
                <div class="col-12 col-lg-4">
                    <div class="card camera-item mb-4 border-light shadow-lg product-index">
                        <img class="camera-image card-img-top" alt="Appareil Photo Vintage" src="${camera.imageUrl}" />
                        <div class="card-header bg-dark text-white">
                            <h5 class="card-title camera-name">${camera.name}</h5>
                        </div>
                        <div class="card-body camera-info">
                            <p class="card-text camera-description">${camera.description}</p>
                            <p class="card-text camera-prix font-weight-bold text-right">${numberWithCommas(camera.price/100 + " €")}</p>
                            <a href="./html/produit.html" class="stretched-link btn btn-dark camera-btn">Voir le produit</a>
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

