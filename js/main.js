//Cart Function

let carts = document.querySelectorAll('.add-cart');


//products listed in site
let products = [
    {
        name : 'Esprit Ruffle Shirt',
        tag : 'EspritRuffleShirt',
        price : 18,
        inCart : 0
    },
    {
        name : 'Herschel supply',
        tag : 'Herschelsupply',
        price : 35,
        inCart : 0
    }
]

//Event listener's and updation of cart
for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadcartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        $('div.icon-header-noti').attr("data-notify", productNumbers);
    }else{
        $('div.icon-header-noti').attr("data-notify", "0");
    }
}

//local storage functions
function cartNumbers (product){

    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        $('div.icon-header-noti').attr("data-notify", productNumbers + 1);
    } else {
        localStorage.setItem('cartNumbers', 1);
        $("div.icon-header-noti").attr("data-notify","1");
    }

    setItems(product);

}

//cart items updation
function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if(cartItems != null) {

        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag] : product
            }
        }
        cartItems[product.tag].inCart += 1;
        }else{
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    
    localStorage.setItem("productsInCart", JSON.stringify 
    (cartItems));
}

//updation of product price 
function totalCost(product) {
    //console.log("The product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');

    //console.log("My cartCost is", cartCost);
    //console.log(typeof cartCost);

    if (cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price );
    } else{
        localStorage.setItem("totalCost", product.price);
    }

    
    }


//Displaying in Cart
function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    let totalPrice = localStorage.getItem("totalCost");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.getElementById("product-cart");
    let menucartcontainer = document.getElementById("right-menu-cart");

    if (cartItems && productContainer){
        
        document.getElementById("sub-total").innerHTML = "&#8377; "+ totalPrice;
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
           
            


           
            //Item's Updating in Cart Page
            productContainer.innerHTML += 
                             `
								<tr class="table_row">
                                <td class="column-1">
                                    <div class="how-itemcart1 product">
                                        <img src="images/${item.tag}.jpg" alt="IMG">
                                    </div>
                                </td>
                                <td class="column-2"> ${item.name} </td>
                                <td class="column-3">&#8377; ${ item.price}</td>
                                 
                                <td class="column-4">
                                    <div class="wrap-num-product flex-w m-l-auto m-r-0">
                                        <div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m cart-minus">
                                            <i class="fs-16 zmdi zmdi-minus "></i>
                                        </div>

                                        <input class="mtext-104 cl3 txt-center num-product" type="number" name="product-num" value=${item.inCart} readonly style="cursor: default;">

                                        <div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m cart-plus">
                                            <i class="fs-16 zmdi zmdi-plus"></i>
                                        </div>
                                    </div>
                                </td>
                                <td class="column-5" name='' id='col5' > 
                                    <div name='product-sum' class='prd-sum'> &#8377; ${ item.inCart * item.price}</div>  
                                    
                                </td>
                                <td class="column-6" >
                                <div class='del delete-prdt'> <i class="zmdi zmdi-delete zmdi-hc-2x" ></i></div> 
                                </td>
                                
                                


                            </tr>


                            `;
        });
    }

   
    
}



function alter_totalCostandQty(price, isAdd){
    let cartCost = parseInt(localStorage.getItem('totalCost'));
    let cartQty = parseInt(localStorage.getItem('cartNumbers'));

    if (isAdd){
        totalPrice = cartCost + price;
        document.getElementById("sub-total").innerHTML = "&#8377; "+ totalPrice;
        
        cartQty += 1
        $('div.icon-header-noti').attr("data-notify", cartQty);
        
        localStorage.setItem("totalCost",  totalPrice);
        localStorage.setItem("cartNumbers",  cartQty);
        
    }
    else{
        totalPrice = cartCost - price;
        document.getElementById("sub-total").innerHTML = "&#8377; "+ totalPrice;
        
        cartQty -= 1
        $('div.icon-header-noti').attr("data-notify", cartQty);
        
        localStorage.setItem("totalCost",  totalPrice);
        localStorage.setItem("cartNumbers",  cartQty);
    }
    
}  

