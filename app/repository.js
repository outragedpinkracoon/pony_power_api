const { Client } = require('pg')

const orderedBy = async (filter, params) => {
  const query = buildQuery(filter, params)
  return execute(query)
}

const execute = async (query) => {
  const client = new Client()
  await client.connect()

  try {
    const res = await client.query(query)
    return res.rows
  } catch (error) {
    throw error
  } finally {
    await client.end()
  }
}

const countByMake = async (type) => {
  const query = `SELECT attributes ->> 'make' as make,
                 attributes ->> 'makeSlug' as slug,
                 COUNT(*) as count FROM scraped_car
                 GROUP BY (attributes ->> 'make', attributes ->> 'makeSlug')
                 ORDER BY count DESC`
  return execute(query)
}

const buildQuery = (filter, params) => {
  // eslint-disable-next-line max-len
  const { selector = `attributes -> 'cost' ->> 'price'`, order = 'ASC', castType = 'int' } = filter
  const { limit = 24, searchType = null, make = null } = params

  return `SELECT attributes
          FROM scraped_car
          WHERE (attributes ->> 'makeSlug') != 'dacia'
          AND (attributes -> 'towing' ->> 'maxTowingWeightUnbraked')::int > 400
          AND (attributes -> 'engine' ->> 'breakHorsePower')::int > 80
          ${optionalConstraint('makeSlug', make)}
          ${optionalConstraint('searchType', searchType)}
          ORDER BY (${selector})::${castType} ${order}
          LIMIT ${limit}`
}

const optionalConstraint = (attribute, value) => {
  let constraint = ''
  if (value != null && value != 'all') {
    constraint = `AND attributes ->> '${attribute}' = '${value}'`
  }
  return constraint
}

module.exports = {
  orderedBy,
  countByMake
}
