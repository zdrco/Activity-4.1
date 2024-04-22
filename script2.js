const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#confirm-password');

const form = document.querySelector('#signup');

const checkUsername = () => {
  let valid = false;
  const min = 3,
        max = 25;
  const username = usernameEl.value.trim();
  if (!isRequired(username)) {
    showError(usernameEl, 'Username cannot be blank.');
  } else if (!isBetween(username.length, min, max)) {
    showError(usernameEl, `Username must be between ${min} and ${max} characters.`);
  } else {
    showSuccess(usernameEl);
    valid = true;
  }
  return valid;
};

const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, 'Email cannot be blank.');
  } else if (!isEmailValid(email)) {
    showError(emailEl, 'Email is not valid.');
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

const checkPassword = () => {
    let valid = false;

    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    } else if (password.length < 8) {
        showError(passwordEl, 'Password must be at least 8 characters long.');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};

const isRequired = value => value.trim() === '' ? false : true;


const checkConfirmPassword = () => {
  let valid = false;
  const confirmPassword = confirmPasswordEl.value.trim();
  const password = passwordEl.value.trim();
  if (!isRequired(confirmPassword)) {
    showError(confirmPasswordEl, 'Please enter the password again.');
  } else if (password !== confirmPassword) {
    showError(confirmPasswordEl, 'The passwords do not match.');
  } else {
    showSuccess(confirmPasswordEl);
    valid = true;
  }
  return valid;
};

const isEmailValid = (email) => {
    return email.includes('@');
};

const isPasswordSecure = (password) => {
    return password.length >= 8;
};


const isBetween = (length, min, max) => length >= min && length <= max;

const showError = (input, message) => {
  const formGroup = input.parentElement;
  formGroup.classList.remove('success');
  formGroup.classList.add('error');
  const error = formGroup.querySelector('small');
  error.textContent = message;
};

const showSuccess = (input) => {
  const formGroup = input.parentElement;
  formGroup.classList.remove('error');
  formGroup.classList.add('success');
  const error = formGroup.querySelector('small');
  error.textContent = '';
};

form.addEventListener('submit', function (e) {
  e.preventDefault();
  let isUsernameValid = checkUsername(),
      isEmailValid = checkEmail(),
      isPasswordValid = checkPassword(),
      isConfirmPasswordValid = checkConfirmPassword();
  let isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;
  if (isFormValid) {
    console.log("Form submitted successfully!");
  }
});

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

// form submission
const handleSubmit = (e) => {
    e.preventDefault();
  
    let isUsernameValid = checkUsername();
    let isEmailValid = checkEmail();
    let isPasswordValid = checkPassword();
    let isConfirmPasswordValid = checkConfirmPassword();
  
    if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
      // jump to calculator
      window.location.href = "calculator.html";
    } else {
      return false;
    }
  };

  form.addEventListener('submit', handleSubmit);
  

form.addEventListener('input', debounce(function (e) {
  switch (e.target.id) {
    case 'username':
      checkUsername();
      break;
    case 'email':
      checkEmail();
      break;
    case 'password':
      checkPassword();
      break;
    case 'confirm-password':
      checkConfirmPassword();
      break;
  }
}));
