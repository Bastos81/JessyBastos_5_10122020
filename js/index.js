const searchInput = document.getElementById("search");
const results = document.getElementById("productList");

let searchTerm = '';
let cameras;

const getCameras = async() => {
	cameras = await fetch("http://localhost:3000/api/cameras")
    .then(res => res.json());
};

const showCameras = async() => {
	await getCameras();
  
    results.innerHTML = (
  
        cameras
        .filter(camera => camera.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(camera => ( 

            ` 
                <div class="col-12 col-lg-4">
                    <div class="card camera-item mb-4 border-light shadow-lg">
                        <img class="camera-image card-img-top" src="${camera.imageUrl}" />
                        <div class="card-body camera-info">
                            <h5 class="card-title camera-name">${camera.name}</h5>
                            <p class="card-text camera-description">${camera.description}</p>
                            <p class="card-text camera-prix">${numberWithCommas(camera.price/100 + " €")}</p>
                            <a href="#" class="btn btn-dark stretched-link">Voir le produit</a>
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