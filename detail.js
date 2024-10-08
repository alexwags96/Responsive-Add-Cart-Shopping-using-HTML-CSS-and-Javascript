import cart from "./cart.js";
import products from "./products.js";

let app = document.getElementById("app");
let temporaryContent = document.getElementById("temporaryContent");


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

loadTemplate();