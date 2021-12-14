var arr, win_block, winner, again, winning, game;
// оголошую змінні
var comp_sym = "o";
var user_sym = "x";
// оголошую змінні та присвоюю їм значення

function gameXO() {
	// створюю 'головну' функцію
	game = document.getElementById("game");
	arr = game.getElementsByClassName("inner");
	win_block = document.getElementById("win_block");
	win_text = win_block.getElementsByClassName("winner")[0];
	again = win_block.getElementsByClassName("again")[0];
	winning = game.getElementsByClassName("winning")[0];
	//  оголошую змінні, які повертають посилання на перший об’єкт із зазначеним значенням селекторів(айді чи клас).

	again.onclick = function gameXO() {
		// запускаю функцію в елементі із класом again, яка при кліку буде запускатись
		winning.style.display = "none";
		// задала стиль display: block; для елементів із класом winning
		win_block.style.display = "none";
		// задала стиль display: block; для елементів із айді win_block
		clearTable();
		// викликаю функцію, яка відповідає за очищення таблиці (стирання введених  Х,О)
		randomMove();
		// викликаю функцію, яка відповідає за рандомне заповнення клітинок таблиці
	};

	for (var i = 0; i < arr.length; i++) {
		// створила цикл for, який перебігається по розміру масиву  
		arr[i].onclick = function gameXO() {
			/* і запускається наступна функція при кліку на елемент із класом inner(пишемо arr, бо я присвоїла таку назву змінній, 
			яка повертає посилання на 'і'(тобто починаючи від 1 цикл перебіжиться по всіх елементах із класом inner) об'єкт із значення класу inner)*/
			drawSym(this);
			// запускаю функцію
		};
	}
	randomMove();
	// викликаю функцію, яка відповідає за рандомне заповнення клітинок таблиці
};

function randomMove() {
	// створила  функцію, яка відповідає за рандомне заповнення клітинок таблиці
	var rnd = getRandomInt(2);
	// оголошую змінну та присвоюю їй функцію із генератором чисел до 2
	console.log(rnd);
	if (rnd == 1) {
		// роблю перевірку на значення змінної rnd, якщо 1, 
		autoDrawing();
		//  то запускається функція autoDrawing
	}
	return true;
}

function drawSym(item, sym = user_sym) {
	// створила функцію drawSym, яка відповідає за оголошення 
	if (item.hasChildNodes()) {
		// перевірка на наявність дочірніх елементів
		return false;
		// повернення значення ХИБНИЙ
	}
	item.innerHTML = sym;
	// присвоєння

	var winner = checkWinner();
	// оголошую змінну та присвоюю їй функцію, що відповідає за вибір переможця

	if (sym == user_sym && !winner) {
		// перевірка, якщо sym дорівнює user_sym та не є winner, тоді запускається функція autoDrawing
		autoDrawing();
	}


	if (winner == user_sym) {
		win_text.innerHTML = "Ви виграли!";
		// якщо winner рівний user_sym, то у змінній win_text із класом winner появляється відповідний текст
	} else if (winner == comp_sym) {
		win_text.innerHTML = "Ви програли(";
		// якщо winner рівний comp_sym, то у змінній win_text із класом winner появляється відповідний текст
	}
	if (winner) {
		winning.style.display = "block";
		win_block.style.display = "block";
		// якщо оголошено переможця, то елементи із winning та win_block змінюють стиль display на блочний
	}
	return true;
	// повернення значення ІСТИНА
}

