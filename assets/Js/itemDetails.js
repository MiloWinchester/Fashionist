"use strict"
import { header } from "../components/header/header.js";
import { footer } from "../components/footer/footer.js";
import { themeBtn } from "../components/themeBtn/themeBtn.js";
import { loader } from "../components/loader/loader.js";
import { getProducts } from "./productsData.js";

window.customElements.define('site-header', header);
window.customElements.define('theme-btn', themeBtn);
window.customElements.define('site-footer', footer);
window.customElements.define('site-loader', loader);

const $ = document;
const container = $.getElementById('container');
const sizeBtns = $.querySelectorAll('.size-btn');
const favouriteIcon = $.querySelector('.fav-icon');
const favouriteBtn = $.querySelector('.favourite-btn');
const currentImg = $.querySelector('.current-image');
const title = $.querySelector('.title');
const brand = $.querySelector('.brand');
const price = $.querySelector('.price');
const offerPrice = $.querySelector('.offer-price');
const discount = $.querySelector('.item-discount p');
const sideImageContainer = $.querySelector('.side-images');
const itemImageContainer = $.querySelector('.item-images');
const colorContainer = $.querySelector('.colors');
const freeSize = $.querySelector('.free-size');

let productInfo = {};

const removeFilter = () => {
    container.style.filter = 'none';
}

const getProduct = () => {
    const product = JSON.parse(localStorage.getItem('product'));
    if (product) {
        productInfo = product;
        renderProduct();
    }else {
        console.error('No product found');
    }
}

const renderProduct = () => {
    renderProductInfo();
    renderProductImages();
    renderProductPrices();
    renderProductColors();
    renderProductSizes();
}

const renderProductInfo = () => {
    title.textContent = productInfo.name;
    brand.textContent = productInfo.brand;
}

const renderProductImages = () => {
    currentImg.setAttribute('src', productInfo.images[0]);

    productInfo.images.forEach(img => {
        const sideImgDiv = $.createElement('div');
        sideImgDiv.classList.add('side-image');

        const sideImg = $.createElement('img');
        sideImg.alt = 'Fashtion';
        sideImg.setAttribute('src', img);
        sideImg.classList.add('side-img', 'img')
        
        sideImgDiv.append(sideImg);
        sideImageContainer.append(sideImgDiv);

        const itemImg = $.createElement('img');
        itemImg.alt = 'Fashion';
        itemImg.setAttribute('src', img);
        itemImg.classList.add('item-img', 'img')

        itemImageContainer.append(itemImg);

        sideImg.addEventListener('mouseenter', () => {
            rejectImg();
            chooseImg(sideImg);
        });

        itemImg.addEventListener('click', () => {
            rejectImg();
            chooseImg(itemImg);
        })
    })
    chooseImg($.querySelector('.item-img'))
}

const renderProductPrices = () => {
    price.textContent = `$${productInfo.price}`;
    calculatOffer(productInfo.price);
}

const renderProductColors = () => {
    if (productInfo.colors) {
        productInfo.colors.forEach(color => {
            const colorDiv = $.createElement('div');
            colorDiv.classList.add('color');
            colorDiv.style.backgroundColor = color;
    
            colorContainer.append(colorDiv)
    
            colorDiv.addEventListener('click', () => {
                rejectColor();
                chooseColor(colorDiv);
            })
        })
    }
}

const renderProductSizes = () => {
    if (productInfo.collection === 'Accessory' || productInfo.collection === 'Underwear') {
        freeSize.innerHTML = 'Freesize';
        freeSize.classList.add('show-freesize')
    }else if (productInfo.collection === 'Shoes'){
        const shoeSizes = [38, 40, 42, 44, 46];
        let index = 0;
        sizeBtns.forEach(size => {
            size.textContent = shoeSizes[index];
            index++;
            size.classList.add('shoes-size')
        })
    }else {
        sizeBtns.forEach(size => {
            size.classList.remove('shoes-size')
        })
        freeSize.classList.remove('show-freesize');
    }
}

const calculatOffer = productPrice => {
    if (productPrice > productInfo.offerPrice) {
        offerPrice.textContent = `$${productInfo.offerPrice}`;
        price.classList.add('line-through');

        const discountAmount = Math.round((productPrice * 100) / productInfo.offerPrice) - 100;
        discount.textContent = `%${discountAmount}`;
        discount.parentElement.classList.add('show-discount')
    }else {
        price.classList.remove('line-through');
        discount.parentElement.classList.remove('show-discount')
    }
}

