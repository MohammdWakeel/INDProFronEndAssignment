const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);
confirmPasswordInput.addEventListener('input', validateConfirmPassword);

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (validateForm()) {
        alert('Form submitted successfully!');
        form.reset();
    }
});

function validateName() {
    const nameError = document.getElementById('nameError');
    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name cannot be empty.';
    } else {
        nameError.textContent = '';
    }
}

function validateEmail() {
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email.';
    } else {
        emailError.textContent = '';
    }
}

function validatePassword() {
    const passwordError = document.getElementById('passwordError');
    if (passwordInput.value.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters long.';
    } else {
        passwordError.textContent = '';
    }
    validateConfirmPassword(); 
}

function validateConfirmPassword() {
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    if (confirmPasswordInput.value !== passwordInput.value) {
        confirmPasswordError.textContent = 'Passwords do not match.';
    } else {
        confirmPasswordError.textContent = '';
    }
}

function validateForm() {
    validateName();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
    
    return !document.querySelector('.error').textContent;
}
