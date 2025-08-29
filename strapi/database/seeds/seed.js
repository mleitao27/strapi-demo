const Strapi = require('@strapi/strapi')

const { postsSeeds } = require('./seeds_posts.js')
const { viewsSeeds } = require('./seeds_views.js')

const seedsObject = [
    postsSeeds,
    viewsSeeds
]

const seedModel = async (name, items) => {
    // Start Strapi programmatically
    const app = Strapi.createStrapi()
    console.log(app.db)
    // Check if there’s already data
    const count = await app.db.query(`api::${name}.${name}`).count()
    if (count > 0) {
      console.log(`❌ Table ${name} already seeded.`)
      return false
    }
  
    for (const item of items) {
      await app.db.query(`api::${name}.${name}`).create({ data: item })
    }
  
    return true;
}

function seed() {
    seedsObject.forEach((element) => {
        try {
            seedModel(element.name, element.data)
            console.log(`✅ Successfuly seeded ${element.name} table!`)
        } catch (error) {
            console.log(`❌ Something went wrong when seeding ${element.name} table: ` + error.message)
        }
    })
}

seed()