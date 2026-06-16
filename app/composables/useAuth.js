import { useGQLMutation } from "./useGraphQL";
import { navigateTo } from "#app";

export const useAuth = () => {

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
      }
    }
  `;

  const loginMutation = useGQLMutation(LOGIN_MUTATION, {
    onSuccess: (data) => {
      // Token is now set securely by the server proxy via HttpOnly cookie
    },
    onError: (err) => {
      console.error("Login error:", err);
    },
  });

  // Wrap mutateAsync so callers pass { otp, identifier } directly
  const loginOriginal = loginMutation.mutateAsync.bind(loginMutation);
  loginMutation.mutateAsync = async ({ otp, identifier }) => {
    const data = await loginOriginal({
      input: { otp, identifier },
    });
    return data?.login;
  };

  // ──────────────────────────────────────────────
  // Registration
  // ──────────────────────────────────────────────
  const REGISTRATION_MUTATION = `
    mutation Registration($input: Registration!) {
      registration(input: $input) {
        __typename
      }
    }
  `;

  const registerMutation = useGQLMutation(REGISTRATION_MUTATION, {
    onError: (err) => {
      console.error("Registration error:", err);
    },
  });

  // Wrap mutateAsync so callers pass the flat userData object directly
  const registerOriginal = registerMutation.mutateAsync.bind(registerMutation);
  registerMutation.mutateAsync = async (userData) => {
    return await registerOriginal({ input: userData });
  };

  // ──────────────────────────────────────────────
  // Logout
  // ──────────────────────────────────────────────
  const logout = async () => {
    try {
      await $fetch("/api/logout", { method: "POST" });
    } catch (e) {
      console.error("Logout error", e);
    }
    navigateTo("/");
  };

  return {
    requestOtp: requestOtpMutation,
    login: loginMutation,
    register: registerMutation,
    logout,
  };
};
