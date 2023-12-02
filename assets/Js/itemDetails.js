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
const addBagBtn = $.querySelector('.basket-btn')
const loginModal = $.querySelector('.login-modal')

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
        freeSize.innerHTML = productInfo.sizes;
        freeSize.classList.add('show-freesize')
    }else {
        let sizeIndex = 0;
        sizeBtns.forEach(size => {
            size.textContent = productInfo.sizes[sizeIndex];
            if (productInfo.collection === 'Shoes') {
                size.classList.add('shoes-size');
            };
            sizeIndex++;
        })
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
    let userId = checkUserLogin();
    if (userId) {
        if (favouriteIcon.className.includes('fill')) {
            favouriteIcon.className = 'bi bi-suit-heart fav-icon';
            removeFavourite(userId);
        }else {
            favouriteIcon.className = 'bi bi-suit-heart-fill fav-icon';
            setFavourite(userId);
        }
    }else {
        showLoginModal();
    }
}

async function setFavourite (userId) {
    let user = await getUser(userId);
    let updatedUser = addToUserFav(user);

    await fetch(`https://fashionist-shop-default-rtdb.firebaseio.com/users/${userId}.json`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
    }).then(res => console.log(res))
    .catch(err => console.error(err))
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

const addToUserFav = user => {
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

async function removeFavourite (userId) {
    let user = await getUser(userId);
    let updatedUser = removeFromUserFav(user);

    await fetch(`https://fashionist-shop-default-rtdb.firebaseio.com/users/${userId}.json`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
    }).then(res => console.log(res))
    .catch(err => console.error(err))
}

const removeFromUserFav = user => {
    let updatedUser = null;
    let productIndex = user.favourites.indexOf(productInfo);
    user.favourites.splice(productIndex, 1);
    updatedUser = user;

    return updatedUser;
}

async function checkFavourite () {
    let userId = checkUserLogin();
    
    if (userId) {
        let user = await getUser(userId);

        if (user.favourites) {
            let favouriteProducts = user.favourites;
            let isInFavourites = favouriteProducts.some(product => {
                if (productInfo.collection === product.collection && productInfo.id === product.id) {
                    return true;
                }else {
                    return false;
                }
            })

            if (isInFavourites) {
                favouriteIcon.className = 'bi bi-suit-heart-fill fav-icon';
            }else {
                favouriteIcon.className = 'bi bi-suit-heart fav-icon';
            }
        }
    }
}

const changeBagStatus = () => {
    let userId = checkUserLogin();
    
    if (userId) {
        let product = setProductOptions();
        if (product) {
            if (addBagBtn.textContent.includes('Add')) {
                addToBag(userId, product)
                addBagBtn.textContent = 'Remove from bag';
            }else {
                removeFromBag(userId, product);
                addBagBtn.textContent = 'Add to bag';
            }
        }
    }else {
        showLoginModal();
    }
}

const setProductOptions = () => {
    const chosenImg = $.querySelector('.chosen-img');
    const chosenColor = $.querySelector('.chosen-color');
    const chosenSize = $.querySelector('.chosen-size');
    const freeSize = $.querySelector('.show-freesize');

    let product = {
        id: productInfo.id,
        name: productInfo.name,
        brand: productInfo.brand,
        collection: productInfo.collection,
        price: productInfo.price,
        offerPrice: productInfo.offerPrice,
        images : productInfo.images,
        colors : productInfo.colors,
    }

    if (chosenImg) {
        product.chosenImage = chosenImg.getAttribute('src');
    }

    if (chosenColor) {
        product.chosenColor = chosenColor.style.backgroundColor;
    }

    if (chosenSize) {
        product.chosenSize = chosenSize.textContent;
    }else if (freeSize) {
        product.chosenSize = 'FreeSize';
    }

    return product;
}

async function addToBag (userId, product) {
    let user = await getUser(userId);
    let updatedUser = null;
    
    if (!user.bag) {
        user.bag = [product];
        updatedUser = user;
    }else {
        user.bag.push(product);
        updatedUser = user;
    }
        
    updateUser(updatedUser, userId)
}

async function removeFromBag (userId, product) {
    let user = await getUser(userId);
    let updatedUser = null;

    let productIndex = user.bag.indexOf(product);
    user.bag.splice(productIndex, 1);
    updatedUser = user;

    updateUser(updatedUser, userId)
}

async function updateUser (updatedUser, userId) {
    await fetch(`https://fashionist-shop-default-rtdb.firebaseio.com/users/${userId}.json`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
    }).then(res => console.log(res))
    .catch(err => console.error(err))
} 

async function checkBag () {
    let userId = checkUserLogin();

    if (userId) {
        let user = await getUser(userId);

        if (user.bag) {
            let bagProducts = user.bag;
            let isInBag = bagProducts.some(bagProduct => {
                if (bagProduct.collection === productInfo.collection && bagProduct.id === productInfo.id) {
                    return true;
                }else {
                    return false
                }
            });

            if (isInBag) {
                addBagBtn.textContent = 'Remove from bag'
            }else {
                addBagBtn.textContent = 'Add to bag'
            }
        }
    }
} 

const showLoginModal = () => {
    loginModal.classList.add('show-login-modal');

    setTimeout(() => {
        hideLoginModal();
    }, 2500);
}

const hideLoginModal = () => {
    loginModal.classList.remove('show-login-modal');
    loginModal.classList.add('hide-login-modal');

    setTimeout(() => {
        loginModal.classList.remove('hide-login-modal');
    }, 500);
}

window.addEventListener('load', () => {
    removeFilter();
});

window.addEventListener('DOMContentLoaded', () => {
    getProduct();
    checkFavourite();
    checkBag();
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

addBagBtn.addEventListener('click', () => {
    changeBagStatus();
})