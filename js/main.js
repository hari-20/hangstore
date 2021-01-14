var imported = document.createElement('script');
imported.src = '/vendor/sweetalert/sweetalert.min.js';
document.head.appendChild(imported);

//Cart Function

let carts = document.querySelectorAll('.add-cart');

// Selected Size list

let size = document.querySelectorAll('#size');

//products listed in site
const products = [
    {
        name : 'Esprit Ruffle Shirt',
        tag : 'EspritRuffleShirt',
        price : 18,
        inCart : 0,
        size : ['S','M','L','XL'],
        colour: 'White',
        description: "Women's Round Neck T-shirt",
        category: 'women'
    },
    {
        name : 'Herschel supply',
        tag : 'Herschelsupply',
        price : 35,
        inCart : 0,
        size : ['S','M','L','XL'],
        colour: 'Half-White',
        description: "Women's Casual shirt",
        category: 'women'
    }
]

//Event listener's and updation of cart
for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        setItems(products[i], size[i].value);  // adding selected Product description to local storage
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

    console.log("Passing product tag:"+ product.tag);

}

//cart items updation
function setItems(product, size){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    

    prd = {
        name : '',
        tag : '',
        price : 0,
        inCart : 0,
        size : ''
    }

    size = size.slice(5, size.length).toUpperCase(); // Actual size is available after a space in string
    

    prd.size = size; // assigning user selected size 

    tag = product.tag + '-' + size;
    
    
    if(cartItems != null) {

        if(cartItems[tag] == undefined){

            prd.name = product.name;
            prd.tag = tag;
            prd.price = product.price;
            cartItems = {
                ...cartItems,
                [tag] : prd
            }
         }
        
         cartItems[tag].inCart += 1;
        
        }

        else{
            
        //product_temp.tag = product_temp.tag + '-' + size; // unique product tag for different sizes    
        console.log('LocalStorage Not available' + tag);
        prd.name = product.name;
        prd.tag = tag;
        prd.price = product.price;

        prd.inCart = 1;
        cartItems = {
            [tag]: prd
        }
    }
    
    localStorage.setItem("productsInCart", JSON.stringify 
    (cartItems));
}

