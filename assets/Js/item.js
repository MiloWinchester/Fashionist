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

        let favBtn = $.createElement('button');
        favBtn.classList.add('fav-btn');
        favBtn.title = 'Add to Favourites';

        let favIcon = $.createElement('i');
        favIcon.className = 'bi bi-suit-heart';

        favBtn.append(favIcon);

        btnContainer.append(detailBtn, favBtn);
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

        favBtn.addEventListener('click', () => {
            changeFavStatus(favBtn, favIcon, item);
        });

        checkFav(item, favIcon)
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

async function changeFavStatus (btn, icon, product) {
    let userId = checkUserLogin();
    if (userId) {
        if (icon.className.includes('fill')) {
            await removeFav(product, userId);
            icon.className = 'bi bi-suit-heart';
            btn.title = 'Add to favourite';
        }else {
            await setFav(product, userId);
            icon.className = 'bi bi-suit-heart-fill';
            btn.title = 'Remove from favourite';
        }
    }else {
        goToLogin();
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

async function setFav (product, userId) {
    let user = await getUser(userId);

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

async function removeFav (product, userId) {
    let user = await getUser(userId);
    let updatedUser = null;

    let productIndex = user.favourites.indexOf(product);
    user.favourites.splice(productIndex, 1);
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

async function checkFav (product, favIcon) {
    let userId = checkUserLogin();

    if (userId) {
        let user = await getUser(userId);

        if (user.favourites) {
            let favProducts = user.favourites;
            let isInFavourites = favProducts.some(favProduct => {
                if (favProduct.collection === product.collection && favProduct.id === product.id) {
                    return true;
                }else {
                    return false
                }
            });

            if (isInFavourites) {
                favIcon.className = 'bi bi-suit-heart-fill'
            }else {
                favIcon.className = 'bi bi-suit-heart'
            }
        }
    }
} 

const goToLogin = () => {
    location.href = 'https://milowinchester.github.io/Fashionist/login.html'
}

export {generateProductCard};