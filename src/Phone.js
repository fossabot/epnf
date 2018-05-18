import Country from './Country'

const _set = Symbol()
const _find = Symbol()
const _replace = Symbol()

/**
 * Class for easy formating phone number.
 */
class Phone {
  /**
   * Create new phone instance
   *
   * @method  constructor
   * @param   {string|integer} number
   */
  constructor(number) {
    this[_set]('number', number.toString())
  }

  /**
   * Format number by country code.
   *
   * @method  country
   * @param   {string|integer} code
   * @param   {string} prefix
   * @param   {array} registry
   * @return  {string}
   * @example this(number).country('BY', '+')
   */
  country(code, prefix, registry) {
    return this[_find](code, registry, prefix)
  }

  /**
   * Set object properties via params.
   *
   * @method  format
   * @param   {array} pattern
   * @param   {string} template
   * @return  {string}
   * @example this.format([3, 2, 3, 2, 2], '$1 ($2) $3-$4-$5', '+')
   */
  format(pattern, template, prefix) {
    this.sanitize()

    pattern = pattern.map(item => {
      return `(\\d{${item}})`
    }).join('')

    pattern = new RegExp(pattern, 'g')

    if (typeof prefix !== 'undefined') {
      template = `${prefix}${template}`
    }

    this[_set]('pattern', pattern)
    this[_set]('template', template)
    this[_replace]('number', this.pattern, this.template)

    return this.number
  }

  /**
   * Sanitize phone number.
   *
   * @method  sanitize
   * @return  {object}
   * @example this.number.sanitize()
   */
  sanitize() {
    this[_replace]('number', /\D/g, '')

    return this
  }

  /**
   * Set object property.
   *
   * @method  _set
   * @type    {private}
   * @param   {string} key
   * @param   {any} value
   * @return  {void}
   */
  [_set](key, value) {
    this[key] = value
  }

  /**
   * Find country object in registry.
   *
   * @method  _find
   * @type    {private}
   * @param   {string|integer} query
   * @param   {array} registry
   * @param   {string} prefix
   * @return  {object|string}
   * @example this[_find]('BY', registry, '+')
   */
    [_find](query, registry, prefix) {
    query = query.trim()

    if (typeof query === 'string') {
      query = query.toUpperCase()
    }

    if (typeof registry === 'undefined') {
      registry = Country.registry()
    }

    for (let i in registry) {
      if (registry[i].code.includes(query)) {
        return this.format(registry[i].pattern, registry[i].template, prefix)
      }
    }

    console.warn(`[Country Code ${query}] doesn't not found!`)

    return this.number
  }

  /**
   * Replace instance property value.
   *
   * @method  _replace
   * @type    {private}
   * @param   {string} key
   * @param   {object} regexp
   * @param   {string} string
   * @return  {void}
   * @example this[_replace](key, regexp, string)
   */
  [_replace](key, regexp, string) {
    this[_set](key, this[key].replace(regexp, string))
  }
}

export default Phone
