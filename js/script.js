const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')


tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = document.querySelector(tab.dataset.tabTarget)
      tabContents.forEach(tabContent => {
        tabContent.classList.remove('active')
      })
      tabs.forEach(tab => { 
        tab.classList.remove('active')
      })
      tab.classList.add('active')
      target.classList.add('active')
    })
  })

const empty = document.getElementsByClassName('cart-empty')[0]
const numberCart = document.getElementsByClassName('number-cart')[0].innerText
const notEmpty = document.getElementsByClassName('not-empty')[0]
 

numberCart == 0 ? Empty() : empty.style.display = "none"

function Empty(){
  notEmpty.style.display = "none"
}




if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}

function ready(){
  const removeCartItemButtons = document.getElementsByClassName('remove')
  for(let i=0; i < removeCartItemButtons.length; i++){
    let button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem)
  }
  
  const quantityClickMinus = document.getElementsByClassName('minus')
  for(let i=0; i < quantityClickMinus.length; i++){
    let button = quantityClickMinus[i]
    button.addEventListener('click', minus)
  }
  
  const quantityClickPlus = document.getElementsByClassName('plus')
  for(let i=0; i < quantityClickPlus.length; i++){
    let button = quantityClickPlus[i]
    button.addEventListener('click', plus)
  }
  
  const addToCartButtons = document.getElementsByClassName('overlay')
  for(let i=0; i< addToCartButtons.length; i++){
      let button = addToCartButtons[i]
      button.addEventListener('click', addToCartClicked)
  }

  const addMenuButtons = document.getElementsByClassName('add-Menu')
  for(let i=0; i < addMenuButtons.length; i++){
    let button = addMenuButtons[i]
    button.addEventListener('click', addMenuClicked)
  }

  const addPurchaseButtons = document.getElementsByClassName('purchase-btn')
  for(let i=0; i < addPurchaseButtons.length; i++){
    let button = addPurchaseButtons[i]
    button.addEventListener('click', addPurchaseClicked)
  }
  const cancelOrderButtons = document.getElementsByClassName('btn-cancel')
  for(let i=0; i < cancelOrderButtons.length; i++){
    let button = cancelOrderButtons[i]
    button.addEventListener('click', cancelOrder)
  }
  
}


function cancelOrder(){
  let cartRows = document.getElementsByClassName('card-in-cart')
  max = cartRows.length
  for(let i=max-1; i > -1; i--){
    let cartRow = cartRows[i]
    let name = cartRow.getElementsByClassName('card-checked-title')[0].innerHTML
    uncheck(name)
    cartRow.remove()
  }
  updateCartTotal()
  document.getElementsByClassName('not-empty')[0].style.display = "none"
  document.getElementsByClassName('cart-empty')[0].style.display = ""
}

function addPurchaseClicked(){
  let cartRows = document.getElementsByClassName('card-in-cart')
  for(let i=0; i < cartRows.length; i++){
    let cartRow = cartRows[i]
    let priceElement = cartRow.getElementsByClassName('card-price')[0]
    let quantityElement = cartRow.getElementsByClassName('card-checked-quantity')[0]  
    
    let name = cartRow.getElementsByClassName('card-checked-title')[0].innerText
    let price = parseFloat(priceElement.innerText.replace('Rp. ', ''))
    let quantity = parseInt(quantityElement.innerText)
    addItemtoPurchase(name, quantity, price)
  }
  let totalPriceElement = document.getElementsByClassName('total-price')[0]
  let totalPrice = parseFloat(totalPriceElement.innerText.replace('Rp. ', ''))
  totalPriceAll(totalPrice)
}

function addItemtoPurchase(name, quantity, price){
  let addPurchase = document.createElement('div')
  addPurchase.classList.add('purchase-item')
  let bodyPurchase = document.getElementsByClassName('purchase-body')[0]
  
  let purchaseContent = `
  <p style="text-align:left;"> <span class="food-purchase">${name} </span><span class="purchase-quantity">${quantity}</span> x<span style="float: right;">Rp. <span class="purchase-price">${quantity*price}</span></span></p>`

  addPurchase.innerHTML = purchaseContent
  bodyPurchase.append(addPurchase)
}

function totalPriceAll(price){
  let ppn = 0.1*price
  let totalAll = price + ppn
  document.getElementsByClassName('ppn')[0].innerText = ppn
  document.getElementsByClassName('purchase-total-price')[0].innerText = totalAll
}

function addMenuClicked(event){
  let button = event.target
  let add_Menu = button.parentElement.parentElement

  let name = add_Menu.getElementsByClassName('add-name')[0].value
  let price = add_Menu.getElementsByClassName('add-price')[0].value
  let image = add_Menu.getElementsByClassName('add-image')[0].value

  addItemToMenu(name, price, image)
  resetForm()
}

function resetForm(){
  document.getElementsByClassName('add-name')[0].value="";
  document.getElementsByClassName('add-price')[0].value="";
  document.getElementsByClassName('add-image')[0].value ="";
  document.getElementsByClassName('add-category')[0].value="";    
}

function addItemToMenu(name, price, imageSrc){
  let addMenu = document.createElement('div')
  addMenu.classList.add('card-menu')
  let bodyContent = document.getElementsByClassName('body-content')[0]

  let cardContent = `
  <div class="card" >
  <img class="card-img card-photo" src="${imageSrc}">   
  <div class="card-img-overlay overlay d-flex ">
      <div class="my-auto mx-auto text-center">
          <a href=""><i class="far fa-check-circle"></i></a>
      </div>
  </div>
</div>
  <div class="card-body">
    <p class="food-name">${name}</p>
    <p class="food-price"><b>Rp. ${price}</b></p>
  </div>`

  addMenu.innerHTML = cardContent
  bodyContent.append(addMenu)

  addMenu.getElementsByClassName('overlay')[0].addEventListener('click', addToCartClicked)
}

