function clearCart(){
    localStorage.clear();
    document.location.reload();
}

console.log(localStorage);

function removeFromCart(monid) {
    console.log("je vais supprimer");
    var idToDelete = monid.id;
    for (i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem(localStorage.key(i)) == idToDelete) {
            localStorage.removeItem(localStorage.key(i));
            document.location.reload();
            break;
        }
    }
}

var displayCart = new Promise(function(resolve,reject){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE ) {
            if (this.status == 200) {
                var response = JSON.parse(this.responseText);
                resolve(response);
            } else {
                reject(Error("Problème de requête"));
            }
        }
    }
    request.open("GET", "http://localhost:3000/api/teddies");
    request.send();
});

var eachPrice = 0;

displayCart.then(function(response){
    response.forEach(function(test){

        for (var i = 0; i < localStorage.length; i++) {
            if ((parseFloat(localStorage.key(i)) == parseInt(localStorage.key(i))) && !isNaN(localStorage.key(i))) {
                var localRecup = localStorage.getItem(localStorage.key(i));
                var tab = localRecup.split('/');

                var idRecup = tab[0];
                var colorRecup = tab[1];

                if (test._id == idRecup) {

                    /* Essai template */
                    var tempContainer = document.getElementById("cart__list");
                    var template = document.getElementById("cartTemp");

                    var clone = template.content.cloneNode(true);
                    var p = clone.querySelectorAll("p");
                    var image = clone.querySelector("img");
                    var icon = clone.querySelector("i");
                    image.setAttribute("src", test.imageUrl);
                    icon.setAttribute("id",localRecup);
                    icon.setAttribute("onclick","removeFromCart(this)");
                    console.log(localRecup);
                    p[0].textContent = test.name;
                    p[1].textContent = "Couleur : " + colorRecup;
                    var price = new String(test.price);
                    var newPrice = price.substring(0, price.length - 2);
                    p[2].textContent = "Prix : " + newPrice + " €";

                    tempContainer.appendChild(clone);

                    var parsePrice = parseInt(test.price);
                    eachPrice = eachPrice + parsePrice;
                    console.log(eachPrice);

                    var priceFinal = new String(eachPrice);
                    var newPriceFinal = priceFinal.substring(0, priceFinal.length - 2);
                    document.getElementById('totalPrice').innerHTML = newPriceFinal;
                }
            }
        }
    })
})