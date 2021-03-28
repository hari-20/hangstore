
// var script1 = document.createElement('script');
// script1.src = 'vendor/sweetalert/sweetalert.min.js';
// document.body.appendChild(script1);



$(document).ready( function addCart(){
//Cart Function
let carts = document.querySelectorAll('.add-cart');
// Selected Size list
let size = document.querySelectorAll('#size');
// Selected Product quantity
let qty = document.querySelectorAll('.num-product');

//Event listener's and updation of cart 

for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        setItems(products[i], size[i].value, Number(qty[i].value));  // adding selected Product description to local storage
        //cartNumbers(products[i]);
        totalCost(products[i], Number(qty[i].value));
    })
}

});



function onLoadcartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        $('div.icon-header-noti').attr("data-notify", productNumbers);
    }else{
        $('div.icon-header-noti').attr("data-notify", "0");
    }
}

//local storage functions
function cartNumbers (){

    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        $('div.icon-header-noti').attr("data-notify", productNumbers + 1);

    } else {
        localStorage.setItem('cartNumbers', 1);
        $("div.icon-header-noti").attr("data-notify","1");
    }


}

//cart items updation
function setItems(product, size, qty){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    

    prd = {
        name : '',
        id : '',
        price : 0,
        qty : 0,
        size : ''
    }

    size = size.slice(5, size.length).toUpperCase(); // Actual size is available after a space in string
    

    prd.size = size; // assigning user selected size 

    id = product.id + '-' + size;
    
    
    if(cartItems != null) {

        if(cartItems[id] == undefined){

            prd.name = product.name;
            prd.id = id;
            prd.price = product.price;
            cartItems = {
                ...cartItems,
                [id] : prd
            }

            cartNumbers();

         }
        
         cartItems[id].qty += qty;
        
        }

        else{
            
        //product_temp.id = product_temp.id + '-' + size; // unique product id for different sizes    
        //console.log('LocalStorage Not available' + id);
        cartNumbers();
        prd.name = product.name;
        prd.id = id;
        prd.price = product.price;

        prd.qty = qty;
        cartItems = {
            [id]: prd
        }
        
    }
    
    localStorage.setItem("productsInCart", JSON.stringify 
    (cartItems));
}

//updation of product price 
function totalCost(product, qty) {
    let cartCost = localStorage.getItem('totalCost');

    if (cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + (product.price * qty));
    } else{
        localStorage.setItem("totalCost", product.price * qty);
    }

    
    }


//Displaying in Cart
function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    let totalPrice = localStorage.getItem("totalCost");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.getElementById("product-cart");
    //let menucartcontainer = document.getElementById("right-menu-cart");

    if (cartItems && productContainer){
        document.getElementById("sub-total").innerHTML = "&#8377; "+ totalPrice;
        document.getElementById("cart-total").innerHTML = "&#8377; "+ totalPrice;
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
           
                
            let index = String(item.id).length - String(item.size).length - 1;
            let img_id = String(item.id).slice(0, index);
           
            //Item's Updating in Cart Page
            productContainer.innerHTML += 
                             `
								<tr class="table_row">
                                <td class="column-1">
                                    <div class="how-itemcart1 product">
                                        <img src="../static/images/${img_id}.jpg" alt="IMG">
                                    </div>
                                </td>
                                <td class="column-2"> <div class="prd-name">${item.name}</div>  <div class="prd-prop">size: ${item.size} | colour: white </div></td>
                                <td class="column-3">&#8377; ${ item.price}</td>
                                 
                                <td class="column-4">
                                    <div class="wrap-num-product flex-w m-l-auto m-r-0">
                                        <div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m cart-minus" onclick="cart_qty_change(this,'${String(item.id)}',false);">
                                            <i class="fs-16 zmdi zmdi-minus "></i>
                                        </div>

                                        <input class="mtext-104 cl3 txt-center num-product" type="number" name="product-num" value=${item.qty} readonly style="cursor: default;">

                                        <div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m cart-plus" onclick="cart_qty_change(this,'${String(item.id)}',true);">
                                            <i class="fs-16 zmdi zmdi-plus"></i>
                                        </div>
                                    </div>
                                </td>

                                <td class="column-5" name='' id='col5' > 
                                    <div name='product-sum' class='prd-sum'> &#8377; ${ item.qty * item.price}</div>  
            
                                </td>
                                <td class="column-6" >
                                <div class='del delete-prdt' onclick="removeCartItem(this,'${String(item.id)}');" > <i class="zmdi zmdi-delete zmdi-hc-2x" ></i></div> 
                                </td>
                                
                                


                            </tr>


                            `;
        });
    }

   
    
}

