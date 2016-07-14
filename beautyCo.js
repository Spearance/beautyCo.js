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

	obj.fullName.replace( /\s+/g, ' ' )

		.replace(/общество с ограниченной ответственностью/i, 'ООО')
		.replace(/общество с дополнительной ответственностью/i, 'ОДО')
		.replace(/закрытое акционерное общество/i, 'ЗАО')
		.replace(/непубличное акционерное общество/i, 'НАО')
		.replace(/публичное акционерное общество/i, 'ПАО')
		.replace(/открытое акционерное общество/i, 'ОАО')
		.replace(/акционерное общество/i, 'АО')

		.replace(/индивидуальный предприниматель/i, 'ИП')

		.replace(/полное товарищество/i, 'ПТ')
		.replace(/коммандитное товарищество/i, 'КТ')

		.replace(/муниципальное автономное общеобразовательное учреждение/i, 'МАОУ')
		.replace(/муниципальное общеобразовательное учреждение/i, 'МОУ')

		.replace(/муниципальное автономное дошкольное образовательное учреждение/i, 'МАДОУ')
		.replace(/автономное дошкольное образовательное учреждение/i, 'АДОУ')
		.replace(/дошкольное образовательное учреждение/i, 'ДОУ')

		.replace(/муниципальное бюджетное учреждение/i, 'МБУ')
		.replace(/муниципальное унитарное предприятие/i, 'МУП')
		.replace(/государственное унитарное предприятие/i, 'ГУП')
		.replace(/автономная некоммерческая организация/i, 'АНО')

		.replace(/^(ооо|одо|зао|нао|пао|оао|ао|ип|пт|кт|маоу|моу|мадоу|адоу|доу|мбу|муп|гуп|ано)[ ]/, function(str, $1){
			return $1.toUpperCase() + ' ';
		})

		.replace(/^((?:[А-ЯЁ]{2,} )+)([„«'"“]?.+?)$/, function(str, $1, $2){
			obj.type = $1.trim();
			obj.name = $2.replace(/([а-яё])/, function(str, $1){
				return $1.toUpperCase();
			});
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
