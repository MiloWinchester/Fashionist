"use strict"
const $ = document;
const template = $.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
<link rel="stylesheet" href="assets/components/themeBtn/themeBtn.css">
<div id="theme">
    <button id="theme-btn">
        <i class="bi bi-sun-fill" id="theme-icon"></i>
    </button>
</div>
`

class themeBtn extends HTMLElement {
    constructor () {
        super();

        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback () {
        this.themeBtn = this.shadowRoot.getElementById('theme-btn');
        this.themeIcon = this.shadowRoot.getElementById('theme-icon');
        this.root = $.querySelector(':root')

        this.themeBtn.addEventListener('click', () => {
            this.changeTheme();
        });

        window.addEventListener('load', () => {
            this.getThemeCookie()
        });
    }

    changeTheme () {
        if (this.themeIcon.className === 'bi bi-sun-fill'){
            this.themeIcon.className = 'bi bi-moon-fill';
            this.root.style.setProperty('--theme', 'rgb(233 231 231)');
            this.root.style.setProperty('--color', '#333');
            this.setThemeCookie('light');
        }else {
            this.themeIcon.className = 'bi bi-sun-fill';
            this.root.style.setProperty('--theme', '#333');
            this.root.style.setProperty('--color', 'rgb(233 231 231)');
            this.setThemeCookie('dark')
        }
    }

    setThemeCookie (theme) {
        let now = new Date();
        let expire = now.getTime() + 7 * 24 * 60 * 60 * 1000;
        now.setTime(expire);
        $.cookie = `theme=${theme};path=/;expires=${now}`;
    }

    getThemeCookie () {
        let splitCookies = $.cookie.split(';');
        let themValue = null; 
        splitCookies.some(cookie => {
            if (cookie.includes('theme')) {
                themValue = cookie.substring(cookie.indexOf('=') + 1);
                this.loadTheme(themValue);
            }
        })
    }

    loadTheme (theme) {
        if (theme === 'light'){
            this.themeIcon.className = 'bi bi-moon-fill';
            this.root.style.setProperty('--theme', 'rgb(233 231 231)');
            this.root.style.setProperty('--color', '#333');
        }else {
            this.themeIcon.className = 'bi bi-sun-fill';
            this.root.style.setProperty('--theme', '#333');
            this.root.style.setProperty('--color', 'rgb(233 231 231)');
        }
    }
}

export {themeBtn};