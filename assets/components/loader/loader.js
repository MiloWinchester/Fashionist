"use strict"
const $ = document;
const template = $.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="assets/components/loader/loader.css">
<div class="loader-container">
    <div class="loader"></div>
</div>
`

class loader extends HTMLElement {
    constructor () {
        super();
        
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback () {
        let loader = this.shadowRoot.querySelector('.loader-container')

        window.addEventListener('load', () => {
            loader.classList.add('hidden');

            loader.addEventListener('animationend', () => {
                loader.classList.add('remove')
            })
        })
    }
}

export {loader};