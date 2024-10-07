function togglePassword() {
  const passwordInput = document.getElementById('password');
  const showPasswordButton = document.querySelector('.show-password');

  // Проверяем текущее состояние типа поля ввода
  if (passwordInput.type === 'password') {
      passwordInput.type = 'hidepassword'; // Показываем пароль
      showPasswordButton.textContent = 'Hide'; // Меняем текст кнопки
  } else {
      passwordInput.type = 'password'; // Скрываем пароль
      showPasswordButton.textContent = 'Show'; // Меняем текст кнопки
  }
}


document.getElementById('email').addEventListener('blur', function() {
  if (this.value.trim() === '') {
      this.classList.add('error');
      document.getElementById('emailError').style.display = 'block'; // Показываем сообщение
  } else {
      this.classList.remove('error');
      document.getElementById('emailError').style.display = 'none'; // Скрываем сообщение
  }
});

document.getElementById('password').addEventListener('blur', function() {
  if (this.value.trim() === '') {
      this.classList.add('error');
      document.getElementById('passwordError').style.display = 'block'; // Показываем сообщение
  } else {
      this.classList.remove('error');
      document.getElementById('passwordError').style.display = 'none'; // Скрываем сообщение
  }
});












function validateForm() {
  let isValid = true;

  // Сбросьте предыдущие сообщения об ошибках и классы ошибок
  document.getElementById('emailError').textContent = '';
  document.getElementById('passwordError').textContent = '';
  document.getElementById('email').classList.remove('error');
  document.getElementById('password').classList.remove('error');

  // Получите значения полей
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // Проверка email
  if (!email) {
      document.getElementById('emailError').textContent = 'Email is required.';
      document.getElementById('email').classList.add('error');
      isValid = false;
  }

  // Проверка пароля
  if (!password) {
      document.getElementById('passwordError').textContent = 'Password is required.';
      document.getElementById('password').classList.add('error');
      isValid = false;
  }

  return isValid;
}


