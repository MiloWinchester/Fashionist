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
const emptyContainer = $.querySelector('.empty-list');
const loginMsg = $.querySelector('.login-msg');

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
        hideLoginMsg();
        return userId;
    }else {
        showLoginMsg();
    }
}

const getFavourites = () => {
    if (user.favourites) {
        let favouriteProducts = user.favourites;
        renderFavourites(favouriteProducts);
        checkEmpty();
    }
}

const checkEmpty = () => {
    if (!user.favourites || user.favourites.length === 0){
        showEmpty();
    }else {
        hideEmpty();
    }
}

const showEmpty = () => {
    emptyContainer.classList.add('empty');
}

const hideEmpty = () => {
    emptyContainer.classList.remove('empty');
}

const showLoginMsg = () => {
    loginMsg.classList.add('logged-out')
}

const hideLoginMsg = () => {
    loginMsg.classList.remove('logged-out')
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
        img.setAttribute('src', product.images[0]);
        img.alt = product.collection;

        imgContainer.append(img);

        const detailsContainer = $.createElement('div');
        detailsContainer.classList.add('product-details');

        const title = $.createElement('h1');
        title.classList.add('title')
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
        detailBtn.title = 'See Details';

        const detailBtnLink = $.createElement('a');
        detailBtnLink.href = 'itemDetails.html';
        detailBtnLink.innerHTML = 'Details';

        const addBtn = $.createElement('button');
        addBtn.classList.add('add-btn');
        addBtn.title = 'Add to bag'

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
        favIcon.className = 'bi bi-suit-heart-fill';

        favBtn.append(favIcon);

        container.append(imgContainer, detailsContainer, favBtn);

        if (product.price > product.offerPrice) {
            price.classList.add('line-through');
        }else {
            price.classList.remove('line-through')
        }

        favBtn.addEventListener('click', () => {
            changeFavouriteState(favIcon, product)
        })

        detailBtn.addEventListener('click', () => {
            setProductToStorage(product);
        })

        addBtn.addEventListener('click', () => {
            changeBagStatus(addBtn, addIcon, product);
        })

        fragment.append(container);
        checkBag(product, addIcon)
    })
}

const setProductToStorage = product => {
    localStorage.setItem('product', JSON.stringify(product));
}

const changeFavouriteState = (icon, product) => {
    if (icon.className.includes('fill')) {
        icon.className = 'bi bi-suit-heart';
        removeFromUserFav(product);
    }else {
        icon.className = 'bi bi-suit-heart-fill';
        addToUserFav(product);
    }
}

async function updateUser (updatedUser) {
    let userId = checkUserLogin();

    await fetch(`https://fashionist-shop-default-rtdb.firebaseio.com/users/${userId}.json`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
    }).then(res => console.log(res))
    .catch(err => console.error(err))
}

async function addToUserFav (product) {
    let updatedUser = null;
    
    if (!user.favourites) {
        user.favourites = [product];
        updatedUser = user;
    }else {
        user.favourites.push(product);
        updatedUser = user;
    }
    
    await updateUser(updatedUser);
    getFavourites();
    addFavBtns()
}

async function removeFromUserFav (product)  {
    let updatedUser = null;
    let productIndex = user.favourites.indexOf(product);
    user.favourites.splice(productIndex, 1);
    updatedUser = user;

    await updateUser(updatedUser);
    getFavourites();
    addFavBtns()
}

async function changeBagStatus (btn, icon, product) {
    let userId = checkUserLogin();
    if (userId) {
        if (icon.className.includes('dash')) {
            await removeBag(product);
            icon.className = 'bi bi-plus-lg';
            btn.title = 'Add to bag';
        }else {
            await setBag(product);
            icon.className = 'bi bi-dash-lg';
            btn.title = 'Remove from bag';
        }
    }
}

async function setBag (product) {
    let updatedUser = null;
    
    if (!user.bag) {
        product.quantity = 1;
        user.bag = [product];
        updatedUser = user;
    }else {
        product.quantity = 1;
        user.bag.push(product);
        updatedUser = user;
    }
        
    updateUser(updatedUser)
}

async function removeBag (product) {
    let updatedUser = null;
    let productIndex = null;
    user.bag.forEach((bagProduct, index) => {
        if (bagProduct.name === product.name && bagProduct.collection === product.collection) {
            productIndex = index;
        }
    });
    user.bag.splice(productIndex, 1);
    updatedUser = user;

    updateUser(updatedUser)
}

async function checkBag (product, addIcon) {
    if (user.bag) {
        let bagProducts = user.bag;
        let isInBag = bagProducts.some(bagProduct => {
            if (bagProduct.name === product.name && bagProduct.collection === product.collection) {
                return true;
            }else {
                return false
            }
        });

        if (isInBag) {
            addIcon.className = 'bi bi-dash-lg'
        }else {
            addIcon.className = 'bi bi-plus-lg'
        }
    }
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
    removeFilter();
})

window.addEventListener('DOMContentLoaded', () => {
    getUser();
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