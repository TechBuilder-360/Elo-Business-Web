import { a as defineEventHandler, k as getCookie } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const authCheck_get = defineEventHandler((event) => {
  const token = getCookie(event, "auth_token");
  return { authenticated: !!token };
});

export { authCheck_get as default };
//# sourceMappingURL=auth-check.get.mjs.map
