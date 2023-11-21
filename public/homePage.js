"use strict"

let logoutButton = new LogoutButton();
let ratesBoard = new RatesBoard();
let moneyManager = new MoneyManager();
let favoritesWidget = new FavoritesWidget();

logoutButton.action = () => {
	ApiConnector.logout(response => {
		if (response.success) {
			location.reload();
		} else {
			console.error(response.error)
		}
	});
};

ApiConnector.current(response => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
	} else {
		console.error(response.error)
	}
});

function getCurrencyRate() {
	ApiConnector.getStocks(response => {
		if (response.success) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(response.data);
		}
	});
}

getCurrencyRate();
setInterval(getCurrencyRate, 60000);

moneyManager.addMoneyCallback = (data => {
	ApiConnector.addMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Баланс пополнен');
		} else {
			moneyManager.setMessage(false, 'Не удалось пополнить баланс');
		}
	});
});

moneyManager.conversionMoneyCallback = (data => {
	ApiConnector.convertMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Конвертация выполнена');
		} else {
			moneyManager.setMessage(false, 'Ошибка при конвертации');
		}
	});
});

moneyManager.sendMoneyCallback = (data => {
	ApiConnector.transferMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Перевод средств выполнен');
		} else {
			moneyManager.setMessage(false, 'Невозможно осуществить перевод');
		}
	});
});

ApiConnector.getFavorites(response => {
	if (response.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
	}
});

favoritesWidget.addUserCallback = (data => {
	ApiConnector.addUserToFavorites(data, response => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage(true, 'Пользователь добавлен в \"Избранное\"');
		} else {
			favoritesWidget.setMessage(false, 'Ошибка добавления в \"Избранное\"');
		}
	});
});

favoritesWidget.removeUserCallback = (data => {
	ApiConnector.removeUserFromFavorites(data, response => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage(true, 'Вы удалили пользователя');
		} else {
			favoritesWidget.setMessage(false, 'Невозможно удалитьсданного пользователя');
		}
	});
});