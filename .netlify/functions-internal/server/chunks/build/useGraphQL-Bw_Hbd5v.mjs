import { useQueryClient, useMutation, useQuery } from '@tanstack/vue-query';
import { $ as $fetch } from '../nitro/nitro.mjs';

function isFile(value) {
  return typeof File !== "undefined" && value instanceof File || typeof Blob !== "undefined" && value instanceof Blob;
}
function extractFiles(variables) {
  const files = [];
  const map = {};
  function recurse(obj, path) {
    if (obj === null || obj === void 0) return obj;
    if (isFile(obj)) {
      const fileId = files.length.toString();
      files.push(obj);
      map[fileId] = [path];
      return null;
    }
    if (Array.isArray(obj)) {
      return obj.map((item, index) => recurse(item, `${path}.${index}`));
    }
    if (typeof obj === "object") {
      const newObj = {};
      for (const key in obj) {
        newObj[key] = recurse(obj[key], `${path}.${key}`);
      }
      return newObj;
    }
    return obj;
  }
  const cleanVariables = recurse(variables, "variables");
  return { cleanVariables, files, map };
}
async function gqlRequest({ query, variables = {} }) {
  const headers = {
    Accept: "application/json"
  };
  const { cleanVariables, files, map } = extractFiles(variables);
  let body;
  if (files.length > 0) {
    body = new FormData();
    body.append(
      "operations",
      JSON.stringify({ query, variables: cleanVariables })
    );
    body.append("map", JSON.stringify(map));
    files.forEach((file, index) => {
      body.append(index.toString(), file);
    });
  } else {
    headers["Content-Type"] = "application/json";
    body = { query, variables };
  }
  let response;
  try {
    response = await $fetch("/api/remote", {
      method: "POST",
      body,
      headers
    });
  } catch (error) {
    if (error?.response?._data) {
      response = error.response._data;
    } else {
      throw error;
    }
  }
  if (response.errors?.length) {
    const err = new Error(response.errors[0]?.message || "GraphQL error");
    err.graphQLErrors = response.errors;
    throw err;
  }
  if (!response.data) {
    throw new Error(
      response.message || response.error || "Invalid server response format"
    );
  }
  return response.data;
}
function useGQLQuery(key, query, variables = {}, opts = {}) {
  return useQuery({
    queryKey: key,
    queryFn: () => gqlRequest({ query, variables }),
    ...opts
  });
}
function useGQLMutation(mutation, opts = {}) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars) => gqlRequest({ query: mutation, variables: vars }),
    onMutate: async (newData) => {
      await qc.cancelQueries({ queryKey: ["currentUser"] });
      const previous = qc.getQueryData(["currentUser"]);
      qc.setQueryData(["currentUser"], newData);
      return { previous };
    },
    onError: (err, _vars, context) => {
      if (context?.previous) {
        qc.setQueryData(["currentUser"], context.previous);
      }
      console.error(err);
    },
    ...opts
  });
}

export { useGQLQuery as a, useGQLMutation as u };
//# sourceMappingURL=useGraphQL-Bw_Hbd5v.mjs.map
