const allFilterItems = document.querySelectorAll('.filter-item');
const allFilterBtns = document.querySelectorAll('.filter-btn');

window.addEventListener('DOMContentLoaded', () => {
    allFilterBtns[0].classList.add('active-btn');
});

allFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        showFilteredContent(btn);
    });
});

function showFilteredContent(btn) {
    allFilterItems.forEach((item) => {
        if (item.classList.contains(btn.id)) {
            resetActiveBtn();
            btn.classList.add('active-btn');
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}




function resetActiveBtn() {
    allFilterBtns.forEach((btn) => {
        btn.classList.remove('active-btn');
    });
}



//header ko lagi 


let searchform = document.querySelector('.search-form');

document.querySelector('#search-bth').onclick = () => {
    searchform.classList.toggle('active');
    // shoppingCrat.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}


let loginForm = document.querySelector('.login-form');

document.querySelector('#login-bth').onclick = () => {
    loginForm.classList.toggle('active');
    searchform.classList.remove('active');
    //shoppingCrat.classList.remove('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-bth').onclick = () => {
    navbar.classList.toggle('active');
    searchform.classList.remove('active');
    // shoppingCrat.classList.remove('active');
    loginForm.classList.remove('active');

}

window.onscroll = () => {
    searchform.classList.remove('active');
    //shoppingCrat.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');

}

//cart menu

const btnCart = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const btnClose = document.querySelector('#cart-close');

btnCart.addEventListener('click', () => {
    cart.classList.add('cart-active');
});

btnClose.addEventListener('click', () => {
    cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded', loadFood);

function loadFood() {
    loadContent();

}

function loadContent() {
    //Remove Food Items  From Cart
    let btnRemove = document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btn) => {
        btn.addEventListener('click', removeItem);
    });

    //Product Item Change Event
    let qtyElements = document.querySelectorAll('.cart-quantity');
    qtyElements.forEach((input) => {
        input.addEventListener('change', changeQty);
    });

    //Product Cart

    let cartBtns = document.querySelectorAll('.add-cart');
    cartBtns.forEach((btn) => {
        btn.addEventListener('click', addCart);
    });

    updateTotal();
}


//Remove Item
function removeItem() {
    if (confirm('Are Your Sure to Remove')) {
        let title = this.parentElement.querySelector('.cart-food-title').innerHTML;
        itemList = itemList.filter(el => el.title != title);
        this.parentElement.remove();
        loadContent();
    }
}

//Change Quantity
function changeQty() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    loadContent();
}

let itemList = [];

//Add Cart
function addCart() {
    let food = this.parentElement;
    let title = food.querySelector('.food-title').innerHTML;
    let price = food.querySelector('.new-price').innerHTML;
    let imgSrc = food.querySelector('.item-img').src;
    //console.log(title,price,imgSrc);

    let newProduct = { title, price, imgSrc }

    //Check Product already Exist in Cart
    if (itemList.find((el) => el.title == newProduct.title)) {
        alert("Product Already added in Cart");
        return;
    } else {
        itemList.push(newProduct);
    }


    let newProductElement = createCartProduct(title, price, imgSrc);
    let element = document.createElement('div');
    element.innerHTML = newProductElement;
    let cartBasket = document.querySelector('.cart-content');
    cartBasket.append(element);
    loadContent();
}


function createCartProduct(title, price, imgSrc) {

    return `
  <div class="cart-box">
  <img src="${imgSrc}" class="cart-img">
  <div class="detail-box">
    <div class="cart-food-title">${title}</div>
    <div class="price-box">
      <div class="cart-price">${price}</div>
       <div class="cart-amt">${price}</div>
   </div>
    <input type="number" value="1" class="cart-quantity">
  </div>

  <div class="cart-remove" >
                    <i class="fa-solid fa-trash"></i>
                </div>


</div>
  `;
}

function updateTotal() {
    const cartItems = document.querySelectorAll('.cart-box');
    const totalValue = document.querySelector('.total-price');

    let total = 0;

    cartItems.forEach(product => {
        let priceElement = product.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("Rs.", ""));
        let qty = product.querySelector('.cart-quantity').value;
        total += (price * qty);
        product.querySelector('.cart-amt').innerText = "Rs." + (price * qty);

    });

    totalValue.innerHTML = 'Rs.' + total;


    // Add Product Count in Cart Icon

    


}
//login form

function validation() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var error_message = document.getElementById("message");
    var text;



    message.padding = "15px";



    if (username.length < 5) {
        text = "please enter the valid username";
        message.innerHTML = text;
        return false;
    }


    if (password.indexOf("@") == -1 || password.length < 9) {
        text = "please enter the valid Email address";
        message.innerHTML = text;
        return false;
    }

    else {

        alert("Login successfully!")
        return true;
    }
}



// Get references to the search input and search button
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search");

// Get references to all filter items (products)
const filterItems = document.querySelectorAll(".filter-item");

// Add a click event listener to the search button
searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim().toLowerCase();

    // Loop through all filter items and check if the search term matches the product name
    filterItems.forEach((item) => {
        const productName = item.querySelector(".food-title").textContent.toLowerCase();
        const display = productName.includes(searchTerm) ? "block" : "none";
        item.style.display = display;
    });
});

// Optional: Add a keyup event listener to the search input for real-time search
// searchInput.addEventListener("keyup", () => {
//     searchButton.click();
// });