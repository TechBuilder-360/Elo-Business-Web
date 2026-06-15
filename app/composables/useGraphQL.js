import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { $fetch } from "ofetch";
import { useCookie } from "#app";

// Core GraphQL request helper – adds auth token if present
async function gqlRequest({ query, variables = {} }) {
  const token = useCookie("auth_token");
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (token?.value) {
    headers["Authorization"] = `Bearer ${token.value}`;
  }
  const response = await $fetch("/api/remote", {
    method: "POST",
    body: { query, variables },
    headers,
  });
  if (response.errors?.length) {
    const err = new Error("GraphQL error");
    err.graphQLErrors = response.errors;
    throw err;
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
