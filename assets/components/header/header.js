"use strict"
const $ = document;
const template = $.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
<link rel="stylesheet" href="assets/Css/main.css">
<link rel="stylesheet" href="assets/components/header/header.css">
<header id="header">
    <nav id="navbar">
        <div id="header-logo">
            <h1>
                <a href="index.html">Fashionist</a>
            </h1>
        </div>
        <ul id="navbar-list">
            <li id="fav-bag-btns">
                <button id="bag-btn">
                    <a href="basket.html">
                        <i class="bi bi-handbag"></i>
                    </a>
                </button>
                <button id="fav-btn">
                    <a href="favourite.html">
                        <i class="bi bi-suit-heart"></i>
                    </a>
                </button>
            </li>
            <li id="login">
                <button class="signup-btn">
                    <a href="signup.html">Sign in</a>
                </button>
                <button class="profile-btn">
                    <a>
                        <p>Profile</p>
                        <i class="bi bi-caret-down-fill"></i>
                    </a>
                </button>
                <div class="profile-box">
                    <div class="profile-list">
                        <ul class="profile-dropdown">
                            <li>Profile</li>
                            <hr>
                            <li>
                                <a href="favourite.html">Favourites</a>
                            </li>
                            <hr>
                            <li>
                                <a href="basket.html">Bag</a>  
                            </li>
                            <hr>
                            <li id="logout-btn">
                                Logout
                            </li>
                        </ul>
                    </div>
                </div>
            </li>
            <li id="category">
                <button>
                    <a>
                        <p>Category</p>
                        <i class="bi bi-caret-down-fill"></i>
                    </a>
                </button>
                <div class="category-box">
                    <div class="category-list">
                        <ul class="categories">
                            <li>
                                <a class="link" data-id="trend-container" data-url="index.html">Trending</a>
                            </li>
                            <hr>
                            <li>
                                <a data-id="arrival-container" data-url="index.html" class="link">New Arrival</a>
                            </li>
                            <hr>
                            <li>
                                <a data-id="offer-container" data-url="index.html" class="link">Offers</a>
                            </li>
                            <hr>
                            <li>Brands</li>
                            <hr>
                            <li>Top Styles</li>
                        </ul>
                        <ul class="categories border-left">
                            <li>
                                <a class="link" data-id='bestsells-container' data-url="product.html">Best Sells</a>
                            </li>
                            <hr>
                            <li>
                                <a class="link" data-id="featured-container" data-url="product.html">Featured</a>
                            </li>
                            <hr>
                            <li>Models</li>
                            <hr>
                            <li>
                                <a data-id="accessory-container" data-url="product.html" class="link">Accessories</a>
                            </li>
                            <hr>
                            <li>
                                <a data-id="accessory-container" data-url="product.html" class="link">Under Wear</a>
                            </li>
                        </ul>
                        <ul class="categories border-left">
                            <li>
                                <a data-id="shoes-container" data-url="product.html" class="link">Shoes & Sneakers</a>
                            </li>
                            <hr>
                            <li>
                                <a data-id="summer-container" data-url="product.html" class="link">T-Shirts & Shirts</a>
                            </li>
                            <hr>
                            <li>
                                <a data-id="jeans-container" data-url="product.html" class="link">Jeans & Pants</a>
                            </li>
                            <hr>
                            <li>
                                <a data-id="winter-container" data-url="product.html" class="link">Hoodies & Jackets</a>
                            </li>
                            <hr>
                            <li>Hats & Bags</li>
                        </ul>
                    </div>
                </div>
            </li>
            <li id="product">
                <button>
                    <a href="product.html">
                        Products
                    </a>
                </button>
            </li>
        </ul>
    </nav>
