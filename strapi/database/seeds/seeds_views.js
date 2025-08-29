const { faker } = require('@faker-js/faker');

const viewsSeeds = {
    name: 'view',
    data: Array.from({ length: 10 }).map(() => ({
        name: faker.lorem.sentence(),
    }))
}

module.exports = { viewsSeeds }