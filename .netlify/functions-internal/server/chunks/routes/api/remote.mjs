import { a as defineEventHandler, C as readBody, l as getHeaders, k as getCookie, E as setCookie, c as createError } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const remote = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  const body = await readBody(event);
  const headers = getHeaders(event);
  const reqHeaders = {
    "Content-Type": "application/json",
    ...headers.authorization ? { Authorization: headers.authorization } : {}
  };
  const businessId = headers["x-business-id"];
  if (businessId) {
    reqHeaders["x-business-id"] = businessId;
  }
  const authCookie = getCookie(event, "auth_token");
  if (authCookie && !reqHeaders.Authorization) {
    reqHeaders.Authorization = `Bearer ${authCookie}`;
  }
  process.env.BACKEND_URL;
  try {
    const backendUrl2 = `${process.env.BACKEND_URL}/api`;
    const response = await $fetch(
      backendUrl2,
      {
        method: "POST",
        body,
        headers: reqHeaders
      }
    );
    if ((_b = (_a = response == null ? void 0 : response.data) == null ? void 0 : _a.login) == null ? void 0 : _b.access_token) {
      const cookieOptions = {
        httpOnly: true,
        path: "/"
      };
      if (response.data.login.expire_at) {
        cookieOptions.expires = new Date(response.data.login.expire_at);
      } else {
        cookieOptions.maxAge = 60 * 60 * 24 * 7;
      }
      setCookie(event, "auth_token", response.data.login.access_token, cookieOptions);
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

export { remote as default };
//# sourceMappingURL=remote.mjs.map
