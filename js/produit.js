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

// Vérification de la contenance du panier pour changement de couleur logo et ajout du nombre de produit au panier
colorPanier ();

// Affichage de la caméra en fonction de l'Url
const showChoosenCameras = async() => {
	await getCameras();
    // Permet de récupérer l'id du produit dans l'url
    let cameraUrlId;
    const cameraUrlIdSpace = getUrlPage.searchParams.get("id");
    // Permet de ne pas bloquer l'éxecution du code si l'Url ne contient aucun id
    if (cameraUrlIdSpace != null){
        cameraUrlId = cameraUrlIdSpace.trim();
    } else {
        console.log("Aucun produit sélectionné");
    }
    let choosenCamera = cameras.find(cameras => cameras._id === cameraUrlId);
    // Création du HTML
    // Si aucun id dans l'Url ou si il ne correspond à aucun produit présent dans l'api
    if (choosenCamera == null || cameraUrlIdSpace == null){
        results.innerHTML = 
        ` 
        <div class="col-12 mt-2">
            <div class="card mb-4 border-light shadow-lg product-page">
            <div class="card-header bg-dark text-white">
                <h1 class="card-title error-title">Aucun produit ne correspond à votre recherche</h1>
            </div>
            <div class="card-body error-info">
                <p class="card-text error-description">Mais rassurez-vous, nous en avons beaucoup d'autres!</p>
                <a href="../index.html" class="stretched-link btn btn-dark col-8">Retour à l'accueil</a>
            </div>
            </div>
        </div>
        ` ; 
    // Si l'id dans l'Url correspond à un produit présent dans l'api
    } else {
         results.innerHTML =
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
                                    // JS Affichage des lenses
                                    </select>
                                </div>
                                <div class="form-group row">
                                    <label for="quantity" class="col-sm-2 col-form-label">Quantité</label>
                                    <input class="col-sm-9" type="number" name="quantity" id="quantity" min="1" max="10" value="1">
                                </div>
                                <p class=" card-text camera-prix font-weight-bold">${numberWithCommas("Prix :"+ " " + choosenCamera.price/100 + " € / unité")}</p>
                                <a href="../index.html" class="mt-3 btn btn-dark col-10 col-md-4">Retour à l'accueil</a>
                                <button id="button-panier" class="mt-3 btn btn-dark col-10 col-md-4" type="submit">Ajouter au panier</button>
                                <a href="../html/panier.html" class="my-3 btn btn-warning col-10 col-md-8">Voir mon panier</a>
                            </form>
                        </div>
                    </div>
                </div>
            `;
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
            // identification des éléments
            let idCamera = choosenCamera._id;
            let nameCamera = choosenCamera.name;
            let resultsLensesChoice = document.getElementById('cameraLenses').value;
            let quantityCamera = Number(document.getElementById('quantity').value);
            let priceCamera = numberWithCommas(choosenCamera.price/100 + ",00 €");
            let totalPriceCamera = choosenCamera.price/100*quantityCamera;
            // Création du produit
            product = new CameraSelected (idCamera, nameCamera, resultsLensesChoice, quantityCamera, priceCamera, totalPriceCamera);
            // Vérification de la quantité saisie du produit
            const quantityProductRegex = /^(?:[1-9]|0[1-9]|10)$/;
            if (!quantityProductRegex.test(quantityCamera)) {
                alert("Merci de choisir une quantité entre 1 et 10") ;
            }
            // Si le panier est vide
            else if(productPanier === null){
                productPanier = []
                productToLocalstorage();
                alert("Le produit a bien été ajouté au panier!");
                window.location.reload();
            }
            // Si le panier a été vidé
            else if(productPanier.length === 0){
                productToLocalstorage();
                alert("Le produit a bien été ajouté au panier!");
                window.location.reload();
            }
            // Si le panier n'est pas vide
            else {
                // Création d'un tableau pour le calcul de la quantité totale d'un produit si il est déjà présent dans le tableau
                let calculTotalQuantity= []; 
                calculTotalQuantity.push(quantityCamera);
                let productRef = choosenCamera._id + ":" + document.getElementById('cameraLenses').value;
                // Déclaration du filtre pour repérer la présence d'un article identique dans le panier
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
                    productToLocalstorage();
                    alert("Le produit a bien été ajouté au panier!");
                    window.location.reload();
                }
                // Si le produit que l'on souhaite ajouter est déjà dans le panier
                else{
                    // Vérification que la quantité totale du produit ne dépasse pas 10
                    calculTotalQuantity.push(filteredProductQuantity);
                    const quantityTotal = calculTotalQuantity.reduce(reducer);
                    // si elle dépasse 10
                    if (!quantityProductRegex.test(quantityTotal)) {
                        alert("Vous ne pouvez pas acheter cet article à plus de 10 exemplaires") ;
                    } else {
                    // si elle ne dépasse pas 10
                    product.quantityCamera = quantityTotal;
                    product.totalPriceCamera = choosenCamera.price/100*quantityTotal;
                    productToLocalstorage();
                    productPanier = productPanier.filter(
                        (el) => el.idCamera + ":" + el.resultsLensesChoice + el.quantityCamera !== oldProduct
                    );
                    localStorage.setItem("productPanier", JSON.stringify(productPanier));
                    let quantityAlert = "Vous en avez maintenant " + quantityTotal + " dans le panier!"
                    alert(quantityAlert);
                    window.location.reload();
                    }
                }   
            }   
        })
    }   
}; 

showChoosenCameras();

