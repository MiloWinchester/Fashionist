"use strict"
const $ = document;
const template = $.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
<link rel="stylesheet" href="assets/components/footer/footer.css">
        <footer id="footer">
                <div id="footer-top">
                    <div id="footer-logo">
                        <h1>Fashionist</h1>
                    </div>
                    <div id="social-links">
                        <button id="tel-btn">
                            <a href="https://t.me/MiloWinchester" target="_blank">
                                <i class="bi bi-telegram"></i>
                            </a>
                        </button>
                        <button id="insta-btn" target="_blank">
                            <a href="https://www.instagram.com/millad_x/">
                                <i class="bi bi-instagram"></i>
                            </a>
                        </button>
                        <button id="x-btn" target="_blank">
                            <a href="https://twitter.com/MilloWinchester">
                                <i class="bi bi-twitter-x"></i>
                            </a>
                        </button>
                        <button id="site-btn">
                            <a href="">
                                <i class="bi bi-globe2"></i>
                            </a>
                        </button>
                        <button id="email-btn" target="_blank">
                            <a href="mailto:milowinchester6@gmail.com">
                                <i class="bi bi-envelope"></i>
                            </a>
                        </button>
                    </div>
                    <div id="totop-btn">
                        <p>Return to top 
                            <i class="bi bi-arrow-up"></i>
                        </p>
                        <p class="only-top-icon">
                            <i class="bi bi-arrow-up"></i>
                        </p>
                    </div>
                </div>
                <hr>
                <div id="social-links">
                    <button id="tel-btn">
                        <a href="https://t.me/MiloWinchester" target="_blank">
                            <i class="bi bi-telegram"></i>
                        </a>
                    </button>
                    <button id="insta-btn" target="_blank">
                        <a href="https://www.instagram.com/millad_x/">
                            <i class="bi bi-instagram"></i>
                        </a>
                    </button>
                    <button id="x-btn" target="_blank">
                        <a href="https://twitter.com/MilloWinchester">
                            <i class="bi bi-twitter-x"></i>
                        </a>
                    </button>
                    <button id="site-btn">
                        <a href="">
                            <i class="bi bi-globe2"></i>
                        </a>
                    </button>
                    <button id="email-btn" target="_blank">
                        <a href="mailto:milowinchester6@gmail.com">
                            <i class="bi bi-envelope"></i>
                        </a>
                    </button>
                </div>
                <div id="footer-info">
                    <div class="footer-content">
                        <p>About us</p>
                        <ul>
                            <li>
                                <a href="">• Blog</a>
                            </li>
                            <li>
                                <a href="">• Careers</a>
                            </li>
                            <li>
                                <a href="">• Brands</a>
                            </li>
                            <li>
                                <a href="">• Investors</a>
                            </li>
                            <li>
                                <a href="">• About Fashionist</a>
                            </li>
                        </ul>
                    </div>
                    <div class="footer-content">
                        <p>Useful links</p>
                        <ul>
                            <li>
                                <a href="product.html">• Products</a>
                            </li>
                            <li>
                                <a href="signup.html">• Signup</a>
                            </li>
                            <li>
                                <a href="login.html">• Login</a>
                            </li>
                            <li>
                                <a href="basket.html">• Bag</a>
                            </li>
                            <li>
                                <a href="favourite.html">• Favourites</a>
                            </li>
                        </ul>
                    </div>
                    <div class="footer-content">
                        <p>For you</p>
                        <ul>
                            <li>
                                <a href="">• FAQs</a>
                            </li>
                            <li>
                                <a href="">• Refunds</a>
                            </li>
                            <li>
                                <a href="">• Payments</a>
                            </li>
                            <li>
                                <a href="">• Accessbility</a>
                            </li>
                            <li>
                                <a href="">• Terms and Conditions</a>
                            </li>
                        </ul>
                    </div>
                    <div class="footer-content">
                        <p>Get on board!</p>
                        <div id="offer">
                            <p>Enjoy early access, exclusive offers, <br> and 15% off in your first order.</p>
                            <input type="email" placeholder="Email" id="offer-input">
                            <div>
                                <button id="offer-btn">Submit</button>
                                <small class="offer-msg"></small>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="res-footerinfo">
                    <div class="footer-content">
                        <p>About us</p>
                        <ul>
                            <li>
                                <a href="">• Blog</a>
                            </li>
                            <li>
                                <a href="">• Careers</a>
                            </li>
                            <li>
                                <a href="">• Brands</a>
                            </li>
                            <li>
                                <a href="">• Investors</a>
                            </li>
                            <li>
                                <a href="">• About Fashionist</a>
                            </li>
                        </ul>
                    </div>
                    <div class="footer-content">
                        <p>Useful links</p>
                        <ul>
                            <li>
                                <a href="product.html">• Products</a>
                            </li>
                            <li>
                                <a href="signup.html">• Signup</a>
                            </li>
                            <li>
                                <a href="login.html">• Login</a>
                            </li>
                            <li>
                                <a href="basket.html">• Bag</a>
                            </li>
                            <li>
                                <a href="favourite.html">• Favourites</a>
                            </li>
                        </ul>
                    </div>
                    <div class="footer-content">
                        <p>For you</p>
                        <ul>
                            <li>
                                <a href="">• FAQs</a>
                            </li>
                            <li>
                                <a href="">• Refunds</a>
                            </li>
                            <li>
                                <a href="">• Payments</a>
                            </li>
                            <li>
                                <a href="">• Accessbility</a>
                            </li>
                            <li>
                                <a href="">• Terms and Conditions</a>
                            </li>
                        </ul>
                    </div>
                    <hr>
                    <div class="footer-content onboard-center">
                        <p>Get on board!</p>
                        <div id="offer">
                            <p>Enjoy early access, exclusive offers, <br> and 15% off in your first order.</p>
                            <input type="email" placeholder="Email" id="offer-input">
                            <div>
                                <button id="offer-btn">Submit</button>
                                <small class="offer-msg"></small>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div id="footer-bottom">
                    <p>
                        <i class="bi bi-c-circle"></i>
                        2023 Milo Winchester, All Rights Reserved</p>
                    <p>Made With ⚡🧡</p>
                    <div>
                        <p>
                            This project is for personal resume,
                            <p>Any copy is not allowed!</p>
                        </p>
                    </div>
                </div>
        </footer>
