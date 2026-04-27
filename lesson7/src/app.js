/**
 * Возвращает сумму всех баллов из объекта.
 *
 * @param {Object.<string, number>} scores - Объект, где ключ — имя, значение — баллы.
 * @returns {number} Сумма всех баллов.
 *
 * @example
 * getScore({ Anna: 10, Olga: 1, Ivan: 5 }); // 16
 */
export function getScore(scores) {
  let sum = 0;

  for (const key in scores) {
    sum += scores[key];
  }

  return sum;
}
