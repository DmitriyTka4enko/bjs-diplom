"use strict";

let userForm = new UserForm();

userForm.loginFormCallback = data => {
	ApiConnector.login(data, response => {
		if (response.success) {
			location.reload();
		} else {
			userForm.setLoginErrorMessage('Ошибка при авторизации: ' + response.error);
		}
	});
}

userForm.registerFormCallback = data => {
	ApiConnector.register(data, response => {
		if (response.success) {
			location.reload();
		} else {
			userForm.setRegisterErrorMessage('Ошибка при регистрации: ' + response.error);
		}
	});
}
