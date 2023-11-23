window.addEventListener('load', () => {
    const trendSwiper = new Swiper(".trend-swiper", {
        loop: true,
        slidesPerView: 2,
        spaceBetween: 2,
        slidesPerGroup : 2,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".trend-button-next",
            prevEl: ".trend-button-prev",
        },
        scrollbar: {
          el: ".trend-scrollbar",
          hide: true,
        },
    
    });
    
    const offerSwiper = new Swiper(".offer-swiper", {
        loop: true,
        slidesPerView: 5,
        spaceBetween: 5,
        slidesPerGroup : 1,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".offer-button-next",
            prevEl: ".offer-button-prev",
        },
        scrollbar: {
          el: ".offer-scrollbar",
          hide: true,
        },
        hiddenClass: true,
    });
    
    const arrivalSwiper = new Swiper(".arrival-swiper", {
        loop: true,
        slidesPerView: 5,
        spaceBetween: 5,
        slidesPerGroup : 1,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".arrival-button-next",
            prevEl: ".arrival-button-prev",
        },
        scrollbar: {
          el: ".arrival-scrollbar",
          hide: true,
        },
    });
    
    
    // Product page swipers
    const featuredSwiper = new Swiper(".featured-swiper", {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 5,
        slidesPerGroup : 1,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".featured-button-next",
            prevEl: ".featured-button-prev",
        },
        scrollbar: {
          el: ".featured-scrollbar",
          hide: true,
        },
    
    });
    
    const sellsSwiper = new Swiper(".bestsells-swiper", {
        slidesPerView: 5,
        spaceBetween: 5,
        slidesPerGroup : 1,
        navigation: {
            nextEl: ".bestsells-button-next",
            prevEl: ".bestsells-button-prev",
        },
        scrollbar: {
          el: ".bestsells-scrollbar",
          hide: true,
        },
    });
    
    const shoesSwiper = new Swiper(".shoes-swiper", {
        slidesPerView: 5,
        spaceBetween: 5,
        slidesPerGroup : 1,
        navigation: {
            nextEl: ".shoes-button-next",
            prevEl: ".shoes-button-prev",
        },
        scrollbar: {
          el: ".shoes-scrollbar",
          hide: true,
        },
    });
    
    const jeansSwiper = new Swiper(".jeans-swiper", {
        slidesPerView: 5,
        spaceBetween: 5,
        slidesPerGroup : 1,
        navigation: {
            nextEl: ".jeans-button-next",
            prevEl: ".jeans-button-prev",
        },
        scrollbar: {
          el: ".jeans-scrollbar",
          hide: true,
        },
    });
    
    const accessorySwiper = new Swiper(".accessory-swiper", {
        slidesPerView: 2,
        spaceBetween: 5,
        slidesPerGroup : 2,
        navigation: {
            nextEl: ".accessory-button-next",
            prevEl: ".accessory-button-prev",
        },
        scrollbar: {
          el: ".accessory-scrollbar",
          hide: true,
        },
    });
    
    const underWearSwiper = new Swiper(".underWear-swiper", {
        slidesPerView: 2,
        spaceBetween: 5,
        slidesPerGroup : 2,
        navigation: {
            nextEl: ".underWear-button-next",
            prevEl: ".underWear-button-prev",
        },
        scrollbar: {
          el: ".underWear-scrollbar",
          hide: true,
        },
    });
    
    const summerSwiper = new Swiper(".summer-swiper", {
        slidesPerView: 5,
        spaceBetween: 5,
        slidesPerGroup : 1,
        navigation: {
            nextEl: ".summer-button-next",
            prevEl: ".summer-button-prev",
        },
        scrollbar: {
          el: ".summer-scrollbar",
          hide: true,
        },
    });
    
    const winterSwiper = new Swiper(".winter-swiper", {
        slidesPerView: 5,
        spaceBetween: 5,
        slidesPerGroup : 1,
        navigation: {
            nextEl: ".winter-button-next",
            prevEl: ".winter-button-prev",
        },
        scrollbar: {
          el: ".winter-scrollbar",
          hide: true,
        },
    });

    // Product card swiper
    const itemSwiper = new Swiper(".item-swiper", {
        navigation: {
            nextEl: ".item-button-next",
            prevEl: ".item-button-prev",
        },
        pagination: {
            el: ".item-pagination",
            clickable: true,
        }
    });
})