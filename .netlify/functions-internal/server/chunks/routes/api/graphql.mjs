import { a as defineEventHandler } from '../../nitro/nitro.mjs';
import { createYoga, createSchema } from 'graphql-yoga';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const schema = createSchema({
  typeDefs: (
    /* GraphQL */
    `
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
  `
  ),
  resolvers: {
    Query: {
      // These resolvers hit our existing REST backend
      products: async () => {
        try {
          const response = await $fetch("http://localhost:5000/api/products");
          return response.products || [];
        } catch (error) {
          console.error("GraphQL Proxy Error:", error);
          return [];
        }
      },
      product: async (_, { slug }) => {
        try {
          const response = await $fetch(`http://localhost:5000/api/products/${slug}`);
          return response.product || null;
        } catch (error) {
          return null;
        }
      }
    }
  }
});
const yoga = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  // Make sure it works perfectly with Nitro's fetch
  fetchAPI: globalThis
});
const graphql = defineEventHandler((event) => {
  return yoga.handle(event.node.req, event.node.res);
});

export { graphql as default };
//# sourceMappingURL=graphql.mjs.map