function checkWinner() {
	// створюю функцію, яка відповідає за умови переможця
	var winner = "";
	var j = 0;
	// оголошую змінні та присвоюю їм значення

	var xy_1_1 = arr[0].innerHTML;
	var xy_1_2 = arr[4].innerHTML;
	var xy_1_3 = arr[8].innerHTML;
	// оголошую змінні та присвоюю їм значення масису
	// тобто, об'єднавши ці змінні(що я зроблю в перевірках) отримаємо значення,розміщенні по діагоналі з верхнього лівого кута в нижній правий \
	var xy_2_1 = arr[2].innerHTML;
	var xy_2_2 = arr[4].innerHTML;
	var xy_2_3 = arr[6].innerHTML;
	// тобто, об'єднавши ці змінні(що я зроблю в перевірках) отримаємо значення,розміщенні по діагоналі з верхнього правого кута в нижній лівий /
	if ((xy_1_1 && xy_1_2 && xy_1_3) || (xy_2_1 && xy_2_2 && xy_2_3)) {
		// перевірка на правильну(в сенсі за правилами гри ця комбінація означатиме 
		// виграш, тобто я назвала її правильною ) комбінацію

		if (xy_1_1 == user_sym && xy_1_2 == user_sym && xy_1_3 == user_sym) {
			// перевірка, якщо значення xy_1_1, xy_1_2, xy_1_3 належать user_sym, то
			winner = user_sym;
			// то присвоюю winner до user_sym
		}
		// якщо ні, то:
		else if (xy_1_1 == comp_sym && xy_1_2 == comp_sym && xy_1_3 == comp_sym) {
			// перевірка, якщо значення xy_1_1, xy_1_2, xy_1_3 належать comp_sym, то
			winner = comp_sym;
			// то присвоюю winner до comp_sym
		}

		// аналогічна перевірка, тільки з іншими комбінаціями змінних
		if (xy_2_1 == user_sym && xy_2_2 == user_sym && xy_2_3 == user_sym) {
			winner = user_sym;
		}
		else if (xy_2_1 == comp_sym && xy_2_2 == comp_sym && xy_2_3 == comp_sym) {
			winner = comp_sym;
		}
		// якщо жодне не підійде, то залишиться значення переможця пустим ('' '')
	}

	if (!winner) {
		// перевірка коли функція не дорівнює winner
		for (var i = 0; i < 3; i++) {
			// і = 1, 2(цикл пройде двічі)
			// створила цикл за допомогою якого створяться комбінації( | ), що означають виграш вгравця чи вравця-комп'ютера

			var a1 = arr[i].innerHTML;
			var a2 = arr[i + 3].innerHTML;
			var a3 = arr[i + 6].innerHTML;

			var b1 = arr[i].innerHTML;
			var b2 = arr[i + 1].innerHTML;
			var b3 = arr[i + 2].innerHTML;
			// оголосила змінні та присвоїла значення масиву
			// значення із масиву підберуться так, що коли об'єднати змінні, то отримаємо необхідні комбінації для виграшу

			// ще одна перевірка
			if (a1 == user_sym && a2 == user_sym && a3 == user_sym) {
				// якщо зміна а1, а2, а3 належать user_sym, тобто Х, то до winner присвоюю user_sym
				winner = user_sym;
				break;
				// зупиняю перевірку
			}
			else if (a1 == comp_sym && a2 == comp_sym && a3 == comp_sym) {
				// якщо зміна а1, а2, а3 належать comp_sym, тобто 0, то до winner присвоюю comp_sym
				winner = comp_sym;
				break;
				// зупиняю перевірку
			}


			if (i != 0) j = 3 * i;
			// якщо змінна і не буде дорівнювати нулю, то створюю нову змінну j, що дорівнює 3*i

			b1 = arr[j].innerHTML;
			b2 = arr[j + 1].innerHTML;
			b3 = arr[j + 2].innerHTML;
			// оголошую нові змінні

			if (b1 == user_sym && b2 == user_sym && b3 == user_sym) {
				// якщо зміна b1, b2, b3 належать user_sym, тобто Х, то до winner присвоюю user_sym
				winner = user_sym;
				break;
				// зупиняю перевірку
			}
			else if (b1 == comp_sym && b2 == comp_sym && b3 == comp_sym) {
				// якщо зміна b1, b2, b3 належать comp_sym, тобто Х, то до winner присвоюю comp_sym
				winner = comp_sym;
				break;
				// зупиняю перевірку
			}
			if (winner)
				break;
			// зупиняю перевірку, якщо winner є істина(true)
		}
	}

	return winner;
	// повертаю winner
}

function autoDrawing() {
	// створюю функцію, у якій оголошується нічия та інше(розписую нижче)

	// роблю перевірку якщо функція checkFreeSpace() fasle, то виведеться текст нічия і зміняться стилі елементів із відповідними селекторами
	if (!checkFreeSpace()) {
		win_text.innerHTML = "Нічия!";
		winning.style.display = "block";
		win_block.style.display = "block";
		return false;
	}

	var el, rnd;
	// оголошую змінні
	// запускаю цикл do-while 
	do {
		rnd = getRandomInt(arr.length);
		// присвоїла змінні функцію із значенням розміру масиву arr(нагадую, що це клітинки для гри)
		el = arr[rnd];
		// до змінної присвоюю масив розміром з попередню змінну (rnd)
	} while (!drawSym(el, comp_sym));
	// якщо значення функції буде false

	// перевірка, якщо функція checkFreeSpace дорівнює false, то запускається перевірка if, у якій запуститься функція autoDrawing
	if (!checkFreeSpace()) {
		autoDrawing();
	}
}

function clearTable() {
	//  функція очищення клітинок гри
	for (var i = 0; i < arr.length; i++) {
		// запускаю цикл, який пройдеться по всіх клітинках 
		arr[i].innerHTML = "";
		// так заповненні клітинки зміняться на значення '' '', тобто таким чином очистяться
	}
}

function checkFreeSpace() {
	// створюю функцію checkFreeSpace 
	var res = false;
	// оголошую змінну і присвоюю значення false

	for (var i = 0; i < arr.length; i++) {
		// створила цикл for із перевіркою
		if (arr[i].hasChildNodes()) {
			// перевірка  на наявність дочірніх елементів
			res = false;
			// присвоюю значення false
		}
		else {
			// як ні, то присвоюю значення true
			res = true;
			break;
			// зупиняю перевірку
		}
	}
	return res;
	// повертаю змінну
}

function getRandomInt(max) {
	// створюю функцію, яка повертає рандомне число від 0 до якогось числа(яке передамо)
	return Math.floor(Math.random() * max);
}

