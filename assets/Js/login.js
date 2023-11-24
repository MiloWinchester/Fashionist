"use strict";
import { themeBtn } from "../components/themeBtn/themeBtn.js";
import { loader } from "../components/loader/loader.js";

window.customElements.define('theme-btn', themeBtn);
window.customElements.define('site-loader', loader);

const $ = document;
const loginForm = $.getElementById('login-form');
const emailInput = $.getElementById('email-input');
const passInput = $.getElementById('pass-input');
const emailErr = $.getElementById('email-err');
const passErr = $.getElementById('pass-err')
const rememberCheckbox = $.getElementById('remember-check');
const modal = $.querySelector('.modal-box');
const container = $.getElementById('container');

const emailRegex = new RegExp('^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})?$');

let users = [];

async function getUsers () {
    let response = await fetch('https://fashionist-shop-default-rtdb.firebaseio.com/users.json');
    let allUsers = await response.json();

    if (allUsers) {
        users = Object.entries(allUsers);
        console.log(users);
    }else {
        users = [];
    }
}

async function updateUser (user) {
    await fetch(`https://fashionist-shop-default-rtdb.firebaseio.com/users/${user[0]}.json`, {
        method: 'PUT',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(user)
    }).then(res => console.log(res))
    .catch(err => console.log(err))
}

const login = () => {
    let [userEmail, userPass] = [getEmail(), getPass()];

    if (userEmail && userPass) {

        users.some(user => {
            if (userEmail === user[1].email) {
                user[1].isLogin = true;
                updateUser(user);
                console.log("logged in user: ",user);
            }
        });
        
        if (rememberCheckbox.checked) {
            setCookie();
        }
        
        showModal();
        changePage();
    }
}

console.log('refactor login page.no4');

const getEmail = () => {
    let userEmail = emailInput.value.toLowerCase();

    if (!users) {
        emailErr.innerHTML = 'Please sign up first'
        error(emailInput);
        return false;
    }

    let hasSignedup = users.some(user => {
        return userEmail === user[1].email;
    })
    
    if (!userEmail) {
        emailErr.innerHTML = 'Enter your email address!'
        error(emailInput);
    }else if (!emailRegex.test(userEmail)) {
        emailErr.innerHTML = 'Enter a valid email!'
        error(emailInput);
    }else if (!hasSignedup) {
        emailErr.innerHTML = 'Please sign up first'
        error(emailInput);
    }else {
        success(emailInput, emailErr);
        return userEmail;
    }
}

const getPass = () => {
    let userPass = passInput.value;
    let userEmail = getEmail();

    if (!users) {
        passErr.innerHTML = 'Please sign up first'
        error(passInput);
        return false;
    }

    let isPasswordCorrect = users.some(user => {
        if (userEmail === user[1].email) {
            return userPass === user[1].password;
        }
    })

    if (!userEmail) {
        passErr.innerHTML = 'Enter your email first';
        error(passInput);
    }else if (!userPass) {
        passErr.innerHTML = 'Enter your password!';
        error(passInput);
    }else if (!isPasswordCorrect) {
        passErr.innerHTML = 'Password is not correct!'
        error(passInput);
    }else {
        success(passInput, passErr);
        return userPass;
    }
}

const error = input => {
    input.classList.add('error')
}

const success = (input, msg) => {
    input.classList.remove('error');
    msg.innerHTML = '';
}

const showModal = () => {
    modal.classList.add('showModal');

    setTimeout(() => {
        modal.classList.remove('showModal');
        hideModal();
    }, 3000)
}

const hideModal = () => {
    modal.classList.add('hideModal');

    setTimeout(() => {
        modal.classList.remove('hideModal');
    }, 500);
}

const setCookie = () => {
    let now = new Date;
    let expire = now.getTime() + 24 * 60 * 60 * 1000;
    now.setTime(expire);

    $.cookie = `isLogin=${true};path=/;expires=${now}`;
    $.cookie = `loginExpire=${expire};path=/;expires=${now}`
}

const changePage = () => {
    setTimeout(() => {
        // location.href = 'https://milowinchester.github.io/Fashionist/index.html';
    }, 4000);
};

const removeFilter = () => {
    container.style.filter = 'none'
}

window.addEventListener('load', () => {
    getUsers();
    removeFilter();
});

loginForm.addEventListener('submit', event => {
    event.preventDefault();
    login();
})
