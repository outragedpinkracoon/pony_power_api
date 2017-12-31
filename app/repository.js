const { Client } = require('pg')

const orderedBy = async (filters, limit = 10) => {
  const { selector = `car_attributes -> 'cost' ->> 'price'`, order = 'ASC', castType = 'int' } = filters

  const client = new Client()
  await client.connect()

  try {
    const query = `SELECT car_attributes
                   FROM scraped_car
                   WHERE (car_attributes ->> 'makeSlug') != 'dacia'
                   ORDER BY (${selector})::${castType} ${order}
                   LIMIT ${limit}`
    console.log(query)
    const res = await client.query(query)
    return res.rows
  } catch (error) {
    throw error
  } finally {
    await client.end()
  }
}

const orderedBySearchType = async (searchType, filters, limit = 10) => {
  const { selector = `car_attributes -> 'cost' ->> 'price'`, order = 'ASC', castType = 'int' } = filters

  const client = new Client()
  await client.connect()

  let searchTypeLimit = `AND car_attributes ->> 'searchType' = '${searchType}'`
  if (searchType == 'all') {
    searchTypeLimit = ''
  }

  try {
    const query = `SELECT car_attributes
                   FROM scraped_car
                   WHERE car_attributes ->> 'makeSlug' != 'dacia'
                   ${searchTypeLimit}
                   ORDER BY (${selector})::${castType} ${order},
                   car_attributes -> 'cost' ->> 'price'
                   LIMIT ${limit}`
    console.log(query)
    const res = await client.query(query)
    return res.rows
  } catch (error) {
    throw error
  } finally {
    await client.end()
  }
}

const orderedByMake = async (make, filters, limit = 10) => {
  const { selector = `car_attributes -> 'cost' ->> 'price'`, order = 'ASC', castType = 'int' } = filters

  const client = new Client()
  await client.connect()
  try {
    const query = `SELECT car_attributes
                   FROM scraped_car
                   WHERE car_attributes ->> 'makeSlug' = '${make}'
                   ORDER BY (${selector}) ${order},
                   car_attributes -> 'cost' ->> 'price'
                   LIMIT ${limit}`
    console.log(query)
    const res = await client.query(query)
    return res.rows
  } catch (error) {
    throw error
  } finally {
    await client.end()
  }
}

const orderedBySearchTypeAndMake = async (make, searchType, { selector = `car_attributes -> 'cost' ->> 'price'`, order = 'ASC' }, limit = 10) => {
  const client = new Client()
  await client.connect()

  let searchTypeLimit = `AND car_attributes ->> 'searchType' = '${searchType}'`
  if(searchType == 'all') {
    searchTypeLimit = ''
  }

  try {
    const query = `SELECT car_attributes
                   FROM scraped_car
                   WHERE car_attributes ->> 'makeSlug' = '${make}'
                   ${searchTypeLimit}
                   ORDER BY (${selector}) ${order},
                   car_attributes -> 'cost' ->> 'price'
                   LIMIT ${limit}`
    console.log(query)
    const res = await client.query(query)
    return res.rows
  } catch (error) {
    throw error
  } finally {
    await client.end()
  }
}

module.exports = {
  orderedBy,
  orderedByMake,
  orderedBySearchType,
  orderedBySearchTypeAndMake
}
