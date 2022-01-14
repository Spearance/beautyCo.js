'use strict';

// организационно-правовые формы
const COMAPANY_FORMS = {
  'ООО': 'общество с ограниченной ответственностью',
  'ОДО': 'общество с дополнительной ответственностью',
  'ЗАО': 'закрытое акционерное общество',
  'НАО': 'непубличное акционерное общество',
  'ПАО': 'публичное акционерное общество',
  'ОАО': 'открытое акционерное общество',
  'АО': 'акционерное общество',
  'ИП': 'индивидуальный предприниматель',
  'ПТ': 'полное товарищество',
  'КТ': 'коммандитное товарищество',
  'МАОУ': 'муниципальное автономное общеобразовательное учреждение',
  'МОУ': 'муниципальное общеобразовательное учреждение',
  'МАДОУ': 'муниципальное автономное дошкольное образовательное учреждение',
  'АДОУ': 'автономное дошкольное образовательное учреждение',
  'ДОУ': 'дошкольное образовательное учреждение',
  'МБУ': 'муниципальное бюджетное учреждение',
  'МУП': 'муниципальное унитарное предприятие',
  'ГУП': 'государственное унитарное предприятие',
  'АНО': 'автономная некоммерческая организация'
};

// открывающие кавычки
const OPEN_QUOTES = '\"\'\«\„\“';

// закрывающие кавычки
const CLOSE_QUOTES = '\“\»\”\"';

/**
 * Генерирует объект с данными из названия компании
 * @param companyName {string}
 */
function beautyCo(companyName) {

  var temp;
  var obj = {
    type: '',
    prefix: '',
    name: '',
    postfix: '',
    fullName: companyName.trim()
  };

  // если нет кавычек и русских букв в нижнем регистре, возможно все забито CAPS-ом, возвращаем как есть
  if (obj.fullName.length <= 1 || obj.fullName.search(new RegExp('[' + OPEN_QUOTES + 'а-яё]')) === -1) {
    return obj;
  }

  // убираем лишние пробелы
  temp = obj.fullName.replace(/\s+/g, ' ');

  // заменяем полные организационно правовые формы на аббревиатуры
  for (var key in COMAPANY_FORMS) {
    if (COMAPANY_FORMS.hasOwnProperty(key)) {
      temp = temp.replace(new RegExp(COMAPANY_FORMS[key], 'i'), key);

      if (!obj.type) {
        // организационно-правовую форму переводим в верхний регистр и пишем в поле
        temp = temp.replace(new RegExp('(^| )(' + key + ')([ ' + OPEN_QUOTES + '])', 'i'), function(str, preMatch, companyType, postMatch) {
          if (companyType) {
            obj.type = companyType.toUpperCase();
            return postMatch;
          } else {
            return preMatch + companyType + postMatch;
          }
        });
      }
    }
  }

  // если есть что-то в кавычках захватываем как название
  if ( temp.search(new RegExp('[' + OPEN_QUOTES + ']')) !== -1) {
    temp.replace(new RegExp('^([^' + OPEN_QUOTES + ']*?)[' + OPEN_QUOTES + '](.+)[' + CLOSE_QUOTES + '](.*?)$', 'i'), function(str, prefix, insideQuotes, postfix) {
      obj.prefix = prefix.trim();
      obj.name = capitalize(insideQuotes);
      obj.postfix = postfix.trim();
      return '';
    });
  } else {
    obj.name = capitalize(temp.trim());
  }

  if (obj.name) {
    obj.name = cleanQuote(obj.name);
  }

  return obj;

}

/*
 * Добавляет и удаляет кавычки в название компании
 * @param str {string}
 */
function cleanQuote(companyName) {
  var openQuote = false;
  var closeQuote = false;

  companyName = companyName.trim()
    .replace(new RegExp('[' + OPEN_QUOTES + CLOSE_QUOTES + ']', 'g'), '"')
    .replace(/(?:^"|"$)/g, function(s) {
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

  if (!openQuote || !closeQuote) {
    companyName = openQuote ? companyName + '»' : companyName;
    companyName = closeQuote ? '«' + companyName : companyName;
  }

  return companyName;

}

/*
 * обратный вариант вывода названия компании из объекта
 * @props company {Object}
 */
function printCoName(company) {

  if (!company.name) {
    return company.fullName;
  }
  var name = company.postfix ? company.name + ' ' + company.postfix : company.name;
  var parts = company.type;
  parts += parts && company.prefix ? ' ' + company.prefix : company.prefix;

  return parts ? name + ', ' + parts : company.fullName;

}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
