import { defineEventHandler } from "h3";

export default defineEventHandler(async () => {
  const query = `
    query {
      __schema {
        types {
          name
          fields {
            name
            type {
              name
              kind
              ofType {
                name
                kind
                ofType {
                  name
                  kind
                }
              }
            }
          }
        }
      }
    }
  `;
  try {
    const res = await $fetch("https://elo--elo-backend--fwg2j6rrxrkh.code.run/api", {
      method: "POST",
      body: { query }
    });
    
    const types = res.data.__schema.types;
    const resType = types.find(t => t.name === "Response");
    const queryType = types.find(t => t.name === "Query");
    const mutType = types.find(t => t.name === "Mutation");
    
    return {
      Response: resType?.fields,
      getUserBusinsses: queryType?.fields.find(f => f.name === "getUserBusinsses"),
      verificationQuery: queryType?.fields.find(f => f.name === "verification"),
      verificationMut: mutType?.fields.find(f => f.name === "verification"),
      registerBusiness: mutType?.fields.find(f => f.name === "registerBusiness")
    };
  } catch (err) {
    return { error: err.message };
  }
});