function addToCartClicked(event){
  let button = event.target
  let foodOrder = button.parentElement.parentElement
  
  let title = foodOrder.getElementsByClassName('food-name')[0].innerText
  let price = parseFloat(foodOrder.getElementsByClassName('food-price')[0].innerText.replace('Rp. ', ''))*1000
  let imageSrc = foodOrder.getElementsByTagName('img')[0].src
  addItemToCart(title, price, imageSrc)
  foodOrder.getElementsByClassName('overlay')[0].style.opacity = 1
  
  updateCartTotal()
}

function addItemToCart(title, price, imageSRc){
  let cartRow = document.createElement('div')
  cartRow.classList.add('row')
  cartRow.classList.add('card-in-cart')
  let cartItems = document.getElementsByClassName('cart-body-cards')[0]
  let cartItemNames = cartItems.getElementsByClassName('card-checked-title')
  for(let i=0; i < cartItemNames.length; i++){
      if(cartItemNames[i].innerText == title){
          alert('This item is already added to the cart')
          return
      }
  }

  let cartItems2 = document.getElementsByClassName('modal-body-cart')[0]
 
  

  let cartRowContents = `
  <div class="card-checked-photo">
    <img src="${imageSRc}" alt="">
  </div>
  <div class="col-5 card-checked-body">
    <p class="card-checked-title">${title}</p>
    <div class="col row">
        <a  href="#"><i class="fas fa-minus minus"></i></a>
        <span class="card-checked-quantity">1</span>
        <a  href="#"><i class="fas fa-plus plus"></i></a>
    </div>
  </div>
  <div class="card-checked-right">
    <div class="col-fluid remove">
        <a href="#"><i class="fas fa-times"></i></a>
    </div>
    <div class="col-fluid">    </div>
    <div class="col-fluid align-items-end card-checked-price">
        <span class="card-price">Rp. ${price}</span>
    </div>
  </div> `
  
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  
  cartRow.getElementsByClassName('remove')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('plus')[0].addEventListener('click', plus)
  cartRow.getElementsByClassName('minus')[0].addEventListener('click', minus)

  document.getElementsByClassName('not-empty')[0].style.display = ""
  document.getElementsByClassName('cart-empty')[0].style.display = "none"
}


function removeCartItem(event){
  let buttonClicked = event.target
  buttonClicked.parentElement.parentElement.parentElement.parentElement.remove()
  updateCartTotal()

  const empty = document.getElementsByClassName('cart-empty')[0]
  let numberCart = document.getElementsByClassName('number-cart')[0].innerText
  let notEmpty = document.getElementsByClassName('not-empty')[0]


  if( numberCart == 0){
    notEmpty.style.display = "none"
    empty.style.display = ""
  }

  let nameElement = buttonClicked.parentElement.parentElement.parentElement.parentElement
  let name = nameElement.getElementsByClassName('card-checked-title')[0].innerHTML
  uncheck(name)
 
}

function uncheck(name){
  let foodLists = document.getElementsByClassName('food-name')
  for(let i=0; i < foodLists.length; i++){
    let foodList = foodLists[i].innerHTML
    if(foodList == name){
      let foodListElement = foodLists[i].parentElement.parentElement
      foodListElement.getElementsByClassName('overlay')[0].style.opacity = 0
      
    }
  }
}

function minus(event){
  let buttonClicked = event.target
  let cartRow = buttonClicked.parentElement.parentElement.parentElement
  
  let total = 0
  
  let quantityElement = cartRow.getElementsByClassName('card-checked-quantity')[0]  
  let quantity = parseInt(quantityElement.innerText)
  total = quantity-1
  total <= 0 ? total = 1 : null
  cartRow.getElementsByClassName('card-checked-quantity')[0].innerText = total
  updateCartTotal()
}

function plus(event){
  let buttonClicked = event.target
  let cartRow = buttonClicked.parentElement.parentElement.parentElement
  
  let total = 0
  
  let quantityElement = cartRow.getElementsByClassName('card-checked-quantity')[0]  
  let quantity = parseInt(quantityElement.innerText)
  total = quantity+1
  cartRow.getElementsByClassName('card-checked-quantity')[0].innerText = total
  updateCartTotal()
}

function updateCartTotal(){
  let total = 0
  let cartRows = document.getElementsByClassName('card-in-cart')
  for(let i=0; i < cartRows.length; i++){
    let cartRow = cartRows[i]
    let priceElement = cartRow.getElementsByClassName('card-price')[0]
    let quantityElement = cartRow.getElementsByClassName('card-checked-quantity')[0]  
    
    let price = parseFloat(priceElement.innerText.replace('Rp. ', ''))
    let quantity = parseInt(quantityElement.innerText)
    total = total + (price * quantity)
  }
  total = Math.round(total * 100)/100
  document.getElementsByClassName('total-price')[0].innerText = 'Rp. ' + total
  let numberCartElement = document.getElementsByClassName('number-cart')
  
  for(let i=0; i < numberCartElement.length; i++){
      let numberCartRow = numberCartElement[i]
      numberCartRow.innerHTML = cartRows.length
  }
  //document.getElementsByClassName('number-cart')[0].innerText = cartRows.length

  

}


