import { u as useGQLMutation } from './useGraphQL-Bw_Hbd5v.mjs';
import { n as navigateTo } from './server.mjs';
import { useQueryClient } from '@tanstack/vue-query';

const useAuth = () => {
  const qc = useQueryClient();
  const REQUEST_OTP_MUTATION = `
    mutation RequestOtp($input: RequestOTP!) {
      requestOtp(input: $input) {
        Identifier
      }
    }
  `;
  const requestOtpMutation = useGQLMutation(REQUEST_OTP_MUTATION, {
    onSuccess: () => {
    },
    onError: (err) => {
      console.error("RequestOtp error:", err);
    }
  });
  const requestOtpOriginal = requestOtpMutation.mutateAsync.bind(requestOtpMutation);
  requestOtpMutation.mutateAsync = async ({ email_address, password }) => {
    const data = await requestOtpOriginal({
      input: { email_address, password }
    });
    return data?.requestOtp;
  };
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
      if (data?.login?.user) {
        qc.setQueryData(["currentUser"], {
          currentUserProfile: data.login.user
        });
      }
    },
    onError: (err) => {
      console.error("Login error:", err);
    }
  });
  const loginOriginal = loginMutation.mutateAsync.bind(loginMutation);
  loginMutation.mutateAsync = async ({ otp, identifier }) => {
    const data = await loginOriginal({
      input: { otp, identifier }
    });
    return data?.login;
  };
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
    }
  });
  const registerOriginal = registerMutation.mutateAsync.bind(registerMutation);
  registerMutation.mutateAsync = async (userData) => {
    return await registerOriginal({ input: userData });
  };
  const logout = async () => {
    try {
      await $fetch("/api/logout", { method: "POST" });
    } catch (e) {
      console.error("Logout error", e);
    }
    qc.removeQueries({ queryKey: ["currentUser"] });
    navigateTo("/");
  };
  return {
    requestOtp: requestOtpMutation,
    login: loginMutation,
    register: registerMutation,
    logout
  };
};

export { useAuth as u };
//# sourceMappingURL=useAuth-CFqBlum2.mjs.map
