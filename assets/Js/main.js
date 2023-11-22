"use strict"
import { header } from "../components/header/header.js";
import { footer } from "../components/footer/footer.js";
import { themeBtn } from "../components/themeBtn/themeBtn.js";
import { loader } from "../components/loader/loader.js";
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

function getProducts ()  {
    let productsData = null;
    fetch('https://fashionist-shop-default-rtdb.firebaseio.com/products/-NjsKK-faDqTDJ6Ybw2Y.json')
    .then(response => response.json())
    .then(res => productsData = res)

    if (productsData) {
        console.log(productsData)
        return productsData;
    }
}

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
    console.log(products);
    generateProductCard(products, productCardFragment);

    wrapper.append(productCardFragment)
}

document.onreadystatechange = () => {
    let products = null;
    if (document.readyState === 'interactive') {
        products = getProducts()
    }else if (document.readyState === 'complete') {
        domContentLoad(products)
    }
}

window.addEventListener('load', () => {
    removeFilter();
    checkUrl();
})

const domContentLoad = products => {
    window.addEventListener('DOMContentLoaded', () => {
        renderProducts(offerWrapper, products.offers);
        renderProducts(arrivalWrapper, products.newArrival);
    })
}