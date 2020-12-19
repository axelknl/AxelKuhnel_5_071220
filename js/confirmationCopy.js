function orderIdDisplay(){
    var orderId = document.getElementsByClassName("order__id");
    for (i = 0; i < orderId.length; i++){
        orderId[i].innerHTML = "#" + localStorage.getItem("orderId");
    }
}

console.log(localStorage);

// window.onunload = function() {
//    localStorage.clear();
//}

function contactDisplay(){
    var firstname = document.getElementsByClassName("order__firstname");
    for (i = 0; i < firstname.length; i++){
        firstname[i].innerHTML = localStorage.getItem("orderFirstName");
    }

    var lastname = document.getElementsByClassName("order__lastname");
    for (i = 0; i < lastname.length; i++){
        lastname[i].innerHTML = localStorage.getItem("orderLastName");
    }

    var address = document.getElementsByClassName("order__address");
    for (i = 0; i < address.length; i++){
        address[i].innerHTML = localStorage.getItem("orderAddress");
    }

    var city = document.getElementsByClassName("order__city");
    for (i = 0; i < city.length; i++){
        city[i].innerHTML = localStorage.getItem("orderCity");
    }

    var zipcode = document.getElementsByClassName("order__zipcode");
    for (i = 0; i < zipcode.length; i++){
        zipcode[i].innerHTML = localStorage.getItem("orderZip");
    }

    var mail = document.getElementsByClassName("order__email");
    for (i = 0; i < mail.length; i++){
        mail[i].innerHTML = localStorage.getItem("orderEmail");
    }
}

function productDisplay(){
    for (i = 0; i < localStorage.length; i++){
        var test = localStorage.key(i);

        if (test.includes("products")) {

            var actualIdProduct = localStorage.getItem(localStorage.key(i));
            console.log(actualIdProduct);

            var product = new Promise(function(resolve, reject){
                var request = new XMLHttpRequest();
                request.onreadystatechange = function(){
                    if (this.readyState == XMLHttpRequest.DONE) {
                        if (this.status == 200 ) {
                            var response = JSON.parse(this.responseText);
                            resolve(response);
                        } else {
                            reject(Error("Problème de requête"));
                        }
                    }
                }
                request.open("GET", "http://localhost:3000/api/teddies/" + actualIdProduct);
                request.send();
            });
            product.then(function(response){
                var tempContainer = document.getElementById("orderList");
                var template = document.getElementById("orderTemp");

                var clone = template.content.cloneNode(true);
                var elContainer = clone.querySelector("a");
                var elDivImg = clone.querySelector("div");
                var elImg = clone.querySelector("img");
                var elName = clone.querySelector("h4");
                var elPrice = clone.querySelector("p");
                elImg.setAttribute("src", response.imageUrl)
                elName.innerHTML = response.name;
                var price = new String(response.price);
                var newPrice = price.substring(0, price.length - 2);
                elPrice.innerHTML = newPrice + " €";

                tempContainer.appendChild(clone);
            })
        }
    }
}

function getDate(){
    var date = new Date();
    document.getElementById("order__date").innerHTML = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    var date2 = new Date();
    date2.setDate(date2.getDate() + 1);
    document.getElementById("order__exp__date").innerHTML = date2.getDate() + "/" + (date2.getMonth() + 1) + "/" + date2.getFullYear();

}

function changeCardType(){
    var index = localStorage.getItem("orderCardType");
    var img = document.getElementById("cardType");
    var txt = document.getElementById("cardTypeDesc");
    if (index == 0) {
        img.setAttribute("src", "assets/visa_card.jpg");
        txt.innerHTML = "VISA Débit";
    } else if (index == 1) {
        img.setAttribute("src", "assets/cb_card.jpg");
        txt.innerHTML = "CARTE BLEUE Débit"
    } else {
        img.setAttribute("src", "assets/master_card.jpg");
        txt.innerHTML = "MASTERCARD Débit";
    }

    var productPrice = document.getElementById("productPrice");
    productPrice.innerHTML = " " + localStorage.getItem("orderTotalPrice") + " €";

    var totalPrice = document.getElementById("totalPrice");
    totalPrice.innerHTML = " " + document.getElementById("productPrice").innerHTML;
}

function leave(){
    localStorage.clear();
    window.location.href="index.html";
}

function main() {
    changeCardType();
    getDate();
    orderIdDisplay();
    contactDisplay();
    productDisplay();
}

main();