//updation of product price 
function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

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
                                <td class="column-2"> <div class="prd-name">${item.name}</div>  <div class="prd-prop">size: ${item.size} | colour: white </div></td>
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



 //looping products in main page
 $(document).ready( function productsInPage(){
     let productdisp = document.getElementById('ProductPage');
     productdisp.innerHTML = ``;
     for (let i=0; i<products.length; i++){

        //Listing the available products

         productdisp.innerHTML+=
         `
         <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item ${products[i].category}">
         <!-- Block2 -->
         <div class="block2">
             <div class="block2-pic hov-img0">
                 <img src="images/${products[i].tag}.jpg" alt="IMG-PRODUCT">

                 <a href="#" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal${i+1}">
                     Quick View
                 </a>
             </div>

             <div class="block2-txt flex-w flex-t p-t-14">
                 <div class="block2-txt-child1 flex-col-l ">
                     <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                         ${products[i].name}
                     </a>

                     <span class="stext-105 cl3">
                     &#8377; ${products[i].price}
                     </span>
                 </div>

                 <div class="block2-txt-child2 flex-r p-t-3">
                     <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                         <img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON">
                         <img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON">
                     </a>
                 </div>
             </div>
         </div>
     </div>

         `;

        //Listing the product overview overlay

//         document.body.innerHTML += `
        
//         <!-- Modal  -->
// <div class="wrap-modal js-modal${i+1} p-t-60 p-b-20">
// 	<div class="overlay-modal js-hide-modal${i+1}"></div>

// 	<div class="container">
// 		<div class="bg0 p-t-60 p-b-30 p-lr-15-lg how-pos3-parent">
// 			<button class="how-pos3 hov3 trans-04 js-hide-modal${i+1}">
// 				<img src="images/icons/icon-close.png" alt="CLOSE">
// 			</button>

// 			<div class="row">
// 				<div class="col-md-6 col-lg-7 p-b-30">
// 					<div class="p-l-25 p-r-30 p-lr-0-lg">
// 						<div class="wrap-slick3 flex-sb flex-w">
// 							<div class="wrap-slick3-dots"></div>
// 							<div class="wrap-slick3-arrows flex-sb-m flex-w"></div>

// 							<div class="slick3 gallery-lb">
// 								<div class="item-slick3" data-thumb="images/product-02.jpg">
// 									<div class="wrap-pic-w pos-relative">
// 										<img src="images/${products[i].tag}.jpg" alt="IMG-PRODUCT">

// 										<a class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href="images/${products[i].tag}.jpg">
// 											<i class="fa fa-expand"></i>
// 										</a>
// 									</div>
// 								</div>

// 								<div class="item-slick3" data-thumb="images/product-02.jpg">
// 									<div class="wrap-pic-w pos-relative">
// 										<img src="images/${products[i].tag}.jpg" alt="IMG-PRODUCT">

// 										<a class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href="images/${products[i].tag}.jpg">
// 											<i class="fa fa-expand"></i>
// 										</a>
// 									</div>
// 								</div>

// 								<div class="item-slick3" data-thumb="images/${products[i].tag}.jpg">
// 									<div class="wrap-pic-w pos-relative">
// 										<img src="images/${products[i].tag}.jpg" alt="IMG-PRODUCT">

// 										<a class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href="images/${products[i].tag}.jpg">
// 											<i class="fa fa-expand"></i>
// 										</a>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
				
// 				<div class="col-md-6 col-lg-5 p-b-30">
// 					<div class="p-r-50 p-t-5 p-lr-0-lg">
// 						<h4 class="mtext-105 cl2 js-name-detail p-b-14">
//                         ${products[i].name}
// 						</h4>

// 						<span class="mtext-106 cl2">
//                         &#8377; ${products[i].price}
// 						</span>

// 						<p class="stext-102 cl3 p-t-23">
//                         ${products[i].description}
// 						</p>
						
// 						<!--  -->
// 						<div class="p-t-33">
// 							<div class="flex-w flex-r-m p-b-10">
// 								<div class="size-203 flex-c-m respon6">
// 									Size
// 								</div>

// 								<div class="size-204 respon6-next">
// 									<div class="rs1-select2 bor8 bg0">
// 										<select class="js-select2" name="time" id="size">
// 											<!-- <option>Choose an option</option> -->
// 											<option>Size ${products[i].size[0]}</option>
// 											<option>Size ${products[i].size[1]}</option>
// 											<option>Size ${products[i].size[2]}</option>
// 											<option>Size ${products[i].size[3]}</option>
// 										</select>
// 										<div class="dropDownSelect2"></div>
// 									</div>
// 								</div>
// 							</div>

// 							<div class="flex-w flex-r-m p-b-10">
// 								<div class="size-203 flex-c-m respon6">
// 									Color
// 								</div>

// 								<div class="size-204 respon6-next">
//                                 ${products[i].colour}

// 								</div>
// 							</div>

// 							<div class="flex-w flex-r-m p-b-10">
// 								<div class="size-204 flex-w flex-m respon6-next">
// 									<div class="wrap-num-product flex-w m-r-20 m-tb-10">
// 										<div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
// 											<i class="fs-16 zmdi zmdi-minus"></i>
// 										</div>

// 										<input class="mtext-104 cl3 txt-center num-product" type="number" name="num-product" value="1">

// 										<div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
// 											<i class="fs-16 zmdi zmdi-plus"></i>
// 										</div>
// 									</div>

// 									<button class="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail add-cart">
// 										Add to cart
// 									</button>
// 								</div>
// 							</div>	
// 						</div>

// 						<!--  -->
// 						<div class="flex-w flex-m p-l-100 p-t-40 respon7">
// 							<div class="flex-m bor9 p-r-10 m-r-11">
// 								<a href="#" class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100" data-tooltip="Add to Wishlist">
// 									<i class="zmdi zmdi-favorite"></i>
// 								</a>
// 							</div>

// 							<a href="#" class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Facebook">
// 								<i class="fa fa-facebook"></i>
// 							</a>

// 							<a href="#" class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Twitter">
// 								<i class="fa fa-twitter"></i>
// 							</a>

// 							<a href="#" class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Google Plus">
// 								<i class="fa fa-google-plus"></i>
// 							</a>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	</div>
// </div>

//         `;



     }
    



});


$(document).ready( function(){
 /* Add to Wishlist*/

 $('.js-addwish-b2').on('click', function(e){
    console.log("Clicked");
    e.preventDefault();
});

$('.js-addwish-b2').each(function(){
    var nameProduct = $(this).parent().parent().find('.js-name-b2').html();
    $(this).on('click', function(){
        swal(nameProduct, "is added to wishlist !", "success");

        $(this).addClass('js-addedwish-b2');
        $(this).off('click');
    });
});

$('.js-addwish-detail').each(function(){
    var nameProduct = $(this).parent().parent().parent().find('.js-name-detail').html();

    $(this).on('click', function(){
        swal(nameProduct, "is added to wishlist !", "success");

        $(this).addClass('js-addedwish-detail');
        $(this).off('click');
    });
});

/*---------------------------------------------*/

$('.js-addcart-detail').each(function(){
    var nameProduct = $(this).parent().parent().parent().parent().find('.js-name-detail').html();
    $(this).on('click', function(){
        swal(nameProduct, "is added to cart !", "success");
    });
});

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

    for (let i=0; i<products.length; i++){
    
    let str = String(i+1);
    
    $('.js-show-modal'+str).on('click',function(e){
        e.preventDefault();
        $('.js-modal'+str).addClass('show-modal');
    });

    $('.js-hide-modal'+str).on('click',function(){
        $('.js-modal'+str).removeClass('show-modal');
    });
    
}

    /*[ Show modal2 ]*/
    $('.js-show-modal2').on('click',function(e){
        e.preventDefault();
        $('.js-modal2').addClass('show-modal2');
    });

    $('.js-hide-modal2').on('click',function(){
        $('.js-modal2').removeClass('show-modal2');
    });

    /*[ Show modal3 ]*/
    $('.js-show-modal3').on('click',function(e){
        e.preventDefault();
        $('.js-modal3').addClass('show-modal3');
    });

    $('.js-hide-modal3').on('click',function(){
        $('.js-modal3').removeClass('show-modal3');
    });

   


})(jQuery);