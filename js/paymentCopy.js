const selectedCardType = document.getElementById("card__option");

function selectCard(){
    var select = document.getElementById("card__option").selectedIndex;
    var img = document.getElementById("cardType");
    if (select == 0) {
        img.setAttribute("src", "assets/visa_card.jpg");
    } else if (select == 1) {
        img.setAttribute("src", "assets/cb_card.jpg");
    } else {
        img.setAttribute("src", "assets/master_card.jpg");
    }
}

selectedCardType.addEventListener('change', (event) => {
    selectCard();
});

function payment(){

    const f_name = document.getElementById("firstname").value;
    const m_name = document.getElementById("name").value;
    const mail = document.getElementById("mail").value;
    const adress = document.getElementById("adress").value;
    const city = document.getElementById("city").value;
    const zipcode = document.getElementById("zipcode").value;

    var productList = new Array();

    for (var i = 0; i < localStorage.length; i++) {
        var localRecup = localStorage.getItem(localStorage.key(i));
        var tab = localRecup.split('/');
        productList.push(tab[0]);
    }


    var contacts = {
        "firstName" : f_name,
        "lastName" : m_name,
        "address" : adress,
        "city" : city,
        "email" : mail
    }

    var letters = /^[A-Za-z]+$/;

    var errorMessage = document.getElementById("errorMessage");

    if (localStorage.length != 0) {
        if (f_name != "" && m_name != "" && mail != "" && adress != "" && city != "" & zipcode != "") {
            if (f_name.match(letters) && m_name.match(letters)) {
                if (mail.includes("@")) {
                    var finalizePayment = new Promise(function(resolve, reject){
                        var request = new XMLHttpRequest();
                        request.onreadystatechange = function() {
                            if (this.readyState == XMLHttpRequest.DONE) {
                                if (this.status == 201) {
                                    var response = JSON.parse(request.responseText);
                                    resolve(response);
                                } else {
                                    reject(Error("Problème de requête"));
                                }
                            }
                        }
                    request.open("POST", "http://localhost:3000/api/teddies/order");
                    request.setRequestHeader("Content-Type", "application/json");
                    request.send(JSON.stringify({contact:contacts,products:productList}));  
                    });
                    finalizePayment.then(function(response){
                        localStorage.clear();
                    
                        localStorage.setItem("orderFirstName", response.contact.firstName);
                        localStorage.setItem("orderLastName", response.contact.lastName);
                        localStorage.setItem("orderAddress", response.contact.address);
                        localStorage.setItem("orderCity", response.contact.city);
                        localStorage.setItem("orderZip", document.getElementById("zipcode").value);
                        localStorage.setItem("orderEmail", response.contact.email);
                        localStorage.setItem("orderId", response.orderId);
                    
                        localStorage.setItem("orderTotalPrice", document.getElementById("totalPrice").innerHTML)
                    
                        for (var i = 0; i < response.products.length; i++) {
                            localStorage.setItem("products" + i, response.products[i]._id);
                        }
                    
                        localStorage.setItem("orderCardType", document.getElementById("card__option").selectedIndex);
                    
                        window.location.href="confirmation.html";
                    })
                } else {
                    console.log("il manque un @");
                    errorMessage.innerHTML = "L'adresse mail doit contenir un '@' ";
                }
            } else {
                console.log("le nom et prénom ne doivent contenir que des lettres");
                errorMessage.innerHTML = "Le nom et prénom ne doivent contenir que des lettres";
            }
        } else {
            console.log("Vous devez remplir tout les champs");
            errorMessage.innerHTML = "Vous devez remplir tout les champs";
        }
    } else {
        console.log("Votre panier est vide");
        errorMessage.innerHTML = "Votre panier est vide";
    }
}