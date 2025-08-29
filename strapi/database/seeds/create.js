const fs = require('fs')
const path = require('path')

const { postsTable } = require('./create_posts.js')
const { viewsTable } = require('./create_views.js')

const createObject = [
  postsTable,
  viewsTable
]

const createApi = (name, attributes) => {
  const dir = path.join(__dirname, '../..', 'src', 'api', name)

  // Create folder structure
  fs.mkdirSync(path.join(dir, 'controllers'), { recursive: true })
  fs.mkdirSync(path.join(dir, 'services'), { recursive: true })
  fs.mkdirSync(path.join(dir, 'routes'), { recursive: true })
  fs.mkdirSync(path.join(dir, 'content-types', name), { recursive: true })

  // Create schema.json
  const schema = {
    kind: 'collectionType',
    collectionName: `${name}s`,
    info: {
      singularName: name,
      pluralName: `${name}s`,
      displayName: name.charAt(0).toUpperCase() + name.slice(1),
    },
    options: { draftAndPublish: true },
    attributes,
  }

  fs.writeFileSync(
    path.join(dir, 'content-types', name, 'schema.json'),
    JSON.stringify(schema, null, 2)
  )

  // Controller
  fs.writeFileSync(
    path.join(dir, 'controllers', `${name}.ts`),
    `export default {\n  // exampleAction: async (ctx, next) => {\n  //   try {\n  //     ctx.body = 'ok'\n  //   } catch (err) {\n  //     ctx.body = err\n  //   }\n  // }\n}`
  )

  // Service
  fs.writeFileSync(
    path.join(dir, 'services', `${name}.ts`),
    `export default () => ({})`
  )

  // Routes
  fs.writeFileSync(
    path.join(dir, 'routes', `${name}.ts`),
    `export default {\n  routes: [\n    // {\n    //  method: 'GET',\n    //  path: '/posts',\n    //  handler: 'posts.exampleAction',\n    //  config: {\n    //    policies: [],\n    //    middlewares: [],\n    //  },\n    // },\n  ],\n}\n`
  )
}

const create = () => {      
  createObject.forEach((element) => {
      try {
          createApi(element.name, element.columns)
          console.log(`✅ Successfuly created ${element.name} table!`)
      } catch (error) {
          console.log(`❌ Something went wrong when creating ${element.name} table: ` + error.message)
      }
  })
}

create()