const cameraUrl_string = window.location.href;
const cameraUrl = new URL(cameraUrl_string);
const cameraUrlSpace = cameraUrl.searchParams.get("id");
const cameraUrlId = cameraUrlSpace.trim();

const resultsLenses = document.getElementById("cameraLenses");
let cameraLenses;


// Affichage de la caméra en fonction de l'Url
const showChoosenCameras = async() => {
	await getCameras();
    results.innerHTML = (
            cameras
            .filter(camera => camera._id === cameraUrlId)
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
                                    <form>
                                        <div class="form-group">
                                            <label for="exampleFormControlSelect1">Objectif</label>
                                            <select class="form-control" id="cameraLenses">
                                                
                                            </select>
                                        </div>
                                    </form>

                                    <a href="../index.html" class="stretched-link btn btn-dark col-4">Retour à l'accueil</a>
                                    <a href="./html/produit.html" class="stretched-link btn btn-dark col-4">Ajouter au panier</a>
                                </div>
                            </div>
                        </div>
                    `
                )).join('')
    ); 
}; 


showChoosenCameras();

// Affichage de la caméra en fonction de l'Url
const selectLenses = async() => {
	await getCameras();
    resultsLenses.innerHTML = (
            cameraLenses
            .map(camera => ( 

                    ` 
                    <option>${camera.lenses[1]}</option>
                    `
                )).join('')
    ); 
}; 


showChoosenCameras();