</header>
`

class header extends HTMLElement {
    constructor () {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback () {
        const header = this.shadowRoot.getElementById('header');
        const categoryBtn = this.shadowRoot.getElementById('category');
        const links = this.shadowRoot.querySelectorAll('.link');
        const logoutBtn = this.shadowRoot.getElementById('logout-btn');

        window.addEventListener('scroll', () => {
            if ($.documentElement.scrollTop >= 30) {
                header.classList.add('moved');
            }else {
                header.classList.remove('moved')
                
            }
        });

        categoryBtn.addEventListener('mouseenter', () => {
            categoryBtn.classList.add('open');
            categoryBtn.classList.remove('close')
        });
        categoryBtn.addEventListener('mouseleave', () => {
            categoryBtn.classList.remove('open');
            categoryBtn.classList.add('close');
        });

        links.forEach(link => {
            link.addEventListener('click', event => {
                this.checkUrl(event.target);
            })
        })

        window.addEventListener('load', () => {
            this.checkDevice();
            this.userLoginInfo();
        });

        logoutBtn.addEventListener('click', () => {
            this.logout();
        });
    }

    checkUrl (link) {
        const url = link.dataset.url;
        const currentUrl = location.href;
        if (currentUrl.includes(url)) {
            this.moveTo(link);
        }else {
            location.href = `https://milowinchester.github.io/Fashionist/${url}#${link.dataset.id}`
        }
    }

    moveTo (link) {
        const targetId = link.dataset.id;
        const targetElem = $.getElementById(targetId);
        const targetTop = targetElem.offsetTop;
        window.scrollTo({
            behavior: 'smooth',
            top: targetTop - 50,
        })
    }

    async userLoginInfo () {
        let userId = this.getUserId();
        
        if (userId) {
            let user = await this.getUserInfo(userId);

            if (user.isLogin) {
                this.checkExpireTime(user, userId);
            }else {
                this.removeProfile();
            }
        }
    }

    async updateUser (user, userId) {
        fetch(`https://fashionist-shop-default-rtdb.firebaseio.com/users/${userId}.json`, {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => console.log(res))
        .catch(err => console.error(err))
    }

    getUserId () {
        const cookies = $.cookie.split(';');
        let userId = null;

        cookies.filter(cookie => {
            if (cookie.includes('id')) {
                userId = cookie.substring(cookie.indexOf('=') + 1);
            }
        })

        if (userId) {
            return userId;
        }
    }

    async getUserInfo (userId) {
        let response = await fetch(`https://fashionist-shop-default-rtdb.firebaseio.com/users/${userId}.json`)
        let user = await response.json();

        if (user) {
            return user;
        }
    }

    checkLoginCookie () {
        const cookies = $.cookie.split(';');
        let isLogin = false;

        cookies.filter(cookie => {
            if (cookie.includes('isLogin')) {
                isLogin = cookie.substring(cookie.indexOf('=') + 1);
            }
        })

        if (isLogin) {
            this.addProfile();
            return true;
        }else {
            return false;
        }
    }

    async checkExpireTime (user, userId) {
        const cookies = $.cookie.split(';');
        let expire = null;

        cookies.filter(cookie => {
            if (cookie.includes('expireTime')) {
                expire = cookie.substring(cookie.indexOf('=') + 1);
            }
        })

        let now = new Date();

        if (expire && expire > now.getTime()) {
            this.addProfile();
        }else {
            let loginCookie = this.checkLoginCookie();
            if (!loginCookie) {
                user.isLogin = false;
                await this.updateUser(user, userId);
                this.removeProfile();
            }
        }
    }

    async logout () {
        let userId = this.getUserId();

        if (userId) {
            let user = await this.getUserInfo(userId);
            user.isLogin = false;
            await this.updateUser(user, userId);

            this.removeCookies();
            location.reload();
        }
    }

    removeCookies () {
        let cookies = $.cookie.split(';');
        let value = null;
        let now = new Date();
        let past = now.getTime() - (24 * 60 * 60 * 1000);
        now.setTime(past);

        cookies.filter(cookie => {
            if (cookie.includes('id')) {
                value = cookie.substring(cookie.indexOf('=') + 1);
                $.cookie = `id=${value};path=/;expires=${now}`;
            }else if (cookie.includes('expireTime')) {
                value = cookie.substring(cookie.indexOf('=') + 1);
                $.cookie = `expireTime=${value};path=/;expires=${now}`;
            }else if (cookie.includes('isLogin')) {
                value = cookie.substring(cookie.indexOf('=') + 1);
                $.cookie = `isLogin=${value};path=/;expires=${now}`;
            }
        })
    }

    addProfile () {
        let signupBtn = this.shadowRoot.querySelector('.signup-btn');
        const loginBtn = this.shadowRoot.getElementById('login');

        signupBtn.classList.add('hideSignup');

        loginBtn.addEventListener('mouseenter', () => {
            loginBtn.classList.add('open');
            loginBtn.classList.remove('close')
        });

        loginBtn.addEventListener('mouseleave', () => {
            loginBtn.classList.remove('open');
            loginBtn.classList.add('close')
        })
    }

    removeProfile () {
        let signupBtn = this.shadowRoot.querySelector('.signup-btn');
        signupBtn.classList.remove('hideSignup');
    }

    checkDevice () {
        if (window.screen.availWidth <= 630) {
            const navBarList = this.shadowRoot.getElementById('navbar-list');
            navBarList.insertAdjacentHTML('afterbegin', `
            <li id="menu-bar">
                <button id="menu-btn">
                    <a>
                        <i class="bi bi-list menu-icon"></i>
                        <i class="bi bi-x-lg exit-icon"></i>
                    </a>
                </button>
                <div class="menu">
                    <ul class="menu-list">
                        <li id="category">
                            <button>
                                <a>
                                    Category
                                </a>
                            </button>
                        </li>
                        <li id="login">
                            <button class="signup-btn">
                                <a href="signup.html">Sign in</a>
                            </button>
                            <button class="profile-btn">
                                <a>
                                    <p>Logout</p>
                                </a>
                            </button>
                        </li>
                        <li id="product">
                            <button>
                                <a href="product.html">
                                    Products
                                </a>
                            </button>
                        </li>
                    </ul>
                </div>
            </li>
            `);

            const menuBtn = this.shadowRoot.getElementById('menu-btn');
            const logoutBtn = this.shadowRoot.querySelector('.profile-btn')

            menuBtn.addEventListener('click', () => {
                this.showMenu();
            })

            logoutBtn.addEventListener('click', () => {
                this.logout();
            })
        }
    }

    showMenu () {
        const menu = this.shadowRoot.querySelector('.menu');
        const menuIcon = this.shadowRoot.querySelector('.menu-icon');

        menuIcon.classList.toggle('hide-menu-icon');
        if (menu.className.includes('show')) {
            menu.classList.add('hide-menu');
            menu.classList.remove('show-menu');
        }else {
            menu.classList.remove('hide-menu');
            menu.classList.add('show-menu');
        }
    }
}

export {header};