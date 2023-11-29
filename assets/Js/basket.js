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
        img.setAttribute('src', product.image);
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

        const color = $.createElement('div');
        color.classList.add('color');
        color.style.backgroundColor = product.color;

        colors.append(color);
        productInfo.append(colors);

        const productFoot = $.createElement('div');
        productFoot.classList.add('product-foot');

        const sizeQuantity = $.createElement('div');
        sizeQuantity.classList.add('size-quantity')

        const sizeContainer = $.createElement('div');

        
        if (product.size === 'FreeSize') {
            const freeSize = $.createElement('p');
            freeSize.textContent = product.size;
            freeSize.classList.add('freesize', 'show-freesize');
            sizeContainer.append(freeSize)
        }else {
            const size = $.createElement('p');
            size.textContent = 'Size';
            const sizeSelect = $.createElement('select');
            sizeSelect.name = 'size';
            sizeSelect.classList.add('size');
    
            const optionS = $.createElement('option');
            optionS.textContent = 'S'
            optionS.value = 'S'
            const optionM = $.createElement('option');
            optionM.textContent = 'M'
            optionM.value = 'M'
            const optionL = $.createElement('option');
            optionL.textContent = 'L'
            optionL.value = 'L'
            const optionXL = $.createElement('option');
            optionXL.textContent = 'XL'
            optionXL.value = 'XL'
            const option2XL = $.createElement('option');
            option2XL.textContent = '2XL'
            option2XL.value = '2XL';

            sizeSelect.append(optionS, optionM, optionL, optionXL, option2XL);
            sizeContainer.append(size, sizeSelect);

            const sizeOptions = $.querySelectorAll('.size option');
            sizeOptions.forEach(option => {
                if (option.value === product.size) {
                    sizeSelect.value = option.value;
                }
            })
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

    })
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

    if (totalProductPrice <= 250) {
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