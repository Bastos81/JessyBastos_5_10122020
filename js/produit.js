const cameraUrl_string = window.location.href;
const cameraUrl = new URL(cameraUrl_string);
const cameraUrlSpace = cameraUrl.searchParams.get("id");
const cameraUrlId = cameraUrlSpace.trim();

const resultsLenses = document.getElementById("cameraLenses");


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
                                    <form>
                                        <div class="form-group row">
                                            <label for="cameraLenses" class="col-sm-2 col-form-label">Objectif</label>
                                            <select class="col-sm-9" id="cameraLenses">

                                            </select>
                                        </div>
                                        <div class="form-group row">
                                            <label for="quantity" class="col-sm-2 col-form-label">Quantité</label>
                                            <input class="col-sm-9" type="number" name="quantity" id="quantity" min="1" max="10">
                                        </div>
                                    </form>
                                    <p class="card-text camera-prix font-weight-bold">${numberWithCommas(camera.price/100 + " € / unité")}</p>
                                    <a href="../index.html" class="stretched-link btn btn-dark col-4">Retour à l'accueil</a>
                                    <a href="./html/produit.html" class="stretched-link btn btn-dark col-4">Ajouter au panier</a>
                                </div>
                            </div>
                        </div>
                    `
                )).join('')
    ); 
    // Affichage des lenses
    resultsLenses.innerHTML = (
        cameras
        .filter(camera => camera._id === cameraUrlId)
        .map(camera => ( 

            ` 
            <option>${camera.lenses[0]}</option>
            `
        )).join('')
    );
}; 


showChoosenCameras();
