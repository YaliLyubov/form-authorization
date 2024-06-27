const login = document.querySelector('.form__control-user');
const pass = document.querySelector('.form__control-password');
const btn = document.querySelector('.form__btn');
let text = document.querySelector('.error-message');

function validate(reg, inp) {
    return reg.test(String(inp));
}
function notvalid(inp, el) {
    inp.classList.add('no-valid');
    el.style.visibility = 'visible';
}
function valid(inp, el) {
    inp.classList.remove('no-valid');
    inp.classList.add('is-valid');
    el.style.visibility = 'hidden';
}

const form = document.querySelector('.authorization__form');
let spiner = document.querySelector('.submit-spinner');
const blockForm = document.querySelector('.authorization-block');
const baseUrl = 'https://test-works.pr-uni.ru/api/login/';
const success = {
    "status": "ok",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    "user": {
        "name": "John Doe"
    }
};

async function getForm(user, p) {
    try {
        let response = await fetch(baseUrl);
        if ((user.value == "+7 (863) 303-36-65" || user.value == "hr@samedia.ru")
            && (p.value == "q10O57H25O82E40y95D12a85U96A4U34")) {
                console.log(success);
                form.style.display = "none";
                document.cookie = success.token;
                blockForm.insertAdjacentHTML('beforeend', `<p class="success-message">${success.user.name}, Вы успешно авторизованы!<p>`);
       } else {
            throw new Error("Неправильный логин или пароль");
       }
      }
    catch (error) {
        stopLoader();
        alert(error);
      }
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const validateTel = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    const validateEmail = /^\S+@\S+\.\S+$/;
    let validPass = /^[a-zA-Z0-9]+$/;

    if ((validate(validateTel, login.value)) || (validate(validateEmail, login.value)) ) {
        valid(login, text);
    } else {
        notvalid(login, text);
    }
    if (validate(validPass, pass.value)){
        valid(pass, text);
    } else {
        notvalid(pass, text);
    }

    loader();
    getForm(login, pass);  
});   

function loader() {
    spiner.classList.remove('submit-spinner_hide');
    login.disabled = true;
    pass.disabled = true;
    btn.disabled = true;
}
function stopLoader() {
    spiner.classList.add('submit-spinner_hide');
    login.disabled = false;
    pass.disabled = false;
    btn.disabled = false;
}



