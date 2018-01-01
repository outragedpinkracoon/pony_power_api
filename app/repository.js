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
  const { limit = 24, searchType = 'all', make = 'all' } = params

  return `SELECT car_attributes
          FROM scraped_car
          WHERE (car_attributes ->> 'makeSlug') != 'dacia'
          ${makeLimit(make)}
          ${searchTypeLimit(searchType)}
          ORDER BY (${selector})::${castType} ${order}
          LIMIT ${limit}`
}

const searchTypeLimit = (searchType) => {
  let searchTypeLimit = `AND car_attributes ->> 'searchType' = '${searchType}'`
  if (searchType == 'all') {
    searchTypeLimit = ''
  }
  return searchTypeLimit
}

const makeLimit = (make) => {
  let makeLimit = ` AND car_attributes ->> 'makeSlug' = '${make}'`
  if (make == 'all') {
    makeLimit = ''
  }
  return makeLimit
}

module.exports = {
  orderedBy
}
