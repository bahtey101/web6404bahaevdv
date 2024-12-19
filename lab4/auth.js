async function handleAuth(event, endpoint) {
    event.preventDefault();

    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;

    let formIsValid = true;

    clearErrors();

    if (!validateEmail(email)) {
        formIsValid = false;
        document.getElementById('email-error').textContent = 'Введён некорректный email';
    }

    if (!validatePassword(password)) {
        formIsValid = false;
        document.getElementById('password-error').textContent = 'Пароль слишком короткий';
    }

    if (!formIsValid) {
        return;
    }

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const result = await response.json();
            alert('Успешно: ' + result.message);
            clearForm();
        } else {
            const error = await response.json();
            alert('Ошибка: ' + error.message);
        }
    } catch (error) {
        console.error('Произошла ошибка:', error);
        alert('Не удалось выполнить запрос. Попробуйте позже.');
    }
}

// Очистка сообщений об ошибках
function clearErrors() {
    document.getElementById('email-error').textContent = '';
    document.getElementById('password-error').textContent = '';
}


// Функция для валидации email
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
}

// Функция для валидации пароля
function validatePassword(password) {
    return password.length >= 6;
}

// Обработчик для логина
const loginButton = document.getElementById('login-button');
if (loginButton) {
    loginButton.addEventListener('click', function (event) {
        handleAuth(event, 'https://your-server-endpoint.com/login');
    });
}

// Обработчик для регистрации
const signupButton = document.getElementById('signup-button');
if (signupButton) {
    signupButton.addEventListener('click', function (event) {
        handleAuth(event, 'https://your-server-endpoint.com/signup');
    });
}

// Обработчики для событий ввода для мгновенной проверки данных
document.getElementById('auth-email')?.addEventListener('input', function () {
    const email = document.getElementById('auth-email').value;
    if (!validateEmail(email)) {
        document.getElementById('email-error').textContent = 'Некорректный email';
    } else {
        document.getElementById('email-error').textContent = '';
    }
});

document.getElementById('auth-password')?.addEventListener('input', function () {
    const password = document.getElementById('auth-password').value;
    if (password.length < 6) {
        document.getElementById('password-error').textContent = 'Пароль должен содержать минимум 6 символов';
    } else {
        document.getElementById('password-error').textContent = '';
    }
});