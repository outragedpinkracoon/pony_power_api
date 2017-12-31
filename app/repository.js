const { Client } = require('pg')

const orderedCars = async ({ selector = `'cost' -> 'price'`, order = 'ASC'}, limit = 10) => {
  const client = new Client()

  await client.connect()
  try {
    const query = `SELECT car_attributes
                   FROM scraped_car
                   ORDER BY car_attributes -> ${selector} ${order},
                   car_attributes -> 'cost' -> 'price'
                   LIMIT ${limit}`
    const res = await client.query(query)
    return res.rows
  } catch (error) {
    throw error
  } finally {
    await client.end()
  }
}

module.exports = {
  orderedCars
}
