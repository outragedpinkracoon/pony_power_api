const mapToFilter = (value) => {
  const lookup = {
    'bhp': {
      selector: `car_attributes -> 'engine' ->> 'breakHorsePower'`,
      order: 'DESC',
      castType: 'int'
    },
    'acceleration': {
      selector: `car_attributes -> 'engine' ->> 'acceleration'`,
      order: 'ASC',
      castType: 'int'
    },
    'price': {
      selector: `car_attributes -> 'cost' ->> 'price'`,
      order: 'ASC',
      castType: 'int'
    },
    'mileage': {
      selector: `car_attributes ->> 'mileage'`,
      order: 'ASC',
      castType: 'int'
    },
    'mpg': {
      selector: `car_attributes ->> 'mpg'`,
      order: 'DESC',
      castType: 'dec'
    }
  }
  return lookup[value] ? lookup[value] : {}
}

module.exports = mapToFilter
