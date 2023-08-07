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
  let price = food.querySelector('.price').innerHTML;
  let imgSrc = food.querySelector('.food-img').src;
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

  // const cartCount = document.querySelector('.cart-count');
  // let count = itemList.length;
  // cartCount.innerHTML = count;

  // if (count == 0) {
  //   cartCount.style.display = 'none';
  // } else {
  //   cartCount.style.display = 'block';
  // }


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

//Gallary section

function filterGallery(category) {
  const photos = document.getElementsByClassName('photo');
  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];
    if (category === 'all' || photo.classList.contains(category)) {
      photo.style.display = 'block';
    } else {
      photo.style.display = 'none';
    }
  }

  const buttons = document.getElementsByClassName('gallery-options')[0].getElementsByTagName('button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('active');
  }

  const activeButton = document.querySelector(`button[data-category="${category}"]`);
  activeButton.classList.add('active');
}


