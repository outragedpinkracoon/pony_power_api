const { Client } = require('pg')

const orderedBy = async (filter, params) => {
  const client = new Client()
  await client.connect()

  try {
    const query = buildQuery(filter, params)
    const res = await client.query(query)
    return res.rows
  } catch (error) {
    throw error
  } finally {
    await client.end()
  }
}

const buildQuery = (filter, params) => {
  const { selector = `car_attributes -> 'cost' ->> 'price'`, order = 'ASC', castType = 'int' } = filter
  const { limit = 24, searchType = null, make = null } = params

  return `SELECT car_attributes
          FROM scraped_car
          WHERE (car_attributes ->> 'makeSlug') != 'dacia'
          ${optionalConstraint('makeSlug', make)}
          ${optionalConstraint('searchType', searchType)}
          ORDER BY (${selector})::${castType} ${order}
          LIMIT ${limit}`
}

const optionalConstraint = (attribute, value) => {
  let constraint = ''
  if (value != null) {
    constraint = `AND car_attributes ->> '${attribute}' = '${value}'`
  }
  return constraint
}

module.exports = {
  orderedBy
}
