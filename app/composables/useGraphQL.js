import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { $fetch } from "ofetch";

// Core GraphQL request helper
// Auth token is injected server-side by the proxy via HttpOnly cookie
async function gqlRequest({ query, variables = {} }) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
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
    retry: false,
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