//let cart_icon = document.getElementsByClassName("js-show-cart");
$('.js-show-cart').on('click', function() {
    //console.log("Clicked!!!");
    //window.alert("Clicked");
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let menucartContainer = document.getElementById("right-menu-cart");
    menucartContainer.innerHTML = '';

    if(cartItems && menucartContainer)
    {
        Object.values(cartItems).map(item => {
        
        //Item's Updating in Right Menu Cart
        menucartContainer.innerHTML += 
        `
        <li class="header-cart-item flex-w flex-t m-b-12">
        <div class="header-cart-item-img">
            <img src="images/${item.tag}.jpg" alt="IMG">
        </div>

        <div class="header-cart-item-txt p-t-8">
            <a href="#" class="header-cart-item-name m-b-18 hov-cl1 trans-04">
            ${item.name}
            </a>

            <span class="header-cart-item-info">
            ${item.inCart} x ${item.price}
            </span>
        </div>
        </li>
        `;
    });
    }


});




$(document).ready( function cart_qty_change(){

     let cart_minus = document.querySelectorAll('.cart-minus');
     let cart_plus = document.querySelectorAll('.cart-plus');
     let prd_qty = document.getElementsByName('product-num');
     let prd_sum = document.getElementsByName('product-sum');
     let cartItems = localStorage.getItem('productsInCart');
     cartItems = JSON.parse(cartItems);

     if(cartItems){

     cart_values = Object.values(cartItems);
     //Event listener's and reduction of cart numbers 
     for (let i=0; i < cart_minus.length; i++){
         cart_minus[i].addEventListener('click', () => {
             //console.log("Clicked minus...");
             let qty = Number (prd_qty[i].value); 
             if(qty > 1) {
                 qty -= 1
                 prd_qty[i].value = qty;
                 total = Number(cart_values[i].price) * qty;
                 prd_sum[i].innerHTML = '&#8377; ' + total ;
                 cartItems[cart_values[i].tag]['inCart'] -= 1;              
                 localStorage.setItem("productsInCart", JSON.stringify (cartItems));
                 alter_totalCostandQty(cart_values[i].price,isAdd=false);                       
                }
             //console.log('clicked - minus' + cart_values[i].name);

         });

        //Event listener's and addition of cart numbers
         cart_plus[i].addEventListener('click', () => {
            //console.log("Clicked plus...");
            let qty = Number(prd_qty[i].value);  
            if(qty > 0){
                qty += 1;
                prd_qty[i].value = qty;
                prd_sum[i].innerHTML = '&#8377; '+ Number(cart_values[i].price) * qty;
                
                cartItems[cart_values[i].tag]['inCart'] += 1;
                localStorage.setItem("productsInCart", JSON.stringify (cartItems));
                alter_totalCostandQty(cart_values[i].price,isAdd=true);
           
            }   
            
             // console.log('clicked - plus' + cart_values[i].name);
              
         });
     }
    }
 });

 $(document).ready( function delete_product(){
     let del_prdt = document.querySelectorAll('.delete-prdt');
     let prd_div = document.querySelectorAll('.table_row');
     //localStorage.setItem("productsInCart", JSON.stringify (cartItems));
     

     for (let i=0; i < del_prdt.length; i++){
                
            del_prdt[i].addEventListener('click', () => {
                
                let price = parseInt();
                let qty = parseInt();
                let cartItems = localStorage.getItem("productsInCart");
                cartItems = JSON.parse(cartItems);
                cart_values = Object.values(cartItems);


                //console.log("cart_length"+ cart_values.length);
                if( cart_values.length === 1){
                    price = cart_values[0].price;
                    qty = cart_values[0].inCart;
                    //console.log(price,qty);
                    delete cartItems[cart_values[0].tag];
                    
                }
                else{
                    price = cart_values[i].price;
                    qty = cart_values[i].inCart;
                    delete cartItems[cart_values[i].tag];
                }
                let totalCost = localStorage.getItem("totalCost");
                totalCost -= parseInt(price) * parseInt(qty);
                document.getElementById("sub-total").innerHTML = "&#8377; "+ totalCost;

                let cartNumbers = localStorage.getItem("cartNumbers");
                cartNumbers -= parseInt(qty); 
                
                $('div.icon-header-noti').attr("data-notify", cartNumbers);
                localStorage.setItem("productsInCart", JSON.stringify (cartItems));
                localStorage.setItem("totalCost", JSON.stringify (totalCost));
                localStorage.setItem("cartNumbers", JSON.stringify (cartNumbers));

                prd_div[i].remove();
                //displayCart();

            });
    }


 });