// On PageReload Cart Numbers Should be Updated
onLoadcartNumbers();
displayCart();

function alter_totalCost(price, isAdd){
    let cartCost = parseInt(localStorage.getItem('totalCost'));
    //let cartQty = parseInt(localStorage.getItem('cartNumbers'));

    if (isAdd){
        totalPrice = cartCost + price;
        document.getElementById("sub-total").innerHTML = "&#8377; "+ totalPrice;
        document.getElementById("cart-total").innerHTML = "&#8377; "+ totalPrice;
        // cartQty += 1
        // $('div.icon-header-noti').attr("data-notify", cartQty);
        
        localStorage.setItem("totalCost",  totalPrice);
        //localStorage.setItem("cartNumbers",  cartQty);
        
    }
    else{
        totalPrice = cartCost - price;
        document.getElementById("sub-total").innerHTML = "&#8377; "+ totalPrice;
        document.getElementById("cart-total").innerHTML = "&#8377; "+ totalPrice;
        
        //cartQty -= 1
        //$('div.icon-header-noti').attr("data-notify", cartQty);
        
        localStorage.setItem("totalCost",  totalPrice);
        //localStorage.setItem("cartNumbers",  cartQty);
    }
    
}  

// Display cart preview
$('.js-show-cart').on('click', function() {
    //console.log("Clicked!!!");
    //window.alert("Clicked");
    let cartCost = parseInt(localStorage.getItem('totalCost'));
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let menucartContainer = document.getElementById("right-menu-cart");
    menucartContainer.innerHTML = '';

    if(cartItems && menucartContainer)
    {
        Object.values(cartItems).map(item => {
        
        //Item's Updating in Right Menu Cart
        let img_id = String(item.id);
        let size = String(item.size);    
        let index = img_id.length - size.length - 1;
        img_id = img_id.slice(0, index);
        //console.log("Image name: "+ img_id);
        menucartContainer.innerHTML += 
        `
        <li class="header-cart-item flex-w flex-t m-b-12">
        <div class="header-cart-item-img">
            <img src="../static/images/${img_id}.jpg" alt="IMG">
        </div>

        <div class="header-cart-item-txt p-t-8">
            <a href="#" class="header-cart-item-name m-b-18 hov-cl1 trans-04">
            ${item.name}
            </a>

            <span class="header-cart-item-info">
            ${item.qty} x ${item.price}
            </span>
        </div>
        </li>
        `;
    });

    $('.header-cart-total').html('Total: &#8377;'+cartCost);
    }




});


// On qty change on product in cart

