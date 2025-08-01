const logoutButton = new LogoutButton();

logoutButton.action = () => {
	ApiConnector.logout(response => {
		//debugger;
		console.log(response);

		if (response.success) {
			location.reload();
		} else {
			userForm.setLoginErrorMessage("Ошибка при выходе");
		}
	})
};

// ApiConnector.logout(response => console.log(response));

ApiConnector.current(response => {
	//debugger;
	console.log(response);

	if (response.success) {
		ProfileWidget.showProfile(response.data);
	}
});

// ApiConnector.current(response => console.log(response));

const ratesBoard = new RatesBoard();

function updateRates() {
	ApiConnector.getStocks(response => {
		//debugger;
		console.log(response);

		if (response.success === true) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(response.data);
		}
	})
};

updateRates();
setInterval(updateRates, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
	const {
		currency,
		amount
	} = data;

	ApiConnector.addMoney({
		currency,
		amount
	}, response => {
		console.log(response);

		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, "Запрос на пополнение баланса выполнен успешно");
		} else {
			moneyManager.setMessage(false, response.error || "Ошибка, пополнение баланса не возможно");
		}
	})
};
// ApiConnector.addMoney({ currency: "RUB", amount: 1000 }, response => console.log(response));

moneyManager.conversionMoneyCallback = (data) => {
	const {
		fromCurrency,
		targetCurrency,
		fromAmount
	} = data;

	ApiConnector.convertMoney({
		fromCurrency,
		targetCurrency,
		fromAmount
	}, response => {
		console.log(response);

		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, "Запрос на конвертирование валюты выполнен успешно");
		} else {
			moneyManager.setMessage(false, response.error || "Ошибка, конвертирование валюты не возможно");
		}
	})
};

// ApiConnector.convertMoney({ fromCurrency: "RUB", targetCurrency: "USD", fromAmount: 2000 }, response => console.log(response));

moneyManager.sendMoneyCallback = (data) => {
	const {
		to,
		currency,
		amount
	} = data;

	ApiConnector.transferMoney({
		to,
		currency,
		amount
	}, response => {

		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, "Запрос на перевод валюты выполнен успешно");
		} else {
			moneyManager.setMessage(false, response.error || "Ошибка, перевод валюты не возможен");
		}
	})
};

// ApiConnector.transferMoney({ to: 1, currency: "USD", amount: 1}, response => console.log(response));

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
	if (response.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
	}

});


favoritesWidget.addUserCallback = (data) => {
	const {
		id,
		name
	} = data;

	ApiConnector.addUserToFavorites({
		id,
		name
	}, response => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage(true, "Пользователь успешно добавлен в избранное");
		} else {
			favoritesWidget.setMessage(false, response.error || "Добавить пользователя не удалось");
		}
	});
};

//ApiConnector.addUserToFavorites({ id: 1, name: "oleg"}, response => console.log(response));

favoritesWidget.removeUserCallback = () => {
	const id = data;

	ApiConnector.removeUserFromFavorites(id, response => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage(true, "Пользователь успешно удален из избранного");
		} else {
			favoritesWidget.setMessage(false, response.error || "Удалить пользователя не удалось");
		}
	});
}

//ApiConnector.removeUserFromFavorites( 1, response => console.log(response));