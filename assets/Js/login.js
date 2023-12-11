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
const signupLink = $.querySelector('#signup-link a')

const emailRegex = new RegExp('^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})?$');

let users = [];

async function getUsers () {
    let response = await fetch('https://fashionist-shop-default-rtdb.firebaseio.com/users.json');
    let allUsers = await response.json();

    if (allUsers) {
        users = Object.entries(allUsers);
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
        body: JSON.stringify(user[1])
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
                setUserIdCookie(user[0]);
            }
        });
        
        if (rememberCheckbox.checked) {
            setLoginCookie();
        }

        setExpireCookie();
        showModal();
        resetInputs();
        changePage();
    }
}

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

const setLoginCookie = () => {
    let now = new Date();
    let expire = now.getTime() + (2 * 24 * 60 * 60 * 1000);
    now.setTime(expire);

    $.cookie = `isLogin=${true};path=/;expires=${now.toUTCString()}`;
}

const setExpireCookie = () => {
    let now = new Date();
    let expire = now.getTime() + (24 * 60 * 60 * 1000);
    now.setTime(expire)

    $.cookie = `expireTime=${expire};path=/;expires=${now.toUTCString()}`;
}

const setUserIdCookie = userId => {
    let now = new Date();
    let expire = now.getTime() + (24 * 60 * 60 * 1000);
    now.setTime(expire)

    $.cookie = `id=${userId};path=/;expires=${now.toUTCString()}`;
}


const changePage = () => {
    setTimeout(() => {
        location.href = 'https://milowinchester.github.io/Fashionist/index.html';
    }, 4000);
};

const resetInputs = () => {
    [emailInput.value, passInput.value] = ['', ''];
}

const removeFilter = () => {
    container.style.filter = 'none'
}

const goToSignup = () => {
    location.href = 'https://milowinchester.github.io/Fashionist/signup.html'
}

window.addEventListener('load', () => {
    getUsers();
    removeFilter();
});

loginForm.addEventListener('submit', event => {
    event.preventDefault();
    login();
})

signupLink.addEventListener('click', () => {
    goToSignup();
})