function cart_qty_change(e,itemId,isAdd){

     let cartItems = localStorage.getItem('productsInCart');
     cartItems = JSON.parse(cartItems);

     if(cartItems){

        let prd_qty;
        let prd_sum = $(e).parent().parent().next().children();

        if (isAdd) prd_qty = $(e).prev();
        else prd_qty = $(e).next();

        let qty = Number (prd_qty.val());

        if(qty > 1 && isAdd==false) {
            qty -= 1;
            prd_qty.attr('value', qty);
            total = Number(cartItems[itemId]['price']) * qty;
            prd_sum.html('&#8377; ' + total);
            cartItems[itemId]['qty'] -= 1;              
            localStorage.setItem("productsInCart", JSON.stringify (cartItems));
            alter_totalCost(cartItems[itemId]['price'], isAdd=false);                       
        }
        else if(qty >= 1 && isAdd==true){
            qty += 1;
            prd_qty.attr('value', qty);
            total = Number(cartItems[itemId]['price']) * qty;
            prd_sum.html('&#8377; ' + total);
            cartItems[itemId]['qty'] += 1;              
            localStorage.setItem("productsInCart", JSON.stringify (cartItems));
            alter_totalCost(cartItems[itemId]['price'], isAdd=true);   
        }

    }
}
// Delete items in cart

 function removeCartItem(e,itemId){
    let price = parseInt();
    let qty = parseInt();
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    price = cartItems[itemId].price;
    qty = cartItems[itemId].qty;
    
    delete cartItems[itemId];

    let totalCost = localStorage.getItem("totalCost");
    totalCost -= parseInt(price) * parseInt(qty);
    document.getElementById("sub-total").innerHTML = "&#8377; "+ totalCost;
    document.getElementById("cart-total").innerHTML = "&#8377; "+ totalCost;

    let cartNumbers = localStorage.getItem("cartNumbers");
    cartNumbers -= 1; 
    
    $('div.icon-header-noti').attr("data-notify", cartNumbers);
    localStorage.setItem("productsInCart", JSON.stringify (cartItems));
    localStorage.setItem("totalCost", JSON.stringify (totalCost));
    localStorage.setItem("cartNumbers", JSON.stringify (cartNumbers));

    $(e).closest('.table_row').remove();

    
 }






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
     [ +/- num product ]*/
     $('.btn-down').on('click', function(){
         var numProduct = Number($(this).next().val());
         if(numProduct > 1) $(this).next().val(numProduct - 1);
     });
     $('.btn-up').on('click', function(){
         var numProduct = Number($(this).prev().val());
         $(this).prev().val(numProduct + 1);
     });

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
    [ Show modals ]*/

    $(window).on('load', function () {
    for (let i=0; i<products.length; i++){
    let str = String(i+1);

    $('.js-show-modal'+str).on('click',function(e){
        e.preventDefault();
        $('.js-modal'+str).addClass('show-modal');
    });

    $('.js-hide-modal'+str).on('click',function(){
        $('.js-modal'+str).removeClass('show-modal');
    });
    
    } });

    // /*[ Show modal2 ]*/
    // $('.js-show-modal1').on('click',function(e){
    //     e.preventDefault();
    //     $('.js-modal1').addClass('show-modal1');
    // });

    // $('.js-hide-modal1').on('click',function(){
    //     $('.js-modal1').removeClass('show-modal1');
    // });

    /*[ Show modal3 ]*/
    // $('.js-show-modal3').on('click',function(e){
    //     e.preventDefault();
    //     $('.js-modal3').addClass('show-modal3');
    // });

    // $('.js-hide-modal3').on('click',function(){
    //     $('.js-modal3').removeClass('show-modal3');
    // });

    // Scripts to be included in webpage which helps for rendering product overview overlay
    // $(window).on('load', function () {

    //     /*---------------- Add to Wishlist-------------------*/

    //     $('.js-addwish-b2').on('click', function(e){
    //         console.log("Clicked");
    //         e.preventDefault();
    //     });

    //     $('.js-addwish-b2').each(function(){
    //         var nameProduct = $(this).parent().parent().find('.js-name-b2').html();
    //         $(this).on('click', function(){
    //             swal(nameProduct, "is added to wishlist !", "success");

    //             $(this).addClass('js-addedwish-b2');
    //             $(this).off('click');
    //         });
    //     });

    //     $('.js-addwish-detail').each(function(){
    //         var nameProduct = $(this).parent().parent().parent().find('.js-name-detail').html();

    //         $(this).on('click', function(){
    //             swal(nameProduct, "is added to wishlist !", "success");

    //             $(this).addClass('js-addedwish-detail');
    //             $(this).off('click');
    //         });
    //     });

    //     /*-------------------- Add to cart -------------------------*/

    //     $('.js-addcart-detail').each(function(){
    //         var nameProduct = $(this).parent().parent().parent().parent().find('.js-name-detail').html();
    //         $(this).on('click', function(){
    //             swal(nameProduct, "is added to cart !", "success");
    //         });
    //     });


    //     /*-------------------- Drop Down Select -------------------------*/

    //     $(".js-select2").each(function(){
    //         $(this).select2({
    //             minimumResultsForSearch: 20,
    //             dropdownParent: $(this).next('.dropDownSelect2')
    //         });
    //     });

    //     });
                //var cancelmodal = document.getElementById("myModalcancel");

				// Get the button that opens the modal
				//var cancelbtn = document.getElementById("myBtncancel");

				// Get the <span> element that closes the modal
				//var cancelspan = document.getElementsByClassName("cancelclose")[0];

				// When the user clicks the button, open the modal 
                // $('#myBtncancel').click (function cancelButton(event){
                //     console.log('working');
                //     var cancelmodal = document.getElementById("myModalcancel");
                //     cancelmodal.style.visibility = "visible";
                    // var cancelspan = document.getElementsByClassName("cancelclose")[0];
                    // cancelspan.onclick = function() {
                    //     cancelmodal.style.display = "none";
                    // }
                //     window.onclick = function(event) {
                //         if (event.target == cancelmodal) {
                //             cancelmodal.style.visibility = "visible";
                //         }
                //         }
                    
                // })

                //working of onclick cancel button


            let cancel = document.querySelectorAll('#myBtncancel');

            for (let i=0; i < cancel.length; i++){
                
                        cancel[i].addEventListener('click', () => { 
                            
                        $('.myModalcancel').addClass('cancel-modal-show');
                    
                        })
                    var cancelmodal = document.getElementById('working');
                    window.onclick = function(event) {
                        
                        if (event.target == cancelmodal) {
                            $('.myModalcancel').removeClass('cancel-modal-show');
                            
                        }
                        }

                        $('#btncancelno').click (function (){
                            $('.myModalcancel').removeClass('cancel-modal-show');
                        })
            }
                    
                //  cancelbtn.onclick = function() {
                //      cancelmodal.style.display = "block";
				//  }

				// When the user clicks on <span> (x), close the modal
				//  cancelspan.onclick = function() {
                //      cancelmodal.style.display = "none";
			    //  }

				// When the user clicks anywhere outside of the modal, close it
				//  window.onclick = function(event) {
				//  if (event.target == cancelmodal) {
				//  	cancelmodal.style.display = "none";
				//  }
				//  }

    function signedinCheck() {

        let userState = localStorage.getItem('userState');
        userState = JSON.parse(userState);
        if(userState){        
            
            $('.signin-out').html('Sign Out');
            $('.user-name').html('Hi, '+userState['user']['name']);
            $('.signin-out').attr('data-target','.signout-modal-sm');
            $('.signin-out').removeClass("js-signin-modal-trigger");
            $('.js-signin-modal').css('visibility','hidden');
            $('#signout-body').css('visibility','visible');
            $('#signout-msg').css('visibility', 'hidden');
            $('#signout-btn').attr('disabled', false);
            $('#signout-btn').css('cursor','pointer');

        }
      

    }
    
    $('#cart-form').submit (function userStatecheck(event){
        
        let userStatecheck = localStorage.getItem('userState');
        let country = document.forms["checkout-form"]["country"].value;
        let fullname = document.forms["checkout-form"]["fullname"].value;
        let mobilenumber = document.forms["checkout-form"]["mob-number"].value;
        let postcode = document.forms["checkout-form"]["postcode"].value;
        let address1 = document.forms["checkout-form"]["address1"].value;
        let address2 = document.forms["checkout-form"]["address2"].value;
        let landmark = document.forms["checkout-form"]["landmark"].value;
        let city = document.forms["checkout-form"]["city"].value;
        let state = document.forms["checkout-form"]["state"].value;
        let cartnumbers = localStorage.getItem('cartNumbers');
        let totalCost = localStorage.getItem('totalCost');
        let products = localStorage.getItem('productsInCart');
        
        
        event.preventDefault();
        if(userStatecheck==null){
            
            //window.alert('failed');
           // console.log("check failed");
            $('.js-signin-modal') .addClass('cd-signin-modal--is-visible');
            $('#signin-block') .addClass('cd-signin-modal__block--is-selected');
            $('#signin-switch') .addClass('cd-selected');
    }else{
        let post_url = "/checkout";
        $.ajax({
            url: post_url,
                contentType: 'application/json',
                dataType: "json",
                type: "POST",
                data: JSON.stringify({ n_items:cartnumbers, totalCost:totalCost, products_ordered:products ,country:country, name:fullname, mobile_num:mobilenumber, post_code: postcode, address_1:address1, address_2:address2, landmark:landmark, city:city, state:state}),
                success: function(response) {
                    let resp = JSON.parse(JSON.stringify(response));
                    if(resp.result == "errorder"){ 
                        
                        
                    }
            }
        })
    }
    });

    $('#signout-btn').on('click', function signout(){
        $(this).attr('disabled', true);
        $(this).css('cursor','no-drop');
        $('#signout-body').css('visibility','hidden');
        $('#signout-msg').css('visibility', 'visible');

        localStorage.removeItem('userState');

        setTimeout(() => { location.reload(); }, 2000);
        
    });
   
    $(window).on('load', signedinCheck());

    //Login and SignUp modal Overlay

    //Login/Signup modal window 
	function ModalSignin( element ) {
		this.element = element;
		this.blocks = this.element.getElementsByClassName('js-signin-modal-block');
		this.switchers = this.element.getElementsByClassName('js-signin-modal-switcher')[0].getElementsByTagName('a'); 
		this.triggers = document.getElementsByClassName('js-signin-modal-trigger');
		this.hidePassword = this.element.getElementsByClassName('js-hide-password');
		this.init();
	};

	ModalSignin.prototype.init = function() {
		var self = this;
		//open modal/switch form
		for(var i =0; i < this.triggers.length; i++) {
			(function(i){
				self.triggers[i].addEventListener('click', function(event){
					if( event.target.hasAttribute('data-signin') ) {
						event.preventDefault();
						self.showSigninForm(event.target.getAttribute('data-signin'));
					}
				});
			})(i);
		}

		//close modal
		this.element.addEventListener('click', function(event){
			if( hasClass(event.target, 'js-signin-modal') || hasClass(event.target, 'js-close') ) {
				event.preventDefault();
				removeClass(self.element, 'cd-signin-modal--is-visible');
			}
		});
		//close modal when clicking the esc keyboard button
		document.addEventListener('keydown', function(event){
			(event.which=='27') && removeClass(self.element, 'cd-signin-modal--is-visible');
		});

		//hide/show password
		for(var i =0; i < this.hidePassword.length; i++) {
			(function(i){
				self.hidePassword[i].addEventListener('click', function(event){
					self.togglePassword(self.hidePassword[i]);
				});
			})(i);
        } 
        

        function userLogin(email,username){
            //console.log("username: ", username);
            let userState = localStorage.getItem('userState');
            userState = JSON.parse(userState);
            if(userState){
                userState ['user']= {id:String(email), name:String(username)};
            }
            else userState = {'user': {id:String(email), name:String(username)} };

            localStorage.setItem('userState', JSON.stringify(userState));

        }


        function resendEmailverification(email, password){

            $.ajax({
                url: '/user-resend-verification',
                contentType: 'application/json',
                dataType: "json",
                type: "POST",
                data: JSON.stringify({email:email, pwd:password}),
                success: function(response) {
                    let resp = JSON.parse(JSON.stringify(response));
                    if(resp.result == "sent"){
                        $("#verify-msg").html("Verification mail has been sent again, please check your mail!");
                        $('[name="login-btn"]').attr('disabled',false);
                        $('[name="login-btn"]').css('cursor','pointer');
                    }
                    else{
                        $("#verify-msg").html("Invalid email address, please try registering a valid email address!");
                         $('[name="login-btn"]').attr('disabled',false);
                         $('[name="login-btn"]').css('cursor','pointer');
                    }
                },
                error: function(xhr) {
                    //Do Something to handle error
                        $("#verify-msg").html("Something went wrong, please try again!");
                         $('[name="login-btn"]').attr('disabled',false);
                         $('[name="login-btn"]').css('cursor','pointer');
                }
            });

        }

		//On submit the SignIn Form
		this.blocks[0].getElementsByTagName('form')[0].addEventListener('submit', function(event){
            event.preventDefault();
            $('.icon-loading').css('visibility','visible');
            $('[name="login-btn"]').attr('disabled',true);
            $('[name="login-btn"]').css('cursor','no-drop');

             let email = document.forms["signin-form"]["email"].value;
             let password = document.forms["signin-form"]["password"].value;
             let post_url = '/usersignin';

             $('#resend-mail').on('click', function(){
                    resendEmailverification(email, password);
             });

             $.ajax({
                url: post_url,
                contentType: 'application/json',
                dataType: "json",
                type: "POST",
                data: JSON.stringify({email:email, pwd:password}),
                success: function(response) {
                    let resp = JSON.parse(JSON.stringify(response));
                    if(resp.result == "success"){ 

                        self.showSigninForm('signin-status');
                        $("#signin-msg").html("Successfully Signed In!");

                        setTimeout(() => { removeClass(self.element, 'cd-signin-modal--is-visible'); }, 2000);
                
                         $('[name="login-btn"]').attr('disabled',false);
                         $('[name="login-btn"]').css('cursor','pointer');

                         userLogin(email,resp.username);
                         signedinCheck();
                    }
                    else if(resp.result == "notverified"){
                        self.showSigninForm('email-verify');
                        $("#verify-msg").html("Account not verified, please click on the link sent to your email to verify.");
                         $('[name="login-btn"]').attr('disabled',false);
                         $('[name="login-btn"]').css('cursor','pointer');
                    }
                    else if(resp.result == "err"){

                         self.showSigninForm('signup-verify');
                         $("#signup-msg").html("Email or Password incorrect, please enter a correct email/password!");
                         $('[name="login-btn"]').attr('disabled',false);
                         $('[name="login-btn"]').css('cursor','pointer');

                    }

                    $('.icon-loading').css('visibility','hidden');
    
                },
                error: function(xhr) {
                    //Do Something to handle error
                    self.showSigninForm('signin-status');
                        $("#signin-msg").html("Something went wrong, please try again!");
                         $('[name="login-btn"]').attr('disabled',false);
                         $('[name="login-btn"]').css('cursor','pointer');
                         $('.icon-loading').css('visibility','hidden');
                }
            });

            

    
        });

        //On Submitting the SignUp Form
		this.blocks[1].getElementsByTagName('form')[0].addEventListener('submit', function(event){
            event.preventDefault();
            $('.icon-loading').css('visibility','visible');
            $('[name="signup-btn"]').attr('disabled',true);
            $('[name="signup-btn"]').css('cursor','no-drop');

             let email = document.forms["signup-form"]["email"].value;
             let password = document.forms["signup-form"]["password"].value;
             let user_name = document.forms["signup-form"]["user-name"].value;
             let mob_number = document.forms["signup-form"]["mob-number"].value;

             let post_url = '/usersignup';

             $.ajax({
                url: post_url,
                contentType: 'application/json',
                dataType: "json",
                type: "POST",
                data: JSON.stringify({email:email, pwd:password, username:user_name, mobile: mob_number}),
                success: function(response) {
                    let resp = JSON.parse(JSON.stringify(response));
                    if(resp.result == "mail sent"){ 

                        self.showSigninForm('email-verify');
                        $("#verify-msg").html("A verification link has been sent to your email, please click on the link to verify your account.");
                         $('[name="login-btn"]').attr('disabled',false);
                         $('[name="login-btn"]').css('cursor','pointer');
                    }
                    else if(resp.result == "notvalid"){
                        self.showSigninForm('signin-status');
                        $("#verify-msg").html("Email address not valid, please try registering a valid email address!.");
                         $('[name="login-btn"]').attr('disabled',false);
                         $('[name="login-btn"]').css('cursor','pointer');
                    }
                    else if(resp.result == "Account already registered"){
                        self.showSigninForm('signup-verify');
                         $("#signup-msg").html("Account already registered, please signin to proceed!");
                         $('[name="login-btn"]').attr('disabled',false);
                         $('[name="login-btn"]').css('cursor','pointer');
                    }
                    else{
                        self.showSigninForm('signin-status');
                         $("#signin-msg").html("Something went wrong, please try again after reloading!");
                         $('[name="login-btn"]').attr('disabled',false);
                         $('[name="login-btn"]').css('cursor','pointer');
                    }
                    $('.icon-loading').css('visibility','hidden');
                },
                error: function(xhr) {
                    //Do Something to handle error
                    self.showSigninForm('signin-status');
                        $("#signin-msg").html("Something went wrong, please try again!");
                         $('[name="login-btn"]').attr('disabled',false);
                         $('[name="login-btn"]').css('cursor','pointer');
                         $('.icon-loading').css('visibility','hidden');
                }
            });

        });
        
        //On Submitting the Reset Password Form
		this.blocks[2].getElementsByTagName('form')[0].addEventListener('submit', function(event){
            event.preventDefault();
            $('.icon-loading').css('visibility','visible');
            $('[name="reset-pass-btn"]').attr('disabled',true);
            $('[name="reset-pass-btn"]').css('cursor','no-drop');

             let email = document.forms["forgot-pass-form"]["email"].value;
             let post_url = '/user-password-reset';

             $.ajax({
                url: post_url,
                contentType: 'application/json',
                dataType: "json",
                type: "POST",
                data: JSON.stringify({email:email}),
                success: function(response) {
                    let resp = JSON.parse(JSON.stringify(response));
                    if(resp.result == "mail sent"){ 

                        self.showSigninForm('signup-verify');
                        $("#signup-msg").html("A password reset link has been sent to your email, please click on the link to reset your account password.");
                         $('[name="login-btn"]').attr('disabled',false);
                         $('[name="login-btn"]').css('cursor','pointer');
                    }
                    else if(resp.result == "notfound"){
                        self.showSigninForm('signin-status');
                        $("#signin-msg").html("Email address not found, please try registering a valid email address!.");
                         $('[name="login-btn"]').attr('disabled',false);
                         $('[name="login-btn"]').css('cursor','pointer');
                    }
                    else{
                        self.showSigninForm('signin-status');
                         $("#signin-msg").html("Something went wrong, please try again after reloading!");
                         $('[name="login-btn"]').attr('disabled',false);
                         $('[name="login-btn"]').css('cursor','pointer');
                    }
                    $('.icon-loading').css('visibility','hidden');
                },
                error: function(xhr) {
                    //Do Something to handle error
                    self.showSigninForm('signin-status');
                        $("#signin-msg").html("Something went wrong, please try again!");
                         $('[name="login-btn"]').attr('disabled',false);
                         $('[name="login-btn"]').css('cursor','pointer');
                         $('.icon-loading').css('visibility','hidden');
                }
            });

		});
	};

	ModalSignin.prototype.togglePassword = function(target) {
        var password = $(target).prev();
		( 'password' == password.attr('type') ) ? password.attr('type', 'text') : password.attr('type', 'password');
		target.innerHTML = ( 'Hide' == target.innerHTML ) ? 'Show' : 'Hide';
		putCursorAtEnd(password);
	}

	ModalSignin.prototype.showSigninForm = function(type) {
		// show modal if not visible
		!hasClass(this.element, 'cd-signin-modal--is-visible') && addClass(this.element, 'cd-signin-modal--is-visible');
		// show selected form
		for( var i=0; i < this.blocks.length; i++ ) {
			this.blocks[i].getAttribute('data-type') == type ? addClass(this.blocks[i], 'cd-signin-modal__block--is-selected') : removeClass(this.blocks[i], 'cd-signin-modal__block--is-selected');
		}
		//update switcher appearance
		var switcherType = (type == 'signup') ? 'signup' : 'login';
		for( var i=0; i < this.switchers.length; i++ ) {
			this.switchers[i].getAttribute('data-type') == switcherType ? addClass(this.switchers[i], 'cd-selected') : removeClass(this.switchers[i], 'cd-selected');
		} 
	};

	ModalSignin.prototype.toggleError = function(input, bool) {
		// used to show error messages in the form
		toggleClass(input, 'cd-signin-modal__input--has-error', bool);
		toggleClass(input.nextElementSibling, 'cd-signin-modal__error--is-visible', bool);
	}

	var signinModal = document.getElementsByClassName("js-signin-modal")[0];
	if( signinModal ) {
		new ModalSignin(signinModal);
	}


	//class manipulations - needed if classList is not supported
	function hasClass(el, className) {
	  	if (el.classList) return el.classList.contains(className);
	  	else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	}
	function addClass(el, className) {
		var classList = className.split(' ');
	 	if (el.classList) el.classList.add(classList[0]);
	 	else if (!hasClass(el, classList[0])) el.className += " " + classList[0];
	 	if (classList.length > 1) addClass(el, classList.slice(1).join(' '));
	}
	function removeClass(el, className) {
		var classList = className.split(' ');
	  	if (el.classList) el.classList.remove(classList[0]);	
	  	else if(hasClass(el, classList[0])) {
	  		var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
	  		el.className=el.className.replace(reg, ' ');
	  	}
	  	if (classList.length > 1) removeClass(el, classList.slice(1).join(' '));
	}
	function toggleClass(el, className, bool) {
		if(bool) addClass(el, className);
		else removeClass(el, className);
	}

	function putCursorAtEnd(el) {
    	if (el.setSelectionRange) {
      		var len = el.value.length * 2;
      		el.focus();
      		el.setSelectionRange(len, len);
    	} else {
      		el.value = el.value;
    	}
    };
    
    


})(jQuery);
