import { a as defineEventHandler } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const introspect_get = defineEventHandler(async () => {
  var _a, _b, _c, _d, _e, _f;
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
    const res = await $fetch(backendUrl, {
      method: "POST",
      body: { query }
    });
    const types = ((_b = (_a = res == null ? void 0 : res.data) == null ? void 0 : _a.__schema) == null ? void 0 : _b.types) || [];
    const resType = types.find((t) => t.name === "Response");
    const queryType = types.find((t) => t.name === "Query");
    const mutType = types.find((t) => t.name === "Mutation");
    return {
      Response: resType == null ? void 0 : resType.fields,
      getUserBusinsses: (_c = queryType == null ? void 0 : queryType.fields) == null ? void 0 : _c.find(
        (f) => f.name === "getUserBusinsses"
      ),
      verificationQuery: (_d = queryType == null ? void 0 : queryType.fields) == null ? void 0 : _d.find(
        (f) => f.name === "verification"
      ),
      verificationMut: (_e = mutType == null ? void 0 : mutType.fields) == null ? void 0 : _e.find(
        (f) => f.name === "verification"
      ),
      registerBusiness: (_f = mutType == null ? void 0 : mutType.fields) == null ? void 0 : _f.find(
        (f) => f.name === "registerBusiness"
      )
    };
  } catch (err) {
    return { error: err.message };
  }
});

export { introspect_get as default };
//# sourceMappingURL=introspect.get.mjs.map
