import db from "./index"
import { faker } from "@faker-js/faker"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * to easily generate realistic data.
 */
const seed = async () => {
  for (let i = 0; i < 30; i++) {
    await db.table.create({
      data: {
        id: i + 1,
        name: faker.company.bsNoun(),
      },
    })
  }
  for (let i = 0; i < 100; i++) {
    await db.participant.create({
      data: {
        name: faker.name.lastName(),
        surname: faker.name.firstName(),
        status: i % 2 === 0,
        tableId: faker.datatype.number({ min: 1, max: 30 }),
      },
    })
  }
}

export default seed
