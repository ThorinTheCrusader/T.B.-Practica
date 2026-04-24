const form = document.getElementById('login-form');
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

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const pass = document.getElementById('pass').value.trim();

    if (!email || !pass) {
        showError('All fields are required.');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(function(u) {
        return u.email === email && u.password === pass;
    });

    if (!user) {
        showError('Incorrect email or password.');
        return;
    }

    localStorage.setItem('loggedInUser', JSON.stringify(user));

    showSuccess('Welcome back, ' + user.surname + '! Redirecting...');

    setTimeout(function() {
        window.location.href = '../html/index.html';
    }, 2000);
});