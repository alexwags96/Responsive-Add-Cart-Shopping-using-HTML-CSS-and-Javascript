import cart from "./cart.js";
import products from "./products.js";

let app = document.getElementById("app");
let temporaryContent = document.getElementById("temporaryContent");
let carts=[];

// load template file

const loadTemplate=()=>{
    fetch("/template.html")
    .then(res=>res.text())
    .then(html=>{
        app.innerHTML=html;
        let contentTab = document.getElementById("contentTab");
        contentTab.innerHTML=temporaryContent.innerHTML;
        temporaryContent.innerHTML=null;
        cart();
        if(localStorage.getItem('carts')){
            carts=JSON.parse(localStorage.getItem('carts'));
        }
        initApp();
        
    })
}




const initApp=()=>{
    let listProductHTML = document.querySelector(".listProduct");
    listProductHTML.innerHTML="";
    products.forEach(item=>{
        //console.log(item);
        let newItem = document.createElement("div");
        newItem.classList.add("item");
        newItem.innerHTML=`
        <a href="/detail.html?id=${item.id}">
        <img src="${item.image}" alt="" />
        </a>
          <h2>${item.name}</h2>
          <div class="price">$${item.price}</div>
          <button data-id="${item.id}" class="addCart">Add to cart</button>`
        
        listProductHTML.appendChild(newItem);
        addCartHTML();
    })


}
loadTemplate();

// Event on addcart clicked
document.addEventListener("click",(e)=>{
    let clickedElement = e.target;

    if(clickedElement.classList.contains("addCart")){
      let  productId=clickedElement.dataset.id;
      let positionInCart=  carts.findIndex(item=>item.productId==productId)

        //console.log(productId);
        if(carts.length<=0){
            carts=[
                {productId:productId,
                    quantity:1
                }
            ]
        }else if(positionInCart<0){
            
            carts.push({productId:productId,
                quantity:1
            })
        }else{
            carts[positionInCart].quantity=carts[positionInCart].quantity+1
        }
        //console.log(positionInCart);
        localStorage.setItem('carts',JSON.stringify(carts));
        addCartHTML();
        //console.log(carts);
        
    }
    
})

const addCartHTML=()=>{
    let listCart = document.querySelector(".listCart");
    let iconCart =document.querySelector(".icon-cart span")
    listCart.innerHTML='';
    let total = 0
    if(localStorage.getItem('carts')){
        carts=JSON.parse(localStorage.getItem('carts'))};
    carts.forEach(item=>{
        let product = products.find(product=>product.id==item.productId)
        total = total + item.quantity;
        let newItem = document.createElement('div')
        newItem.classList.add('item')
        newItem.innerHTML=`<div class="image">
            <img src="${product.image}" alt="" />
          </div>
          <div class="name">${product.name}</div>
          <div class="totalPrice">$${product.price*item.quantity}</div>
          <div class="quantity">
            <span data-id="${item.productId}" class="minus"><</span>
            <span>${item.quantity}</span>
            <span data-id="${item.productId}" class="plus">></span>
          </div>`
          listCart.appendChild(newItem)
        
    })
    iconCart.innerText=total
    
    
}

// Event on clicked plus or minus button
document.addEventListener("click",(e)=>{
    let clickedElement = e.target;

    if(clickedElement.classList.contains("plus")){
      let  productId=clickedElement.dataset.id;
      let positionInCart=  carts.findIndex(item=>item.productId==productId)
      carts[positionInCart].quantity=carts[positionInCart].quantity+1;
      localStorage.setItem('carts',JSON.stringify(carts));
      addCartHTML();
            
      
    } else if(clickedElement.classList.contains("minus")){
        let  productId=clickedElement.dataset.id;
        let positionInCart=  carts.findIndex(item=>item.productId==productId)
        let minusValue=carts[positionInCart].quantity-1;
        if(minusValue!=0){
            carts[positionInCart].quantity=minusValue;
        } else{
            carts.splice(positionInCart,1)
        }

        localStorage.setItem('carts',JSON.stringify(carts));
        addCartHTML();

        //console.log(carts);
    }
})