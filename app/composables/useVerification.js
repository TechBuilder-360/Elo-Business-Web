import { useGQLQuery, useGQLMutation } from "./useGraphQL";

export const useVerification = () => {
  // ──────────────────────────────────────────────
  // Fetch Current User
  // ──────────────────────────────────────────────
  const USER_QUERY = `
    query CurrentUser {
      user {
        first_name
        last_name
        display_name
        is_verified
        disabled
        disable_reason
      }
    }
  `;

  const userQuery = useGQLQuery(["currentUser"], USER_QUERY);

  // ──────────────────────────────────────────────
  // Request Verification Mutation
  // ──────────────────────────────────────────────
  const REQUEST_VERIFICATION_MUTATION = `
    mutation RequestVerification($input: verificationPayload!) {
      requestUserVerification(input: $input) {
        ... on VerificationSuccess {
          link
          status
        }
        ... on VerificationError {
          code
          message
        }
      }
    }
  `;

  const requestVerificationMutation = useGQLMutation(
    REQUEST_VERIFICATION_MUTATION,
    {
      onError: (err) => {
        console.error("Verification Request error:", err);
      },
    },
  );

  const requestOriginal = requestVerificationMutation.mutateAsync.bind(
    requestVerificationMutation,
  );
  requestVerificationMutation.mutateAsync = async (entityStr) => {
    // Note: If Entity is an ENUM, GraphQL might require it as unquoted string in literal,
    // but as a variable, we can pass it normally as string if the client serializes it correctly.
    return await requestOriginal({ input: { entity: entityStr } });
  };

  return {
    currentUser: userQuery,
    requestVerification: requestVerificationMutation,
  };
};
