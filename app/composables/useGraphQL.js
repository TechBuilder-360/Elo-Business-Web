import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { $fetch } from "ofetch";

const BACKEND_URL = "https://elo--elo-backend--fwg2j6rrxrkh.code.run/api";

// Helper to check if a value is a File/Blob
function isFile(value) {
  return (
    (typeof File !== "undefined" && value instanceof File) ||
    (typeof Blob !== "undefined" && value instanceof Blob)
  );
}

// Recursively extracts files from variables and generates the map for the GraphQL Multipart Request Spec
function extractFiles(variables) {
  const files = [];
  const map = {};

  function recurse(obj, path) {
    if (obj === null || obj === undefined) return obj;
    if (isFile(obj)) {
      const fileId = files.length.toString();
      files.push(obj);
      map[fileId] = [path];
      return null; // Replace file with null in operations
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

// Core GraphQL request helper
async function gqlRequest({ query, variables = {} }) {
  const headers = {
    Accept: "application/json",
  };

  // Get token directly from cookie
  const token = useCookie("access_token").value;
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Check for files to determine request format
  const { cleanVariables, files, map } = extractFiles(variables);
  let body;

  if (files.length > 0) {
    // GraphQL Multipart Request format
    body = new FormData();
    body.append(
      "operations",
      JSON.stringify({ query, variables: cleanVariables })
    );
    body.append("map", JSON.stringify(map));

    files.forEach((file, index) => {
      body.append(index.toString(), file);
    });
    // Do NOT set Content-Type header when using FormData; 
    // the browser automatically sets it with the required boundary hash.
  } else {
    // Standard JSON format
    headers["Content-Type"] = "application/json";
    body = { query, variables };
  }

  let response;
  try {
    response = await $fetch(BACKEND_URL, {
      method: "POST",
      body,
      headers,
    });
  } catch (error) {
    // If ofetch throws due to a 4xx/5xx status (like 422 GraphQL error)
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
      response.message || response.error || "Invalid server response format",
    );
  }

  return response.data;
}

// Query hook – use anywhere in Vue components
export function useGQLQuery(key, query, variables = {}, opts = {}) {
  return useQuery({
    queryKey: key,
    queryFn: () => gqlRequest({ query, variables }),
    ...opts,
  });
}

// Mutation hook with optimistic update support
export function useGQLMutation(mutation, opts = {}) {
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
    ...opts,
  });
}

// Legacy execute helper for backward compatibility
export function useExecute() {
  const execute = async (query, variables = {}) =>
    gqlRequest({ query, variables });
  return { execute };
}

export const useGraphQL = () => {
  const token = useCookie("auth_token");

  const execute = async (query, variables = {}) => {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token.value) {
      headers["Authorization"] = `Bearer ${token.value}`;
    }

    try {
      const response = await $fetch("/api/remote", {
        method: "POST",
        body: { query, variables },
        headers,
      });

      if (response.errors) {
        throw new Error(response.errors[0].message || "GraphQL Error");
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return { execute };
};
