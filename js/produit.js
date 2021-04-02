const cameraUrl_string = window.location.href;
const cameraUrl = new URL(cameraUrl_string);
const cameraUrlSpace = cameraUrl.searchParams.get("id");
const cameraUrlId = cameraUrlSpace.trim();




// Affichage de la caméra en fonction de l'Url
const showChoosenCameras = async() => {
	await getCameras();
    let choosenCamera = cameras.find(cameras => cameras['_id'] === cameraUrlId);
    results.innerHTML = (
        ` 
        <div class="col-12 mt-2">
            <div class="card camera-item mb-4 border-light shadow-lg product-page">
                <img class="camera-image card-img-top" alt="Appareil Photo Vintage" src="${choosenCamera.imageUrl}" />
                <div class="card-header bg-dark text-white">
                    <h1 class="card-title camera-name">${choosenCamera.name}</h1>
                </div>
                <div class="card-body camera-info">
                    <p class="card-text camera-description">${choosenCamera.description}</p>
                    <form>
                        <div class="alert alert-info alert-dismissible fade show mt-3" role="alert">
                            <h5 class="alert-heading">N'oubliez pas de choisir votre lentille!</h5>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
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
                    <p class=" card-text camera-prix font-weight-bold">${numberWithCommas("Prix :"+ " " + choosenCamera.price/100 + " € / unité")}</p>
                    <a href="../index.html" class="stretched-link btn btn-dark col-4">Retour à l'accueil</a>
                    <a href="./html/produit.html" class="stretched-link btn btn-dark col-4">Ajouter au panier</a>
                </div>
            </div>
        </div>
    `
    ); 
    // Affichage des lenses
    const resultsLenses = document.getElementById("cameraLenses");
    numberLenses = choosenCamera.lenses;
    for (let i = 0; i < numberLenses.length; i++) {
        let optionLens = document.createElement("option");
        resultsLenses.appendChild(optionLens);
        optionLens.textContent = choosenCamera.lenses[i];
    }
}; 


showChoosenCameras();
