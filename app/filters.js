const mapToFilter = (value) => {
  const lookup = {
    'bhp': {
      selector: `'engine' -> 'breakHorsePower'`,
      order: 'DESC',
    },
    'acceleration': {
      selector: `'engine' -> 'acceleration'`,
      order: 'ASC'
    },
    'price': {
      selector: `'cost' -> 'price'`,
      order: 'ASC',
    },
    'mileage': {
      selector: 'mileage',
      order: 'ASC'
    },
    'mpg': {
      selector: 'mpg',
      order: 'DESC'
    }
  }
  return lookup[value] ? lookup[value] : {}
}

module.exports = mapToFilter
