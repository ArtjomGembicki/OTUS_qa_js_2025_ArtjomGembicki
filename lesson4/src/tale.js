// Стандартное решение (node tale.js)
// // Задание 1
// function kolobok(character) {
//   switch (character) {
//     case 'дедушка':
//       return 'Я от дедушки ушёл';
//     case 'заяц':
//       return 'Я от зайца ушёл';
//     case 'лиса':
//       return 'Меня съели';
//     default:
//       return 'Неизвестный персонаж';
//   }
// }

// // Задание 2
// function newYear(name) {
//   return `${name}! ${name}! ${name}!`;
// }

// // Проверка работы функций
// console.log(kolobok('дедушка')); 
// console.log(kolobok('лиса'));     

// console.log(newYear('Дед Мороз'));
// console.log(newYear('Снегурочка'));

//Export вариант (node index.js)
export function kolobok(character) {
  switch (character) {
    case 'дедушка':
      return 'Я от дедушки ушёл';
    case 'заяц':
      return 'Я от зайца ушёл';
    case 'лиса':
      return 'Меня съели';
    default:
      return 'Неизвестный персонаж';
  }
}

export function newYear(name) {
  return `${name}! ${name}! ${name}!`;
}
