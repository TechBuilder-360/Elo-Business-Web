import { a as defineEventHandler, y as readBody, l as getHeaders, k as getCookie, C as useRuntimeConfig, A as setCookie, c as createError } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const remote_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  const body = await readBody(event);
  const headers = getHeaders(event);
  const reqHeaders = {
    "Content-Type": "application/json",
    ...headers.authorization ? { Authorization: headers.authorization } : {}
  };
  const authCookie = getCookie(event, "auth_token");
  if (authCookie && !reqHeaders.Authorization) {
    reqHeaders.Authorization = `Bearer ${authCookie}`;
  }
  try {
    const config = useRuntimeConfig();
    const backendUrl = `${config.backendUrl}/api`;
    const response = await $fetch(
      backendUrl,
      {
        method: "POST",
        body,
        headers: reqHeaders
      }
    );
    if ((_b = (_a = response == null ? void 0 : response.data) == null ? void 0 : _a.login) == null ? void 0 : _b.access_token) {
      setCookie(event, "auth_token", response.data.login.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7
        // 7 days
      });
      response.data.login.access_token = "SECURE_HTTP_ONLY_COOKIE_SET";
    }
    return response;
  } catch (error) {
    if ((_c = error == null ? void 0 : error.response) == null ? void 0 : _c._data) {
      return error.response._data;
    }
    throw createError({
      statusCode: ((_d = error.response) == null ? void 0 : _d.status) || 502,
      message: error.message || "Bad Gateway"
    });
  }
});

export { remote_post as default };
//# sourceMappingURL=remote.post.mjs.map
