'use strict';

/**
 * Генерирует объект с данными названия компании
 * @param str {string}
 */
function beautyCo(str){

	var obj = {
		type: '',
		name: '',
		fullName: str.trim()
	};

	if ( obj.fullName.search(/[„«'"а-яё]/) === -1 ) {
		return obj;
	}

	obj.fullName.replace(/\s+/g,' ')

		.replace(/общество\sс\sограниченной\sответственностью/i, 'ООО')
		.replace(/общество\sс\sдополнительной\sответственностью/i, 'ОДО')
		.replace(/закрытое\sакционерное\sобщество/i, 'ЗАО')
		.replace(/непубличное\sакционерное\sобщество/i, 'НАО')
		.replace(/публичное\sакционерное\sобщество/i, 'ПАО')
		.replace(/открытое\sакционерное\sобщество/i, 'ОАО')
		.replace(/акционерное\sобщество/i, 'АО')

		.replace(/индивидуальный\sпредприниматель/i, 'ИП')

		.replace(/полное\sтоварищество/i, 'ПТ')
		.replace(/коммандитное\sтоварищество/i, 'КТ')

		.replace(/муниципальное\sавтономное\sобщеобразовательное\sучреждение/i, 'МАОУ')
		.replace(/муниципальное\sобщеобразовательное\sучреждение/i, 'МОУ')

		.replace(/муниципальное\sавтономное\sдошкольное\sобразовательное\sучреждение/i, 'МАДОУ')
		.replace(/автономное\sдошкольное\sобразовательное\sучреждение/i, 'АДОУ')
		.replace(/дошкольное\sобразовательное\sучреждение/i, 'ДОУ')

		.replace(/муниципальное\sбюджетное\sучреждение/i, 'МБУ')
		.replace(/муниципальное\sунитарное\sпредприятие/i, 'МУП')
		.replace(/государственное\sунитарное\sпредприятие/i, 'ГУП')
		.replace(/автономная\sнекоммерческая\sорганизация/i, 'АНО')
		.replace(/^((?:[А-ЯЁ]{2,} )+)([„«'"“]?.+?)$/, function(str, $1, $2){
			obj.type = $1.trim();
			obj.name = $2;
			return '';
		});

	if(obj.name) {
		obj.name = cleanQuote(obj.name);
	}

	return obj;
}

/*
 * Добавляет и удаляет кавычки
 * @param str {string}
 */
function cleanQuote(str){
	var openQuote = false;
	var closeQuote = false;

	str = str.trim()
			.replace(/[„“«»'“”]/g, '"')
			.replace(/(?:^"|"$)/g, function(s){
				// не работает при пробелах внутри кавычек
				s.trim();
				return '';
			})
			.replace(/\"([a-z0-9а-яё])/ig, function(str, $1) {
				openQuote = true;
				return '«' + $1;
			})
			.replace(/([a-z0-9а-яё])\"/ig, function(str, $1) {
				closeQuote = true;
				return $1 + '»';
			});

	if(!openQuote || !closeQuote) {
		str = openQuote ? str + '»' : str;
		str = closeQuote ? '«' + str : str;
	}

	return str;
}
