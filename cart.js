const cart=()=>{
    let iconCart = document.querySelector(".icon-cart");
    let closeTabCart = document.querySelector(".close");
    let body = document.querySelector("body");

    iconCart.addEventListener("click",()=>{
        body.classList.toggle("activeTabCart");
    })

    closeTabCart.addEventListener("click",()=>{
        body.classList.toggle("activeTabCart");
    })

} 
export default cart;
