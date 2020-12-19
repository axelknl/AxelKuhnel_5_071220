$(document).ready(function(){
    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if (scroll > 100) {
          $(".header").css("background" , "white");
          $(".header").css("color" , "black");
          $(".header__product").css("background" , "white");  	
        }
        else{
            $(".header").css("color" , "white");
            $(".header").css("background" , "");  
            $(".header__product").css("background" , "");  	
        }
    })
  })