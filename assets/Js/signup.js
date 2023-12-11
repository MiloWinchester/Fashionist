"use strict"
import {themeBtn} from '../components/themeBtn/themeBtn.js';
import { loader } from "../components/loader/loader.js";

window.customElements.define('theme-btn', themeBtn);
window.customElements.define('site-loader', loader);

const $ = document;
const signupForm = $.getElementById('signup-form');
const nameInput = $.getElementById('name-input');
const lastnameInput = $.getElementById('lastname-input');
const emailInput = $.getElementById('email-input');
const passInput = $.getElementById('pass-input');
const passConfirmInput = $.getElementById('pass-confirm-input');
const phoneInput = $.getElementById('phone-input');
const nameErr = $.getElementById('name-err')
const emailErr = $.getElementById('email-err');
const passErr = $.getElementById('pass-err');
const passConfirmErr = $.getElementById('confirm-pass-err');
const phoneErr = $.getElementById('phone-err');
const modal = $.querySelector('.modal-box');
const container = $.getElementById('container');
const loginLink = $.querySelector('#login-link a')

const emailRegex = new RegExp('^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})?$');
const phoneRegex = new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$');

let users = [];

async function getUsers () {
    let response = await fetch('https://fashionist-shop-default-rtdb.firebaseio.com/users.json')
    let allUsers = await response.json();
    
    if (allUsers) {
        for (let user in allUsers) {
            users.push(allUsers[user])
        }
    }else {
        users = [];
    }
}

async function setNewUser (newUser) {
    await fetch('https://fashionist-shop-default-rtdb.firebaseio.com/users.json', {
        method: "POST",
        headers: {
            'Content-type' : 'application/json'
        },
        body : JSON.stringify(newUser)
    })
    .then(response => console.log(response))
    .catch(err => console.error(err));
}

const signup = () => {
    let [userName, userLastname, userEmail, userPass, userPhone] = 
    [getName(), getLastname(), getEmail(), getPassConfirm(), getPhone()];

    if (userName && userEmail && userPass) {
        let isInList = checkUserList(userEmail);
         
        if (isInList) {
            showErrorModal();
        }else {
            let newUser = {
                userId : users.length,
                name : userName,
                lastname : userLastname,
                email : userEmail,
                password : userPass,
                phone : userPhone,
                isLogin : false,
                bag: [],
                favourites: []
            }
    
            setNewUser(newUser);
            showSuccessModal();
            resetInputs();
            changePage();
        }
    }
}

const getName = () => {
    let userName = nameInput.value;

    if (!userName) {
        error(nameInput)
        nameErr.innerHTML = 'Name is required!'
    }else if (userName.length < 4) {
        error(nameInput);
        nameErr.innerHTML = 'Enter atleast 3 charector!';
    }else {
        success(nameInput, nameErr);
        return userName;
    }
}

const getLastname = () => {
    let userLastname = lastnameInput.value;

    if (!userLastname) {
        return '';
    }else {
        return userLastname;
    }
}

const getEmail = () => {
    let userEmail = emailInput.value.toLowerCase();

    if (!userEmail) {
        error(emailInput);
        emailErr.innerHTML = 'Email is required!'
    }else if (!emailRegex.test(userEmail)) {
        error(emailInput);
        emailErr.innerHTML = 'Enter a valid email!'
    }else {
        success(emailInput, emailErr);
        return userEmail;
    }
}

const getPass = () => {
    let userPass = passInput.value

    if (!userPass) {
        error(passInput)
        passErr.innerHTML = 'Password is required!';
    }else if (userPass.length < 8) {
        error(passInput)
        passErr.innerHTML = 'Enter atleast 8 charector';
    }else {
        success(passInput, passErr);
        return userPass;
    }
}

const getPassConfirm = () => {
    let userConfirmPass = passConfirmInput.value;
    let userPass = getPass();

   if (!userConfirmPass) {
        error (passConfirmInput);
        passConfirmErr.innerHTML = 'Confirm your password!'
   }else if (userPass != userConfirmPass ) {
        error(passConfirmInput)
        passConfirmErr.innerHTML = "Password does't match";
    }else {
        success(passConfirmInput, passConfirmErr);
        return userConfirmPass;
    }
}

const getPhone = () => {
    let userPhone = phoneInput.value;

    if (!userPhone) {
        return '';
    } else if (!phoneRegex.test(userPhone)) {
        error(phoneInput);
        phoneErr.innerHTML = 'Enter a valid phone number!'
    }else {
        success(phoneInput, phoneErr);
        return userPhone;
    }
}

const error = input => {
    input.classList.add('error')
}

const success = (input, msg) => {
    input.classList.remove('error');
    msg.innerHTML = '';
}

const checkUserList = userEmail => {
    let isInList = users.some(user => {
        return userEmail === user.email;
    })

    if (isInList) {
        return true;
    }else {
        return false;
    }
}

const showErrorModal = () => {
    modal.classList.add('showErrModal')
    modal.innerHTML = 'User already exists! 🤔';

    setTimeout(() => {
        modal.classList.remove('showErrModal');
        hideErrModal();
    }, 3000)
}

const showSuccessModal = () => {
    modal.classList.add('showSuccessModal');
    modal.innerHTML = 'Successfully signed up ⚡';

    setTimeout(() => {
        modal.classList.remove('showSuccessModal');
        hideSuccessModal();
    }, 3000)
}

const hideErrModal = () => {
    modal.classList.add('hideErrModal')

    setTimeout(() => {
        modal.classList.remove('hideErrModal')
    }, 500)
}

const hideSuccessModal = () => {
    modal.classList.add('hideSuccessModal')

    setTimeout(() => {
        modal.classList.remove('hideSuccessModal')
    }, 500)
}

const changePage = () => {
    setTimeout(() => {
        location.href = 'https://milowinchester.github.io/Fashionist/login.html';
    }, 4000)
}

const resetInputs = () => {
    [nameInput.value, lastnameInput.value, emailInput.value, 
    passInput.value, passConfirmInput.value, phoneInput.value] = ['', '', '', '', '', ''];
}

const removeFilter = () => {
    container.style.filter = 'none'
}

const goToLogin = () => {
    location.href = 'https://milowinchester.github.io/Fashionist/login.html'
}

window.addEventListener('load', () => {
    getUsers();
    removeFilter();
});

signupForm.addEventListener('submit', event => {
    event.preventDefault();
    signup();
});

loginLink.addEventListener('click', () => {
    goToLogin();
})