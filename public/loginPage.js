"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
	const {
		login,
		password
	} = data;

	ApiConnector.login({
		login,
		password
	}, response => {
		console.log(response);

		if (response.success) {
			location.reload();
		} else {
			userForm.setLoginErrorMessage(`Пользователь с логином ${login} и указанным паролем не найден`);
		}
	});
}

userForm.registerFormCallback = (data) => {
	const {
		login,
		password
	} = data;

	if (!login || !password) {
		userForm.setRegisterErrorMessage("Ошибка, введите данные");
	}

	ApiConnector.register({
		login,
		password
	}, response => {
		//debugger;
		console.log(response);

		if (response.success) {
			userForm.registerFormAction();
		} else {
			userForm.setRegisterErrorMessage("Ошибка регистрации");
		}
	});
}


// ApiConnector.login({ login: "oleg@demo.ru", password: "demo" }, response => console.log(response));
// ApiConnector.register({ login: "oleg3@demo.ru", password: "demo3" }, response => console.log(response));