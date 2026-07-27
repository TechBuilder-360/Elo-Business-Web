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
    const backendUrl = `${process.env.BACKEND_URL}/api`;

    const res: any = await $fetch(backendUrl, {
      method: "POST",
      body: { query },
    });

    const types = res?.data?.__schema?.types || [];
    const resType = types.find((t: any) => t.name === "Response");
    const queryType = types.find((t: any) => t.name === "Query");
    const mutType = types.find((t: any) => t.name === "Mutation");

    return {
      Response: resType?.fields,
      getUserBusinsses: queryType?.fields?.find(
        (f: any) => f.name === "getUserBusinsses",
      ),
      verificationQuery: queryType?.fields?.find(
        (f: any) => f.name === "verification",
      ),
      verificationMut: mutType?.fields?.find(
        (f: any) => f.name === "verification",
      ),
      registerBusiness: mutType?.fields?.find(
        (f: any) => f.name === "registerBusiness",
      ),
    };
  } catch (err: any) {
    return { error: err.message };
  }
});
