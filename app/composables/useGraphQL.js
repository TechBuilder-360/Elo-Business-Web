import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { $fetch } from "ofetch";

const BACKEND_URL = "https://elo--elo-backend--fwg2j6rrxrkh.code.run/api";

// Core GraphQL request helper
async function gqlRequest({ query, variables = {} }) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  // Get token directly from cookie
  const token = useCookie("access_token").value;
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let response;
  try {
    response = await $fetch(BACKEND_URL, {
      method: "POST",
      body: { query, variables },
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