const rejectSize = () => {
    sizeBtns.forEach(btn => {
        btn.classList.remove('chosen-size');
    })
}

const chooseSize = size => {
    size.classList.add('chosen-size')
}

const rejectImg = () => {
    const images = $.querySelectorAll('.img');
    images.forEach(img => {
        img.classList.remove('chosen-img')
    })
}

const chooseImg = img => {
    img.classList.add('chosen-img');
    
    const newImg = img.getAttribute('src')
    currentImg.setAttribute('src', newImg);
}

const rejectColor = () => {
    const colors = $.querySelectorAll('.color');
    colors.forEach(color => {
        color.classList.remove('chosen-color');
    })
}

const chooseColor = color => {
    color.classList.add('chosen-color');
}

const chooseFavourite = () => {
    if (favouriteIcon.className.includes('fill')) {
        favouriteIcon.className = 'bi bi-suit-heart fav-icon';
        removeFavourite();
    }else {
        favouriteIcon.className = 'bi bi-suit-heart-fill fav-icon';
        setFavourite();
    }
}

async function setFavourite () {
    let userId = checkUserLogin();
    let user = await getUser(userId);
    let updatedUser = updateUser(user);

    fetch(`https://fashionist-shop-default-rtdb.firebaseio.com/users/${userId}.json`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
    }).then(res => console.log(res))
    .catch(err => console.error(err))

    updateProductData();
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

async function getUser (userId) {
    let response = await fetch(`https://fashionist-shop-default-rtdb.firebaseio.com/users/${userId}.json`)
    let user = await response.json();

    if (user) {
        return user;
    }
}

const updateUser = user => {
    let updatedUser = null;
    
    if (!user.favourites) {
        user.favourites = [productInfo];
        updatedUser = user;
    }else {
        user.favourites.push(productInfo);
        updatedUser = user;
    }
    
    return updatedUser;
}

async function removeFavourite () {
    let userId = checkUserLogin();
    let user = await getUser(userId);
    let updatedUser = userRemoveUpdate(user);

    fetch(`https://fashionist-shop-default-rtdb.firebaseio.com/users/${userId}.json`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
    }).then(res => console.log(res))
    .catch(err => console.error(err))

    updateProductData();
}

const userRemoveUpdate = user => {
    let updatedUser = null;
    let productIndex = user.favourites.indexOf(productInfo);
    user.favourites.splice(productIndex, 1);
    updatedUser = user;

    return updatedUser;
}

async function updateProductData () {
    if (productInfo.isFavourite) {
        productInfo.isFavourite = false
    }else {
        productInfo.isFavourite = true;
    }

    let allProducts = await getAllProducts();
    console.log(allProducts);

    for(let collection in allProducts) {
        console.log(allProducts[collection]);
        let currentProduct = null;

        for (let product of allProducts[collection]){
            if (product == productInfo) {
                currentProduct = product;
            }
        }
        console.log(Array.isArray(allProducts[collection]));

        console.log(currentProduct);
        if (currentProduct) {
            console.log(currentProduct);
            if (currentProduct.isFavourite) {
                currentProduct.isFavourite = false;
            }else {
                currentProduct.isFavourite = true;
            } 
            console.log(allProducts[collection]);
        }
    }

    // fetch('https://fashionist-shop-default-rtdb.firebaseio.com/products/-NjsKK-faDqTDJ6Ybw2Y.json', {
    //     method: "PUT",
    //     headers: {
    //         'Content-type': 'application/json'
    //     },
    //     body: JSON.stringify(allProducts)
    // }).then(res => console.log(res))
    // .catch(err => console.error(err))
}

async function getAllProducts () {
    let products = {};

    await getProducts().then(productsData => {
        products = productsData
    })
    .catch(err => console.error(err));

    return products;
}

const checkFavourite = () => {
    if (productInfo.isFavourite) {
        favouriteIcon.className = 'bi bi-suit-heart-fill fav-icon';
    }
}

window.addEventListener('load', () => {
    removeFilter();
});

window.addEventListener('DOMContentLoaded', () => {
    getProduct();
    checkFavourite();
})

sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        rejectSize();
        chooseSize(btn)
    });
})

favouriteBtn.addEventListener('click', () => {
    chooseFavourite();
})

console.log('no8');