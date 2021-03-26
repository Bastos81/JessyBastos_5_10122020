const searchInput = document.getElementById("search");
const results = document.getElementById("productList");

let searchTerm = '';
let cameras;

const getCameras = async() => {
	cameras = await fetch("http://localhost:3000/api/cameras")
    .then(res => res.json())
    .catch((error) => {
        alert(
          "La connexion au serveur n'a pas pu être effectué. Nos développeurs travaillent certainement déjà à régler le problème!"
        )
      })
};