`

class footer extends HTMLElement {
    constructor () {
        super();

        this.attachShadow({mode:'open'})
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback () {
        this.toTopBtn = this.shadowRoot.getElementById('totop-btn');
        this.offerEmailInput = this.shadowRoot.getElementById('offer-input')
        this.submitOfferBtn = this.shadowRoot.getElementById('offer-btn')
        this.offerMsg = this.shadowRoot.querySelector('.offer-msg');
        this.emailRegex = new RegExp('^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})?$');

        this.toTopBtn.addEventListener('click', this.goToTop);
        this.submitOfferBtn.addEventListener('click', () => {
            this.submitOffer()
        });
    }

    goToTop () {
        window.scrollTo({
            behavior: 'smooth',
            top: 0,
        })
    }

    submitOffer () {
        let emailValue = this.offerEmailInput.value;
        if (!emailValue){
            this.offerMsg.innerHTML = 'Please enter your email';
            this.offerMsg.classList.add('showErrMsg');
        } else if (!this.emailRegex.test(emailValue)) {
            this.offerMsg.innerHTML = 'Enter a valid email'
            this.offerMsg.classList.add('showErrMsg');
        }else if (this.emailRegex.test(emailValue)) {
            this.offerMsg.innerHTML = 'Successfuly submitted'
            this.offerMsg.classList.add('showSuccMsg')
        }

        this.offerEmailInput.value = '';

        setTimeout(() => {
            this.offerMsg.innerHTML = '';
            this.offerMsg.classList.remove('showErrMsg');
            this.offerMsg.classList.remove('showSuccMsg');
        }, 2000)
    }
}

export {footer};