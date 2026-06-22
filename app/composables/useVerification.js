import { useGQLQuery, useGQLMutation } from "./useGraphQL";

export const useVerification = () => {
  // ──────────────────────────────────────────────
  // Fetch Current User
  // ──────────────────────────────────────────────
  const USER_QUERY = `
    query CurrentUser {
      currentUserProfile: me {
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
  requestVerificationMutation.mutateAsync = async ({ id, entity }) => {
    return await requestOriginal({ input: { id, entity } });
  };

  return {
    currentUser: userQuery,
    requestVerification: requestVerificationMutation,
  };
};
