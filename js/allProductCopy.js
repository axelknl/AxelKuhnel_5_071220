var allProduct = new Promise(function(resolve,reject){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (request.status == 200) {
                var response = JSON.parse(this.responseText);
                resolve(response);
            } else {
                reject(Error("Problème de requête"));
            }
        } 
    }
    request.open("GET", "http://localhost:3000/api/teddies");
    request.send()
});
allProduct.then(function(response){
    console.log("Promesse tenue / Affichage des produits")
    response.forEach(function(test){

        /* Essai template */
        var tempContainer = document.getElementById("product");
        var template = document.getElementById("productTemp");

        var clone = template.content.cloneNode(true);
        var elContainer = clone.querySelector("a");
        var elDivImg = clone.querySelector("div");
        var elImg = clone.querySelector("img");
        var elName = clone.querySelector("h3");
        var elPrice = clone.querySelector("p");
        elContainer.setAttribute("id",test._id);
        elContainer.setAttribute("onclick","getID(this)");
        elImg.setAttribute("src", test.imageUrl)
        var price = new String(test.price);
        var newPrice = price.substring(0, price.length - 2);
        elName.innerHTML = test.name;
        elPrice.innerHTML = newPrice;

        tempContainer.appendChild(clone);
    })
})



function getID(monid) {
    var idtransfer = monid.id;
    window.location.href="productPage.html" + '?id=' + idtransfer;
}
