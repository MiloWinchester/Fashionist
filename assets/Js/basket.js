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
const subTotal = $.getElementById('subtotal');
const delivery = $.getElementById('delivery');
const discount = $.getElementById('discount');
const totalPrice = $.getElementById('total-price');
const minusIcons = $.querySelectorAll('.minus');
const loginMsg = $.querySelector('.login-msg');
const emptyMsg = $.querySelector('.empty-msg');

const productFragment = $.createDocumentFragment();

let user = {};

async function getUser () {
    let userId = checkUserLogin();

    let response = await fetch(`https://fashionist-shop-default-rtdb.firebaseio.com/users/${userId}.json`)
    let userData = await response.json();

    if (userData) {
        user = userData;
        getUserBag();
    }
}

const checkUserLogin = () => {
    let cookies = $.cookie.split(';');
    let userId = null;

    cookies.filter(cookie => {
        if (cookie.includes('id')) {
            userId = cookie.substring(cookie.indexOf('=') + 1)
        }
    })

    if (userId) {
        hideLoginMsg();
        return userId;
    }else {
        showLoginMsg();
    }
}

const showLoginMsg = () => {
    loginMsg.classList.add('show-login-msg');
    showMinusIcons()
}

const hideLoginMsg = () => {
    loginMsg.classList.remove('show-login-msg');
    hideMinusIcons()
}

const showMinusIcons = () => {
    minusIcons.forEach(icon => {
        icon.classList.remove('remove-minus')
    })
}

const hideMinusIcons = () => {
    minusIcons.forEach(icon => {
        icon.classList.add('remove-minus')
    })
}

const checkEmpty = () => {
    if (!user.bag || user.bag.length === 0){
        showEmpty();
        return false;
    }else {
        hideEmpty();
        return true;
    }
}

const showEmpty = () => {
    emptyMsg.classList.add('show-empty-msg');
    showMinusIcons();
}

const hideEmpty = () => {
    emptyMsg.classList.remove('show-empty-msg');
    hideMinusIcons();
}

const getUserBag = () => {
    let hasBag = checkEmpty();

    if (hasBag) {
        let userBag = user.bag;
        renderBagProducts(userBag);
    }
}

const removeFilter = () => {
    container.style.filter = 'none';
}

window.addEventListener('load', () => {
    getUser();
    removeFilter();
})