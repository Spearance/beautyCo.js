'use strict';

/**
 * @param {string} str
 */
function antiPE(str){
	if (str) {
		var obj = { "A": "А", "a": "а", "E": "Е", "e": "е", "T": "Т", "y": "у", "O": "О", "o": "о", "P": "Р", "p": "р", "H": "Н", "K": "К", "X": "Х", "x": "х", "C": "С", "c": "с", "B": "В", "M": "М" };

		for (var key in obj) {
			var r = new RegExp(key, 'g');
			str = str.replace(r, obj[key]);
		}
	}

	return str;
}
