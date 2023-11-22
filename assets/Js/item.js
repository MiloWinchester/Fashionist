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
        addBtn.innerHTML = '<i class="bi bi-plus-lg"></i>';
        addBtn.title = 'Add to basket';

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
    location.href = 'http://127.0.0.1:5500/itemDetails.html';
}

const setDataToStorage = product => {
    localStorage.setItem('product', JSON.stringify(product));
}

export {generateProductCard};