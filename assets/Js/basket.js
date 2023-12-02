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
const productList = $.getElementById('product-list')
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
        calculateSubtotal();
        calculateDiscount();
        calculateDelivery();
        calculateTotalPrice();
    }
}

const renderBagProducts = products => {
    productList.innerHTML = '';

    generateBagProducts(products, productFragment);

    productList.append(productFragment);
}

const generateBagProducts = products => {
    products.forEach(product => {
        const productContainer = $.createElement('div');
        productContainer.classList.add('product-container');

        const imgContainer = $.createElement('div');
        imgContainer.classList.add('img-container');

        const img = $.createElement('img');
        if (product.chosenImage) {
            img.setAttribute('src', product.chosenImage);
        }else {
            img.setAttribute('src', product.images[0]);
        }
        img.alt = product.collection;
        imgContainer.append(img);

        const productInfo = $.createElement('div');
        productInfo.classList.add('product-info');

        const productHead = $.createElement('div');
        productHead.classList.add('product-head');

        const productTitle = $.createElement('div');
        productTitle.classList.add('product-title');

        const title = $.createElement('h1');
        title.classList.add('title');
        title.textContent = product.name;

        const brand = $.createElement('p');
        brand.classList.add('brand');
        brand.textContent = product.brand;

        productTitle.append(title, brand);
        productHead.append(productTitle);

        const btns = $.createElement('div');
        btns.classList.add('btns');

        const favBtn = $.createElement('button');
        favBtn.classList.add('fav-btn');

        const favIcon = $.createElement('i');
        favIcon.classList.add('bi', 'bi-suit-heart');
        favBtn.append(favIcon);

        const removeBtn = $.createElement('button');
        removeBtn.classList.add('remove-btn');

        const removeIcon = $.createElement('i');
        removeIcon.classList.add('bi', 'bi-trash');
        removeBtn.append(removeIcon);

        btns.append(favBtn, removeBtn);
        productHead.append(btns);
        productInfo.append(productHead)

        const colors = $.createElement('div');
        colors.classList.add('colors');

        if (product.chosenColor) {
            const color = $.createElement('div');
            color.classList.add('color');
            color.style.backgroundColor = product.chosenColor;
            colors.append(color);
        }else {
            product.colors.forEach(productColor => {
                const color = $.createElement('div');
                color.classList.add('color');
                color.style.backgroundColor = productColor;
                colors.append(color);
            })
        }

        productInfo.append(colors);

        const productFoot = $.createElement('div');
        productFoot.classList.add('product-foot');

        const sizeQuantity = $.createElement('div');
        sizeQuantity.classList.add('size-quantity')

        const sizeContainer = $.createElement('div');

        
        if (product.chosenSize === 'FreeSize') {
            const freeSize = $.createElement('p');
            freeSize.textContent = product.chosenSize;
            freeSize.classList.add('freesize', 'show-freesize');
            sizeContainer.append(freeSize)
        }else {
            const size = $.createElement('p');
            size.textContent = 'Size';
            const sizeSelect = $.createElement('select');
            sizeSelect.name = 'size';
            sizeSelect.classList.add('size');
    
            product.sizes.forEach(size => {
                const sizeOption = $.createElement('option');
                sizeOption.textContent = size;
                sizeSelect.append(sizeOption);
            })

            if (product.chosenSize) {
                sizeSelect.value = product.chosenSize;
            }

            sizeContainer.append(size, sizeSelect);
        }
        
        sizeQuantity.append(sizeContainer);

        const quantityContainer = $.createElement('div');
        const quiantity = $.createElement('p');
        quiantity.textContent = 'Quiantity'
        const quantitySelect = $.createElement('select');
        quantitySelect.name = 'quantity';
        quantitySelect.classList.add('quantity');

        for(let i = 1; i <= 5; i++) {
            const quantityOption = $.createElement('option');
            quantityOption.value = i;
            quantityOption.text = i;
            quantitySelect.append(quantityOption);
        }

        quantityContainer.append(quiantity, quantitySelect);
        sizeQuantity.append(quantityContainer);
        productFoot.append(sizeQuantity);

        const productPrices = $.createElement('div');
        productPrices.classList.add('product-price');

        const price = $.createElement('h1');
        price.classList.add('price');
        price.textContent =`$${product.price}`;

        const offerPrice = $.createElement('h1');
        offerPrice.classList.add('offer-price');
        offerPrice.textContent = `$${product.offerPrice}`;

        productPrices.append(price, offerPrice);
        productFoot.append(productPrices);

        if (product.price > product.offerPrice) {
            price.classList.add('line-through');
        }

        productInfo.append(productFoot);
        productContainer.append(imgContainer, productInfo);

        const hr = $.createElement('hr');

        productFragment.append(productContainer, hr);

        favBtn.addEventListener('click', () => {
            changeFavStatus(favIcon, product);
        })

        checkFavourite(favIcon, product);

        removeBtn.addEventListener('click', () => {
            removeFromBag(product)
        })

    })
}

