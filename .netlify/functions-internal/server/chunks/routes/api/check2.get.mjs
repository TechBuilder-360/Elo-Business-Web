import { a as defineEventHandler, C as useRuntimeConfig } from '../../nitro/nitro.mjs';
import fs from 'fs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const check2_get = defineEventHandler(async () => {
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
    const config = useRuntimeConfig();
    const backendUrl = `${config.backendUrl}/api`;
    const res = await $fetch(
      backendUrl,
      {
        method: "POST",
        body: { query }
      }
    );
    fs.writeFileSync("schema_dump.json", JSON.stringify(res, null, 2));
    return { success: true };
  } catch (err) {
    return { error: err.message };
  }
});

export { check2_get as default };
//# sourceMappingURL=check2.get.mjs.map
