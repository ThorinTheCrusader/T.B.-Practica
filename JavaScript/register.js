const form = document.getElementById('register-form');
const errorMsg = document.getElementById('error-msg');
const successMsg = document.getElementById('success-msg');

function showError(message) {
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
    successMsg.style.display = 'none';
}

function showSuccess(message) {
    successMsg.textContent = message;
    successMsg.style.display = 'block';
    errorMsg.style.display = 'none';
}

form.addEventListener("submit", function(event) {
    event.preventDefault()
    console.log('form submitted');

    const name = document.getElementById('name').value.trim()
    const surname = document.getElementById('surname').value.trim()
    const email = document.getElementById('email').value.trim()
    const phone = document.getElementById('phone').value.trim()
    const pass = document.getElementById('pass').value.trim()
    const confirm = document.getElementById('confirm').value.trim()
    const country = document.getElementById('country');
    const prefix = country.options[country.selectedIndex].dataset.prefix;

    if (!name || !surname || !email || !phone || !pass || !confirm) {
        showError('All fields are required.');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('Please enter a valid email address.');
        return;
    }

    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(phone)) {
        showError('Phone number must contain only digits.');
        return;
    }

    if (pass.length < 8) {
        showError('Password must be at least 8 characters.');
        return;
    }

    if (pass !== confirm) {
        showError('Passwords do not match.');
        return;
    }

    if (!prefix) {
    showError('Please select your country.');
    return;
    }

    if (!phone) {
        showError('Please enter your phone number.');
        return;
    }

    const fullPhone = prefix + phone;

    const user = {
        name: name,
        surname: surname,
        email: email,
        phone: fullPhone,
        password: pass
    };

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    const alreadyExists = existingUsers.find(function(u) {
        return u.email === email;
    });

    if (alreadyExists) {
        showError('An account with this email already exists.');
        return;
    }

    existingUsers.push(user);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    showSuccess('Account created! Redirecting...');

    setTimeout(function() {
        window.location.href = '../html/login.html';
    }, 2000);
})