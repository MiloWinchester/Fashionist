window.addEventListener('load', () => {
    const trendSwiper = new Swiper(".trend-swiper", {
        loop: true,
        slidesPerView: 2,
        spaceBetween: 2,
        slidesPerGroup : 2,
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },
        navigation: {
            nextEl: ".trend-button-next",
            prevEl: ".trend-button-prev",
        },
        scrollbar: {
          el: ".trend-scrollbar",
          hide: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 2,
                slidesPerGroup : 1,
            },
            480: {
                slidesPerView: 1,
                spaceBetween: 2,
                slidesPerGroup : 1,
            },
            640: {
                slidesPerView: 1,
                spaceBetween: 2,
                slidesPerGroup : 1,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 2,
                slidesPerGroup : 2,
            },
            1024: {
                slidesPerView: 2,
                spaceBetween: 2,
                slidesPerGroup : 2,
            }
        }
    
    });
    
    const offerSwiper = new Swiper(".offer-swiper", {
        loop: true,
        slidesPerView: 5,
        spaceBetween: 5,
        slidesPerGroup : 1,
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
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
        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 1,
                spaceBetween: 5,
                pagination: {
                    el: ".offer-pagination",
                    dynamicBullets: true,
                },
            },
            // when window width is >= 480px
            480: {
                slidesPerView: 2,
                spaceBetween: 5,
                pagination: {
                    el: ".offer-pagination",
                    dynamicBullets: true,
                },
            },
            // when window width is >= 640px
            640: {
                slidesPerView: 3,
                spaceBetween: 5
            },
            // when window width is >= 768px
            768: {
                slidesPerView: 4,
                spaceBetween: 5
            },
            // when window width is >= 1024px
            1024: {
                slidesPerView: 5,
                spaceBetween: 5
            }
        }
    });
    
    const arrivalSwiper = new Swiper(".arrival-swiper", {
        loop: true,
        slidesPerView: 5,
        spaceBetween: 5,
        slidesPerGroup : 1,
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },
        navigation: {
            nextEl: ".arrival-button-next",
            prevEl: ".arrival-button-prev",
        },
        scrollbar: {
          el: ".arrival-scrollbar",
          hide: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 5,
                pagination: {
                    el: ".offer-pagination",
                    dynamicBullets: true,
                },
            },
            480: {
                slidesPerView: 2,
                spaceBetween: 5,
                pagination: {
                    el: ".offer-pagination",
                    dynamicBullets: true,
                },
            },
            640: {
                slidesPerView: 3,
                spaceBetween: 5
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 5
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 5
            }
        }
    });
    
    
    // Product page swipers
    const featuredSwiper = new Swiper(".featured-swiper", {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 5,
        slidesPerGroup : 1,
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },
        navigation: {
            nextEl: ".featured-button-next",
            prevEl: ".featured-button-prev",
        },
        scrollbar: {
          el: ".featured-scrollbar",
          hide: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 5,
                slidesPerGroup: 1,
            },
            480: {
                slidesPerView: 1,
                spaceBetween: 5,
                slidesPerGroup: 1,
            },
            640: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 5
            },
            768: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 5
            },
            1024: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 5
            }
        }
    
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
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 5,
                pagination: {
                    el: ".bestsells-pagination",
                    dynamicBullets: true,
                },
            },
            480: {
                slidesPerView: 2,
                spaceBetween: 5,
                pagination: {
                    el: ".bestsells-pagination",
                    dynamicBullets: true,
                },
            },
            640: {
                slidesPerView: 3,
                spaceBetween: 5
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 5
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 5
            }
        }
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
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 5,
                pagination: {
                    el: ".shoes-pagination",
                    dynamicBullets: true,
                },
            },
            480: {
                slidesPerView: 2,
                spaceBetween: 5,
                pagination: {
                    el: ".shoes-pagination",
                    dynamicBullets: true,
                },
            },
            640: {
                slidesPerView: 3,
                spaceBetween: 5
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 5
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 5
            }
        }
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
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 5,
                pagination: {
                    el: ".jeans-pagination",
                    dynamicBullets: true,
                },
            },
            480: {
                slidesPerView: 2,
                spaceBetween: 5,
                pagination: {
                    el: ".jeans-pagination",
                    dynamicBullets: true,
                },
            },
            640: {
                slidesPerView: 3,
                spaceBetween: 5
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 5
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 5
            }
        }
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
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 5,
                slidesPerGroup: 1,
                pagination: {
                    el: ".accessory-pagination",
                    dynamicBullets: true,
                },
            },
            480: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 5,
                pagination: {
                    el: ".accessory-pagination",
                    dynamicBullets: true,
                },
            },
            640: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 5
            },
            768: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 5
            },
            1024: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 5
            }
        }
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
        breakpoints: {
            320: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 5,
                pagination: {
                    el: ".underWear-pagination",
                    dynamicBullets: true,
                },
            },
            480: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 5,
                pagination: {
                    el: ".underWear-pagination",
                    dynamicBullets: true,
                },
            },
            640: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 5
            },
            768: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 5
            },
            1024: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 5
            }
        }
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
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 5,
                pagination: {
                    el: ".summer-pagination",
                    dynamicBullets: true,
                },
            },
            480: {
                slidesPerView: 2,
                spaceBetween: 5,
                pagination: {
                    el: ".summer-pagination",
                    dynamicBullets: true,
                },
            },
            640: {
                slidesPerView: 3,
                spaceBetween: 5
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 5
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 5
            }
        }
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
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 5,
                pagination: {
                    el: ".winter-pagination",
                    dynamicBullets: true,
                },
            },
            480: {
                slidesPerView: 2,
                spaceBetween: 5,
                pagination: {
                    el: ".winter-pagination",
                    dynamicBullets: true,
                },
            },
            640: {
                slidesPerView: 3,
                spaceBetween: 5
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 5
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 5
            }
        }
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