const changeFavStatus = (icon, product) => {
    let userId = checkUserLogin();
    if (userId) {
        if (icon.className.includes('fill')) {
            icon.className = 'bi bi-suit-heart';
            removeFromUserFav(userId, product);
        }else {
            icon.className = 'bi bi-suit-heart-fill';
            addToUserFav(userId, product);
        }
    }
}

async function updateUser (updatedUser, userId) {
    await fetch(`https://fashionist-shop-default-rtdb.firebaseio.com/users/${userId}.json`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
    }).then(res => console.log(res))
    .catch(err => console.error(err));
}

async function addToUserFav (userId, product) {
    let updatedUser = null;
    if (!user.favourites) {
        user.favourites = [product];
        updatedUser = user;
    }else {
        user.favourites.push(product);
        updatedUser = user;
    }
    
    updateUser(updatedUser, userId)
}

async function removeFromUserFav (userId, product)  {
    let updatedUser = null;
    let productIndex = user.favourites.indexOf(product);
    user.favourites.splice(productIndex, 1);
    updatedUser = user;

    updateUser(updatedUser, userId)
}

async function checkFavourite (favIcon, product) {
    if (user.favourites) {
        let favouriteProducts = user.favourites;
        let isInFavourites = favouriteProducts.some(fav => {
            if (fav.name === product.name && fav.id === product.id) {
                return true;
            }else {
                return false;
            }
        })

        if (isInFavourites) {
            favIcon.className = 'bi bi-suit-heart-fill';
            favIcon.classList.add('isFav')
        }else {
            favIcon.className = 'bi bi-suit-heart';
            favIcon.classList.remove('isFav')
        }
    }
}

async function removeFromBag (product)  {
    let userId = checkUserLogin();
    let updatedUser = null;
    let productIndex = user.bag.indexOf(product);
    user.bag.splice(productIndex, 1);
    updatedUser = user;

    updateUser(updatedUser, userId)
}

const calculateSubtotal = () => {
    const prices = $.querySelectorAll('.price');
    
    if (prices) {
        let totalProductPrice = 0;
    
        prices.forEach(price => {
            let priceInNumber = Number(price.textContent.substring(price.textContent.indexOf('$') + 1));
            totalProductPrice += priceInNumber;
        });

        subTotal.textContent = `$${totalProductPrice}`;
    }else {
        minusIcons[0].classList.remove('remove-minus')
    }
}

const calculateDiscount = () => {
    const offerPrices = $.querySelectorAll('.offer-price');
    const prices = $.querySelectorAll('.price');

    if (offerPrices) {
        let totalOffer = 0;
        let totalProductPrice = 0;

        prices.forEach(price => {
            let priceInNumber = Number(price.textContent.substring(price.textContent.indexOf('$') + 1));
            totalProductPrice += priceInNumber;
        });

        offerPrices.forEach(price => {
            let priceInNumber = Number(price.textContent.substring(price.textContent.indexOf('$') + 1));
            totalOffer += priceInNumber;
        });

        let totalDiscount = totalProductPrice - totalOffer;
        discount.textContent = `$${totalDiscount}`;
        
    }else {
        minusIcons[1].classList.remove('remove-minus')
    }
}

const calculateDelivery = () => {
    const prices = $.querySelectorAll('.price');
    let totalProductPrice = 0;

    prices.forEach(price => {
        let priceInNumber = Number(price.textContent.substring(price.textContent.indexOf('$') + 1));
        totalProductPrice += priceInNumber;
    });

    if (totalProductPrice <= 350) {
        delivery.textContent = '$50';
    }else {
        delivery.textContent = 'Free';
    }
}

const calculateTotalPrice = () => {
    let totalProductPrice = Number(subTotal.textContent.substring(subTotal.textContent.indexOf('$') + 1));
    let totalDiscount = Number(discount.textContent.substring(discount.textContent.indexOf('$') + 1));
    let totalDelivery = delivery.textContent;

    let totalPrices = 0;

    totalPrices = totalProductPrice - totalDiscount;
    if (totalDelivery !== 'Free') {
        totalDelivery = Number(delivery.textContent.substring(delivery.textContent.indexOf('$') + 1));
        totalPrices += totalDelivery;
    }

    totalPrice.textContent = `$${totalPrices}`;

}

const removeFilter = () => {
    container.style.filter = 'none';
}

window.addEventListener('load', () => {
    getUser();
    removeFilter();
})