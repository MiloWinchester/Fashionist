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
const bestSellsWrapper = $.querySelector('.bestsells-wrapper');
const shoessWrapper = $.querySelector('.shoes-wrapper');
const jeansWrapper = $.querySelector('.jeans-wrapper');
const accessoryWrapper = $.querySelector('.accessory-wrapper');
const UnderWearWrapper = $.querySelector('.underWear-wrapper');
const summerWrapper = $.querySelector('.summer-wrapper');
const winterWrapper = $.querySelector('.winter-wrapper')

const productCardFragment = $.createDocumentFragment();

const removeFilter = () => {
    container.style.filter = 'none';
}

const checkUrl = () => {
    const currentUrl = location.href;

    if (currentUrl.includes('#')) {
        const urlId = currentUrl.substring(currentUrl.indexOf('#') + 1);
        moveToSection(urlId);
    }
}

const moveToSection = id => {
    const targetElem = $.getElementById(id);
    const targetTop = targetElem.offsetTop;

    window.scrollTo({
        behavior: 'smooth',
        top: targetTop - 50,
    })
}

const render = (wrapper, products) => {
    wrapper.innerHTML = '';

    generateProductCard(products, productCardFragment);

    wrapper.append(productCardFragment);
}

// Events
window.addEventListener('load', () => {
    removeFilter();
    checkUrl();
})

window.addEventListener('DOMContentLoaded', () => {
    render(bestSellsWrapper, products.bestSells);
    render(shoessWrapper, products.shoes);
    render(jeansWrapper, products.pants);
    render(accessoryWrapper, products.accessories);
    render(UnderWearWrapper, products.underWear);
    render(summerWrapper, products.summerCollection);
    render(winterWrapper, products.winterCollection)
})