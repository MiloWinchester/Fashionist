"use strict"
import { header } from "../components/header/header.js";
import { footer } from "../components/footer/footer.js";
import { themeBtn } from "../components/themeBtn/themeBtn.js";
import { loader } from "../components/loader/loader.js";

window.customElements.define('site-header', header);
window.customElements.define('theme-btn', themeBtn);
window.customElements.define('site-footer', footer);
window.customElements.define('site-loader', loader);

const $ = document;
const container = $.getElementById('container');
const editBtn = $.querySelector('.edit-fav-btn');
const doneBtn = $.querySelector('.edit-done-fav-btn')
const favTitle = $.querySelector('.favourite-title');


async function getProducts () {
    let response = await fetch('https://fashionist-shop-default-rtdb.firebaseio.com/products/-NjsKK-faDqTDJ6Ybw2Y.json')
    let products = await response.json();

    console.log(products);
}

const removeFilter = () => {
    container.style.filter = 'none';
}

const changeTitle = () => {
    favTitle.classList.toggle('editmode')
}

const changeBtnToDone = () => {
    editBtn.classList.toggle('editmode')
}

const addFavBtns = () => {
    const favBtns = $.querySelectorAll('.fav-btn');

    favBtns.forEach(btn => {
        btn.classList.add('show-fav-btn')
    })
}

const removeFavBtns = () => {
    const favBtns = $.querySelectorAll('.fav-btn');

    favBtns.forEach(btn => {
        btn.classList.remove('show-fav-btn')
    })
}

window.addEventListener('load', () => {
    getProducts()
    removeFilter();
})

editBtn.addEventListener('click', () => {
    changeTitle();
    changeBtnToDone();
    addFavBtns();
})

doneBtn.addEventListener('click', () => {
    changeTitle();
    changeBtnToDone();
    removeFavBtns();
})

console.log('no1');