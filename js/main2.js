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
    const params = new URLSearchParams({
        login: `${login.value}`,
        password: `${pass.value}`
    });
    const baseUrl = 'https://test-works.pr-uni.ru/api/login/';
    const success = {
        "status": "ok",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        "user": {
            "name": "John Doe"
        }
    };
    const error = {
        "status": "error",
        "errorMessage": "Неправильный логин или пароль"
    };
    // fetch(`${baseUrl}?${params.toString()}`)
    const blockForm = document.querySelector('.authorization-block');
    fetch(baseUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Неправильный логин или пароль" + error);
                
            } else {
                return success;
            }       
        })
        .then((data) => {
            console.log('Success:', data);
            form.style.display = "none";
            document.cookie = data.token;
            blockForm.insertAdjacentHTML('beforeend', `<p class="success-message">${data.user.name}, Вы успешно авторизованы!<p>`); 
        })
        .catch(error => {
            console.error('Error:', error);
        });   
});   

function loader() {
    spiner.classList.remove('submit-spinner_hide');
    login.disabled = true;
    pass.disabled = true;
    btn.disabled = true;
}



