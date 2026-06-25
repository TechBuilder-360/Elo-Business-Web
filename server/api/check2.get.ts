import { defineEventHandler } from "h3";
import fs from "fs";

export default defineEventHandler(async () => {
  const query = `
    query {
      __schema {
        types {
          name
          kind
          enumValues {
            name
          }
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
    const res = await $fetch(
      "https://elo--elo-backend--fwg2j6rrxrkh.code.run/api",
      {
        method: "POST",
        body: { query },
      },
    );

    fs.writeFileSync("schema_dump.json", JSON.stringify(res, null, 2));

    return { success: true };
  } catch (err) {
    return { error: err.message };
  }
});