// On PageReload Cart Numbers Should be Updated
onLoadcartNumbers();
displayCart();
//cart_qty_change();
//cartplus();

(function ($) {
    "use strict";

    /*[ Load page ]
    ===========================================================*/
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 1500,
        outDuration: 800,
        linkElement: '.animsition-link',
        loading: true,
        loadingParentElement: 'html',
        loadingClass: 'animsition-loading-1',
        loadingInner: '<div class="loader05"></div>',
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: [ 'animation-duration', '-webkit-animation-duration'],
        overlay : false,
        overlayClass : 'animsition-overlay-slide',
        overlayParentElement : 'html',
        transition: function(url){ window.location.href = url; }
    });
    
    /*[ Back to top ]
    ===========================================================*/
    var windowH = $(window).height()/2;

    $(window).on('scroll',function(){
        if ($(this).scrollTop() > windowH) {
            $("#myBtn").css('display','flex');
        } else {
            $("#myBtn").css('display','none');
        }
    });

    $('#myBtn').on("click", function(){
        $('html, body').animate({scrollTop: 0}, 300);
    });


    /*==================================================================
    [ Fixed Header ]*/
    var headerDesktop = $('.container-menu-desktop');
    var wrapMenu = $('.wrap-menu-desktop');

    if($('.top-bar').length > 0) {
        var posWrapHeader = $('.top-bar').height();
    }
    else {
        var posWrapHeader = 0;
    }
    

    if($(window).scrollTop() > posWrapHeader) {
        $(headerDesktop).addClass('fix-menu-desktop');
        $(wrapMenu).css('top',0); 
    }  
    else {
        $(headerDesktop).removeClass('fix-menu-desktop');
        $(wrapMenu).css('top',posWrapHeader - $(this).scrollTop()); 
    }

    $(window).on('scroll',function(){
        if($(this).scrollTop() > posWrapHeader) {
            $(headerDesktop).addClass('fix-menu-desktop');
            $(wrapMenu).css('top',0); 
        }  
        else {
            $(headerDesktop).removeClass('fix-menu-desktop');
            $(wrapMenu).css('top',posWrapHeader - $(this).scrollTop()); 
        } 
    });


    /*==================================================================
    [ Menu mobile ]*/
    $('.btn-show-menu-mobile').on('click', function(){
        $(this).toggleClass('is-active');
        $('.menu-mobile').slideToggle();
    });

    var arrowMainMenu = $('.arrow-main-menu-m');

    for(var i=0; i<arrowMainMenu.length; i++){
        $(arrowMainMenu[i]).on('click', function(){
            $(this).parent().find('.sub-menu-m').slideToggle();
            $(this).toggleClass('turn-arrow-main-menu-m');
        })
    }

    $(window).resize(function(){
        if($(window).width() >= 992){
            if($('.menu-mobile').css('display') == 'block') {
                $('.menu-mobile').css('display','none');
                $('.btn-show-menu-mobile').toggleClass('is-active');
            }

            $('.sub-menu-m').each(function(){
                if($(this).css('display') == 'block') { console.log('hello');
                    $(this).css('display','none');
                    $(arrowMainMenu).removeClass('turn-arrow-main-menu-m');
                }
            });
                
        }
    });


    /*==================================================================
    [ Show / hide modal search ]*/
    $('.js-show-modal-search').on('click', function(){
        $('.modal-search-header').addClass('show-modal-search');
        $(this).css('opacity','0');
    });

    $('.js-hide-modal-search').on('click', function(){
        $('.modal-search-header').removeClass('show-modal-search');
        $('.js-show-modal-search').css('opacity','1');
    });

    $('.container-search-header').on('click', function(e){
        e.stopPropagation();
    });


    /*==================================================================
    [ Isotope ]*/
    var $topeContainer = $('.isotope-grid');
    var $filter = $('.filter-tope-group');

    // filter items on button click
    $filter.each(function () {
        $filter.on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $topeContainer.isotope({filter: filterValue});
        });
        
    });

    // init Isotope
    $(window).on('load', function () {
        var $grid = $topeContainer.each(function () {
            $(this).isotope({
                itemSelector: '.isotope-item',
                layoutMode: 'fitRows',
                percentPosition: true,
                animationEngine : 'best-available',
                masonry: {
                    columnWidth: '.isotope-item'
                }
            });
        });
    });

    var isotopeButton = $('.filter-tope-group button');

    $(isotopeButton).each(function(){
        $(this).on('click', function(){
            for(var i=0; i<isotopeButton.length; i++) {
                $(isotopeButton[i]).removeClass('how-active1');
            }

            $(this).addClass('how-active1');
        });
    });

    /*==================================================================
    [ Filter / Search product ]*/
    $('.js-show-filter').on('click',function(){
        $(this).toggleClass('show-filter');
        $('.panel-filter').slideToggle(400);

        if($('.js-show-search').hasClass('show-search')) {
            $('.js-show-search').removeClass('show-search');
            $('.panel-search').slideUp(400);
        }    
    });

    $('.js-show-search').on('click',function(){
        $(this).toggleClass('show-search');
        $('.panel-search').slideToggle(400);

        if($('.js-show-filter').hasClass('show-filter')) {
            $('.js-show-filter').removeClass('show-filter');
            $('.panel-filter').slideUp(400);
        }    
    });




    /*==================================================================
    [ Cart ]*/
    $('.js-show-cart').on('click',function(){
        $('.js-panel-cart').addClass('show-header-cart');
    });

    $('.js-hide-cart').on('click',function(){
        $('.js-panel-cart').removeClass('show-header-cart');
    });

    /*==================================================================
    [ Cart ]*/
    $('.js-show-sidebar').on('click',function(){
        $('.js-sidebar').addClass('show-sidebar');
    });

    $('.js-hide-sidebar').on('click',function(){
        $('.js-sidebar').removeClass('show-sidebar');
    });

    /*==================================================================
    // [ +/- num product ]*/
    // $('.btn-num-product-down').on('click', function(){
    //     var numProduct = Number($(this).next().val());
    //     if(numProduct > 0) $(this).next().val(numProduct - 1);
    // });

    // $('.btn-num-product-up').on('click', function(){
    //     var numProduct = Number($(this).prev().val());
    //     $(this).prev().val(numProduct + 1);
    // });

    /*==================================================================
    [ Rating ]*/
    $('.wrap-rating').each(function(){
        var item = $(this).find('.item-rating');
        var rated = -1;
        var input = $(this).find('input');
        $(input).val(0);

        $(item).on('mouseenter', function(){
            var index = item.index(this);
            var i = 0;
            for(i=0; i<=index; i++) {
                $(item[i]).removeClass('zmdi-star-outline');
                $(item[i]).addClass('zmdi-star');
            }

            for(var j=i; j<item.length; j++) {
                $(item[j]).addClass('zmdi-star-outline');
                $(item[j]).removeClass('zmdi-star');
            }
        });

        $(item).on('click', function(){
            var index = item.index(this);
            rated = index;
            $(input).val(index+1);
        });

        $(this).on('mouseleave', function(){
            var i = 0;
            for(i=0; i<=rated; i++) {
                $(item[i]).removeClass('zmdi-star-outline');
                $(item[i]).addClass('zmdi-star');
            }

            for(var j=i; j<item.length; j++) {
                $(item[j]).addClass('zmdi-star-outline');
                $(item[j]).removeClass('zmdi-star');
            }
        });
    });
    
    /*==================================================================
    [ Show modal1 ]*/
    $('.js-show-modal1').on('click',function(e){
        e.preventDefault();
        $('.js-modal1').addClass('show-modal1');
    });

    $('.js-hide-modal1').on('click',function(){
        $('.js-modal1').removeClass('show-modal1');
    });

    /*[ Show modal2 ]*/
    $('.js-show-modal2').on('click',function(e){
        e.preventDefault();
        $('.js-modal2').addClass('show-modal2');
    });

    $('.js-hide-modal2').on('click',function(){
        $('.js-modal2').removeClass('show-modal2');
    });

    /*[ Show modal2 ]*/
    $('.js-show-modal3').on('click',function(e){
        e.preventDefault();
        $('.js-modal3').addClass('show-modal3');
    });

    $('.js-hide-modal3').on('click',function(){
        $('.js-modal3').removeClass('show-modal3');
    });

})(jQuery);