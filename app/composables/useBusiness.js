import { useGQLQuery, useGQLMutation } from "./useGraphQL";
import { useQueryClient } from "@tanstack/vue-query";

export const useBusiness = (options = {}) => {
  // ──────────────────────────────────────────────
  // Fetch User Businesses
  // ──────────────────────────────────────────────
  const USER_BUSINESSES_QUERY = `
    query GetUserBusinesses {
      getUserBusinsses {
        message
        data {
          id
          name
          role
          logo
          industry
        }
      }
    }
  `;

  const userBusinessesQuery = useGQLQuery(["userBusinesses"], USER_BUSINESSES_QUERY, {}, options);

  // ──────────────────────────────────────────────
  // Register New Business
  // ──────────────────────────────────────────────
  const REGISTER_BUSINESS_MUTATION = `
    mutation RegisterBusiness($input: RegisterBusinessInput!) {
      registerBusiness(input: $input) {
        message
        data {
          id
          name
          role
          logo
          industry
        }
      }
    }
  `;

  const registerBusinessMutation = useGQLMutation(REGISTER_BUSINESS_MUTATION, {
    onSuccess: () => {
      // Invalidate the userBusinesses query so the list refreshes automatically
      const qc = useQueryClient();
      qc.invalidateQueries({ queryKey: ["userBusinesses"] });
    },
    onError: (err) => {
      console.error("RegisterBusiness error:", err);
    },
  });

  // Wrap mutateAsync for easier calling
  const registerOriginal = registerBusinessMutation.mutateAsync.bind(registerBusinessMutation);
  registerBusinessMutation.mutateAsync = async (inputData) => {
    return await registerOriginal({ input: inputData });
  };

  return {
    userBusinesses: userBusinessesQuery,
    registerBusiness: registerBusinessMutation,
  };
};
