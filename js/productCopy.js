/* Récupération de l'id du produit via l'url */

console.log(localStorage);

var urlCurr = new URL(window.location.href);
var teddyW = urlCurr.searchParams.get("id");

var product = new Promise(function(resolve,reject){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status == 200) {
                var response = JSON.parse(this.responseText);
                resolve(response);
            }
            else {
                reject(Error("Problème de requête"));
            }
        }
    }
    request.open("GET","http://localhost:3000/api/teddies/" + teddyW);
    request.send();
})  
product.then(function(response){
    console.log("Promesse tenue / Affichage des produits")
    if (response._id == teddyW) {
        let title = document.getElementById('product__title').innerHTML = response.name;
        var startprice = new String(response.price);
        var newPrice = startprice.substring(0, startprice.length - 2);
        let price = document.getElementById('product__price').innerHTML = newPrice + " €";
        let desc = document.getElementById('product__desc').innerHTML = response.description;
        let img = document.getElementById('product__img').setAttribute("src", response.imageUrl);
        let proOption = document.getElementById("product__option");
        const newOption = document.createElement("option");
        newOption.innerHTML = 'Sélectionnez une couleur';
        proOption.appendChild(newOption);
        for (let i = 0; i < response.colors.length ; i++) {
            const newOption = document.createElement("option");
            newOption.innerHTML = response.colors[i];
            proOption.appendChild(newOption);
        }
    }
})

function addToCart(){
    var liste = document.getElementById("product__option");
    choice = liste.selectedIndex;

    var errorMessage = document.getElementById("errorMessage");

    if (choice != 0) {
        colorW = liste.options[liste.selectedIndex].text;

        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
          }
        
        var calcul = getRandomInt(100000);
    
        var idCart = calcul;
        teddyW = teddyW + '/' + colorW;
    
    
        console.log(idCart);
        console.log(teddyW);
        localStorage.setItem(idCart,teddyW);
        console.log("Item has been add to cart");
        teddyW = urlCurr.searchParams.get("id");
        console.log(localStorage);

        errorMessage.innerHTML = "";
        errorMessage.style.marginBottom = "";
    } else {
        console.log("choisissez une couleur");
        errorMessage.innerHTML = "Veuillez choisir une couleur";
        errorMessage.style.marginBottom = "24px";
    }
}