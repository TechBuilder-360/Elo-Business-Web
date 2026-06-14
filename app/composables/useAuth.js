import { useGQLMutation } from "./useGraphQL";
import { navigateTo } from "#app";
import { useQueryClient } from "@tanstack/vue-query";

export const useAuth = () => {
  const qc = useQueryClient();

  // ──────────────────────────────────────────────
  // Step 1: Request OTP (email + password)
  // Returns an Identifier used in the login step
  // ──────────────────────────────────────────────
  const REQUEST_OTP_MUTATION = `
    mutation RequestOtp($input: RequestOTP!) {
      requestOtp(input: $input) {
        Identifier
      }
    }
  `;

  const requestOtpMutation = useGQLMutation(REQUEST_OTP_MUTATION, {
    onSuccess: () => {},
    onError: (err) => {
      console.error("RequestOtp error:", err);
    },
  });

  // Wrap mutateAsync so callers get the nested requestOtp object back
  const requestOtpOriginal =
    requestOtpMutation.mutateAsync.bind(requestOtpMutation);
  requestOtpMutation.mutateAsync = async ({ email_address, password }) => {
    const data = await requestOtpOriginal({
      input: { email_address, password },
    });
    return data?.requestOtp;
  };

  // ──────────────────────────────────────────────
  // Step 2: Login with OTP + Identifier
  // Fields: otp: String!, identifier: String!
  // ──────────────────────────────────────────────
  const LOGIN_MUTATION = `
    mutation Login($input: Login!) {
      login(input: $input) {
        access_token
        expire_at
        user {
          first_name
          last_name
          display_name
          is_verified
          disabled
          disable_reason
        }
      }
    }
  `;

  const loginMutation = useGQLMutation(LOGIN_MUTATION, {
    onSuccess: (data) => {
      tokenCookie.value = data.access_token;
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const query = `
        mutation Registration($input: Registration!) {
          registration(input: $input) {
            __typename
          }
        }
      `;
      const variables = {
        input: userData,
      };

      const response = await execute(query, variables);
      return response.registration;
    },
  });

  const logout = () => {
    tokenCookie.value = null;
    navigateTo("/");
  };

  return {
    requestOtp: requestOtpMutation,
    login: loginMutation,
    register: registerMutation,
    logout,
  };
};
