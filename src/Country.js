/**
 * Сlass for storing country data.
 */
class Country {
  /**
   * Registry countries data.
   *
   * @method  registry
   * @return  {array}
   */
  static registry() {
    return [
      {
        title: 'Belarus',
        code: ['BY', 'BLR', 112, '+375'],
        pattern: [3, 2, 3, 2, 2],
        template: '$1 ($2) $3-$4-$5'
      },
      {
        title: 'Russian Federation',
        code: ['RU', 'RUS', 643, '+7'],
        pattern: [1, 3, 3, 2, 2],
        template: '$1 ($2) $3-$4-$5'
      }
    ]
  }
}

export default Country
