"use strict"
const $ = document;

const generateProductCard = (items, cardFragment) => {

    items.forEach(item => {
        let slide = $.createElement('div');
        slide.className = 'swiper-slide slide';

        let itemContainer = $.createElement('div');
        itemContainer.classList.add('item-container');

        let imgContainer = $.createElement('div');
        imgContainer.className = 'item-img-container swiper item-swiper'

        let imgWrapper = $.createElement('div');
        imgWrapper.classList.add('swiper-wrapper');

        generateProductImages(imgWrapper, item.images);

        let pagination= $.createElement('div');
        pagination.className = 'swiper-pagination item-pagination';

        let prevBtn = $.createElement('div');
        prevBtn.classList.add('item-button-prev', 'swiper-button-prev');

        let nextBtn = $.createElement('div');
        nextBtn.classList.add('item-button-next', 'swiper-button-next');

        imgContainer.append(imgWrapper, pagination, prevBtn, nextBtn);
        itemContainer.append(imgContainer);

        let infoContainer = $.createElement('div');
        infoContainer.classList.add('item-info-container');

        let title = $.createElement('h1');
        title.classList.add('item-title');
        title.innerHTML = item.name;

        let brand = $.createElement('p');
        brand.classList.add('item-brand');
        brand.innerHTML = item.brand;

        let itemShop = $.createElement('div');
        itemShop.classList.add('item-shop');

        let priceInfo = $.createElement('div');
        priceInfo.classList.add('item-price-info');

        let itemPrice = $.createElement('h2');
        itemPrice.classList.add('item-price');
        itemPrice.innerHTML = `$${item.price}`;

        priceInfo.append(itemPrice);
        itemShop.append(priceInfo);

        let btnContainer = $.createElement('div');
        btnContainer.classList.add('item-btns');

        let detailBtn = $.createElement('button');
        detailBtn.classList.add('detail-btn');
        detailBtn.title = 'See Details'

        let pageLink = $.createElement('a');
        pageLink.innerHTML = 'Details';

        detailBtn.append(pageLink);

        let addBtn = $.createElement('button');
        addBtn.classList.add('add-btn');
        addBtn.title = 'Add to bag';

        let addIcon = $.createElement('i');
        addIcon.className = 'bi bi-plus-lg';

        addBtn.append(addIcon);

        btnContainer.append(detailBtn, addBtn);
        itemShop.append(btnContainer);

        if (item.price != item.offerPrice) {
            let discount = $.createElement('p');
            discount.classList.add('item-discount');
            discount.innerHTML = `%${Math.round((item.price * 100) / item.offerPrice) - 100}`;

            imgContainer.append(discount);

            let offerPrice = $.createElement('h2');
            offerPrice.classList.add('item-offer');
            offerPrice.innerHTML = `$${item.offerPrice}`;

            itemPrice.classList.add('line-through');
            priceInfo.append(offerPrice);
        }

        infoContainer.append(title, brand, itemShop);
        itemContainer.append(infoContainer);
        slide.append(itemContainer);
        cardFragment.append(slide);

        // item events
        detailBtn.addEventListener('click', () => {
            goToDetails();
            setDataToStorage(item);
        })

        addBtn.addEventListener('click', () => {
            changeBagStatus(addIcon, item);
        });

        checkBag(item, addIcon)
    });
}

const generateProductImages = (imgWrapper, images) => {
    images.forEach(image => {
        let imgSlide = $.createElement('div');
        imgSlide.className = 'swiper-slide slide item-slide';

        let img = $.createElement('img');
        img.setAttribute('src', image);
        img.alt = 'Fashion';

        imgSlide.append(img);
        imgWrapper.append(imgSlide);
    })
}

const goToDetails = () => {
    location.href = 'https://milowinchester.github.io/Fashionist/itemDetails.html';
}

const setDataToStorage = product => {
    localStorage.setItem('product', JSON.stringify(product));
}

async function changeBagStatus (icon, product) {
    if (icon.className.includes('plus')) {
        await setBag(product);
        icon.className = 'bi bi-dash-lg'
    }else {
        await removeBag(product);
        icon.className = 'bi bi-plus-lg';
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

async function getUser (userId) {
    let response = await fetch(`https://fashionist-shop-default-rtdb.firebaseio.com/users/${userId}.json`)
    let user = await response.json();

    if (user) {
        return user;
    }
}

async function setBag (product) {
    let userId = checkUserLogin();
    if (userId) {
        let user = await getUser(userId);

        let updatedUser = null;
        
        if (!user.bag) {
            user.bag = [product];
            updatedUser = user;
        }else {
            user.bag.push(product);
            updatedUser = user;
        }
        
        updateUser(updatedUser)
    }else {
        goToLogin();
    }
}

async function removeBag (product) {
    let userId = checkUserLogin();
    if (userId) {
        let user = await getUser(userId);
        let updatedUser = null;

        let productIndex = user.bag.indexOf(product);
        user.bag.splice(productIndex, 1);
        updatedUser = user;

        updateUser(updatedUser)
    }else {
        goToLogin();
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

async function checkBag (product, addIcon) {
    let userId = checkUserLogin();

    if (userId) {
        let user = await getUser(userId);

        if (user.bag) {
            let bagProducts = user.bag;
            let isInBag = bagProducts.some(bagProduct => {
                if (bagProduct.collection === product.collection && bagProduct.id === product.id) {
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
} 

const goToLogin = () => {
    location.href = 'https://milowinchester.github.io/Fashionist/login.html'
}

export {generateProductCard};