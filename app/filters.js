const mapToFilter = (value) => {
  const lookup = {
    'bhp': {
      selector: `attributes -> 'engine' ->> 'breakHorsePower'`,
      order: 'DESC',
      castType: 'int'
    },
    'acceleration': {
      selector: `attributes -> 'engine' ->> 'acceleration'`,
      order: 'ASC',
      castType: 'int'
    },
    'price': {
      selector: `attributes -> 'cost' ->> 'price'`,
      order: 'ASC',
      castType: 'int'
    },
    'mileage': {
      selector: `attributes ->> 'mileage'`,
      order: 'ASC',
      castType: 'int'
    },
    'mpg': {
      selector: `attributes ->> 'mpg'`,
      order: 'DESC',
      castType: 'dec'
    }
  }
  return lookup[value] ? lookup[value] : {}
}

module.exports = mapToFilter
