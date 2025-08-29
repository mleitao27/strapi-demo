const { faker } = require('@faker-js/faker');

const postsSeeds = {
    name: 'post',
    data: Array.from({ length: 10 }).map(() => ({
        name: faker.lorem.sentence(),
    }))
}


module.exports = { postsSeeds }