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
const productList = $.querySelector('.product-list');

const favouriteProductsFragment = $.createDocumentFragment();

let user = {};

async function getUser () {
    let userId = checkUserLogin();

    let response = await fetch(`https://fashionist-shop-default-rtdb.firebaseio.com/users/${userId}.json`)
    let userData = await response.json();

    if (userData) {
        user = userData;
        getFavourites();
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
        return userId;
    }
}

const getFavourites = () => {
    if (user.favourites) {
        let favouriteProducts = user.favourites;
        generateFavouriteCard(favouriteProducts); 
    }
}

const renderFavourites = products => {
    productList.innerHTML = '';

    generateFavouriteCard(products, favouriteProductsFragment);

    productList.append(favouriteProductsFragment)
}

const generateFavouriteCard = (products, fragment) => {
    products.forEach(product => {
        const container = $.createElement('div');
        container.classList.add('product-container');

        const imgContainer = $.createElement('div');
        imgContainer.classList.add('product-img');

        const img = $.createElement('img');
        img.setAttribute('src', product.image[0]);
        img.alt = product.collection;

        imgContainer.append(img);

        const detailsContainer = $.createElement('div');
        detailsContainer.classList.add('product-details');

        const title = $.createElement('h1');
        title.innerHTML = product.name;

        const brand = $.createElement('p');
        brand.innerHTML = product.brand;

        const priceContainer = $.createElement('div');
        priceContainer.classList.add('product-price');

        const prices = $.createElement('div');
        prices.classList.add('prices');

        const price = $.createElement('h1');
        price.classList.add('price');
        price.innerHTML = `$${product.price}`

        const offerPrice = $.createElement('h1');
        offerPrice.classList.add('offer-price')
        offerPrice.innerHTML = `$${product.offerPrice}`;

        prices.append(price, offerPrice);

        const btnsContainer = $.createElement('div');
        btnsContainer.classList.add('product-btns');

        const detailBtn = $.createElement('button');
        detailBtn.classList.add('detail-btn');

        const detailBtnLink = $.createElement('a');
        detailBtnLink.href = 'itemDetails.html';
        detailBtnLink.innerHTML = 'Details';

        const addBtn = $.createElement('button');
        addBtn.classList.add('add-btn');

        const addIcon = $.createElement('i');
        addIcon.classList.add('bi', 'bi-plus-lg');

        detailBtn.append(detailBtnLink);
        addBtn.append(addIcon);
        btnsContainer.append(detailBtn, addBtn);
        priceContainer.append(prices, btnsContainer);
        detailsContainer.append(title, brand, priceContainer);

        const favBtn = $.createElement('button');
        favBtn.classList.add('fav-btn');

        const favIcon = $.createElement('i');
        favIcon.classList.add('bi', 'bi-suit-heart-fill');

        favBtn.append(favIcon);

        container.append(imgContainer, detailsContainer, favBtn);

        if (product.price > product.offerPrice) {
            price.classList.add('line-through');
        }else {
            price.classList.remove('line-through')
        }

        favouriteProductsFragment.append(container);
    })
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
    getUser()
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