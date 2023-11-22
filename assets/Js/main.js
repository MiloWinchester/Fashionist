"use strict"
import { header } from "../components/header/header.js";
import { footer } from "../components/footer/footer.js";
import { themeBtn } from "../components/themeBtn/themeBtn.js";
import { loader } from "../components/loader/loader.js";
import { products } from "./productsData.js";
import { generateProductCard } from "./item.js";

window.customElements.define('site-header', header);
window.customElements.define('theme-btn', themeBtn);
window.customElements.define('site-footer', footer);
window.customElements.define('site-loader', loader);

const $ = document;
const container = $.getElementById('container');
const offerWrapper = $.querySelector('.offer-wrapper');
const arrivalWrapper = $.querySelector('.arrival-wrapper');

const productCardFragment = $.createDocumentFragment();


const removeFilter = () => {
    container.style.filter = 'none';
}

const checkUrl = () => {
    const currentUrl = location.href;

    if (currentUrl.includes('#')) {
        const urlId = currentUrl.substring(currentUrl.indexOf('#') + 1);
        moveToSection(urlId);
        console.log(urlId);
    }
}

const moveToSection = id => {
    const targetElem = $.getElementById(id);
    const targetTop = targetElem.offsetTop;
    console.log(targetTop);

    window.scrollTo({
        behavior: 'smooth',
        top: targetTop - 50,
    })
}

const renderProducts = (wrapper, products) => {
    wrapper.innerHTML = '';

    generateProductCard(products, productCardFragment);

    wrapper.append(productCardFragment)
}

window.addEventListener('load', () => {
    removeFilter();
    checkUrl();
})

window.addEventListener('DOMContentLoaded', () => {
    renderProducts(offerWrapper, products.offers);
    renderProducts(arrivalWrapper, products.newArrival);
})

// const postApi = userData => {
//     fetch('https://fashionist-shop-default-rtdb.firebaseio.com/users.json', {
//         method: 'POST',
//         headers: {
//             'Content-type' : 'application/json'
//         },
//         body: JSON.stringify(userData)
//     })
//     .then(res => console.log(res));
// }

// postApi({id: 0, name: 'Damon', age: 19});

const getApi = () => {
    fetch('https://fashionist-shop-default-rtdb.firebaseio.com/products.json')
    .then(response => {
        console.log(response)
        return response.json()
    })
    .then(res => console.log(res))
}

getApi();