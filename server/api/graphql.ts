import { createYoga, createSchema } from 'graphql-yoga'

// We define our GraphQL schema here. 
// This acts as a wrapper around the existing REST backend.
const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Product {
      _id: ID!
      name: String!
      description: String
      price: Float!
      category: String
      images: [Image]
    }

    type Image {
      url: String
      public_id: String
    }

    type Query {
      products: [Product]!
      product(slug: String!): Product
    }
  `,
  resolvers: {
    Query: {
      // These resolvers hit our existing REST backend
      products: async () => {
        try {
          // You can replace this with process.env.NEXT_PUBLIC_API_URL or a Nuxt runtimeConfig
          const response = await $fetch('http://localhost:5000/api/products')
          return response.products || []
        } catch (error) {
          console.error("GraphQL Proxy Error:", error)
          return []
        }
      },
      product: async (_, { slug }) => {
        try {
          const response = await $fetch(`http://localhost:5000/api/products/${slug}`)
          return response.product || null
        } catch (error) {
          return null
        }
      }
    }
  }
})

const yoga = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
  // Make sure it works perfectly with Nitro's fetch
  fetchAPI: globalThis
})

// Nuxt Nitro allows us to directly export web standard event handlers
export default defineEventHandler((event) => {
  return yoga.handle(event.node.req, event.node.res)
})
