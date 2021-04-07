const cameraUrl_string = window.location.href;
const cameraUrl = new URL(cameraUrl_string);
const cameraUrlSpace = cameraUrl.searchParams.get("id");
const cameraUrlId = cameraUrlSpace.trim();

// Création d'une classe de la caméra avec l'option et la quantité
class CameraSelected {
    constructor(idCamera, nameCamera, resultsLensesChoice, quantityCamera, priceCamera, totalPriceCamera) {
        this.idCamera = idCamera;
        this.nameCamera = nameCamera;
        this.resultsLensesChoice = resultsLensesChoice;
        this.quantityCamera = quantityCamera;
        this.priceCamera = priceCamera;
        this.totalPriceCamera = totalPriceCamera;
    }
}

// Affichage de la caméra en fonction de l'Url
const showChoosenCameras = async() => {
	await getCameras();
    let choosenCamera = cameras.find(cameras => cameras['_id'] === cameraUrlId);
    // Création du HTML
    results.innerHTML = (
        ` 
        <div class="col-12 mt-2">
            <div class="card camera-item mb-4 border-light shadow-lg product-page">
                <img class="camera-image card-img-top" alt="Appareil Photo Vintage" src="${choosenCamera.imageUrl}" />
                <div class="card-header bg-dark text-white">
                    <h1 id="camera-selected-name" class="card-title camera-name">${choosenCamera.name}</h1>
                </div>
                <div class="card-body camera-info">
                    <p class="card-text camera-description">${choosenCamera.description}</p>
                    <form class="needs-validation" novalidate>
                        <div class="alert alert-info alert-dismissible fade show mt-3" role="alert">
                            <h5 class="alert-heading">N'oubliez pas de choisir votre objectif!</h5>
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
                            <input class="col-sm-9" type="number" name="quantity" id="quantity" min="1" max="10" value="1">
                        </div>
                        <p class=" card-text camera-prix font-weight-bold">${numberWithCommas("Prix :"+ " " + choosenCamera.price/100 + " € / unité")}</p>
                        <a href="../index.html" class="btn btn-dark col-4">Retour à l'accueil</a>
                        <button id="button-panier" class="btn btn-dark col-4" type="submit">Ajouter au panier</button>
                        <a href="../html/panier.html" class="my-3 btn btn-dark col-8">Voir mon panier</a>
                    </form>
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
    
    // Ajout des articles au panier
    const envoyerPanier = document.getElementById("button-panier");

    envoyerPanier.addEventListener('click', (event) => {event.preventDefault();
        let productPanier = JSON.parse(localStorage.getItem("productPanier"));
        // identification des éléments
        let idCamera = choosenCamera._id;
        let nameCamera = choosenCamera.name;
        let resultsLensesChoice = document.getElementById('cameraLenses').value;
        let quantityCamera = Number(document.getElementById('quantity').value);
        let priceCamera = numberWithCommas(choosenCamera.price/100 + ",00 €");
        let totalPriceCamera = choosenCamera.price/100*quantityCamera;
        // Création du produit
        let product = new CameraSelected (idCamera, nameCamera, resultsLensesChoice, quantityCamera, priceCamera, totalPriceCamera);
        // Si le panier est vide
        if(productPanier === null){
            productPanier = []
            productPanier.push(product);
            localStorage.setItem("productPanier", JSON.stringify(productPanier));
            window.alert("Le produit a bien été ajouté au panier!");
        }
        // Si le panier a été vidé
        else if(productPanier === 0){
            productPanier.push(product);
            localStorage.setItem("productPanier", JSON.stringify(productPanier));
            window.alert("Le produit a bien été ajouté au panier!");
        }
        // Si le panier n'est pas vide
        else {
            // Création d'un tableau pour le calcul de la quantité totale d'un produit si il est déjà présent dans le tableau
            let calculTotalQuantity= []; 
            calculTotalQuantity.push(quantityCamera);
            let productRef = choosenCamera._id + ":" + document.getElementById('cameraLenses').value;
            const filteredProduct = productPanier.filter(
            (el) => el.idCamera + ":" + el.resultsLensesChoice === productRef
            );
            let filteredProductRef;
            let filteredProductQuantity;
            let oldProduct;
            // Création de la boucle pour vérifier si un produit est déjà présent dans le panier
            for (let q = 0; q < filteredProduct.length; q++){
                filteredProductRef = filteredProduct[q].idCamera + ":" + filteredProduct[q].resultsLensesChoice;
                filteredProductQuantity = filteredProduct[q].quantityCamera;
                oldProduct = filteredProduct[q].idCamera + ":" + filteredProduct[q].resultsLensesChoice + filteredProduct[q].quantityCamera;};
            // Si le produit que l'on souhaite ajouter n'est pas dans le panier
            if(productRef !== filteredProductRef){
                productPanier.push(product);
                localStorage.setItem("productPanier", JSON.stringify(productPanier));
                window.alert("Le produit a bien été ajouté au panier!");
            }
            // Si le produit que l'on souhaite ajouter est déjà dans le panier
            else{
            calculTotalQuantity.push(filteredProductQuantity);
            console.log(calculTotalQuantity);
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            const quantityTotal = calculTotalQuantity.reduce(reducer);
            product.quantityCamera = quantityTotal;
            product.totalPriceCamera = choosenCamera.price/100*quantityTotal;
            productPanier.push(product);
            localStorage.setItem("productPanier", JSON.stringify(productPanier));
            productPanier = productPanier.filter(
                (el) => el.idCamera + ":" + el.resultsLensesChoice + el.quantityCamera !== oldProduct
            );
            localStorage.setItem("productPanier", JSON.stringify(productPanier));
            let quantityAlert = "Vous en avez maintenant " + quantityTotal + " dans le panier!"
            window.alert(quantityAlert);
            }   
        }   
    })
}; 

showChoosenCameras();

