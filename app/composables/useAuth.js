import { useMutation } from '@tanstack/vue-query';
import { useExecute } from './useGraphQL';
import { useCookie, navigateTo } from '#app';

export const useAuth = () => {
  const { execute } = useExecute();
  
  // Initialize cookie outside of async callbacks to maintain Nuxt context
  const tokenCookie = useCookie('auth_token', {
    maxAge: 60 * 60 * 24 * 7, // Default 7 days
    path: '/'
  });

  const requestOtpMutation = useMutation({
    mutationFn: async ({ email_address, password }) => {
      const query = `
        mutation RequestOtp($input: RequestOTP!) {
          requestOtp(input: $input) {
            Identifier
          }
        }
      `;
      const variables = {
        input: { email_address, password }
      };
      
      const response = await execute(query, variables);
      return response.requestOtp;
    }
  });

  const loginMutation = useMutation({
    mutationFn: async ({ otp, identifier }) => {
      const query = `
        mutation Login($input: Login!) {
          login(input: $input) {
            access_token
            expire_at
          }
        }
      `;
      const variables = {
        input: { otp, identifier }
      };
      
      const response = await execute(query, variables);
      return response.login;
    },
    onSuccess: (data) => {
      tokenCookie.value = data.access_token;
    }
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
        input: userData
      };
      
      const response = await execute(query, variables);
      return response.registration;
    }
  });

  const logout = () => {
    tokenCookie.value = null;
    navigateTo('/');
  };

  return {
    requestOtp: requestOtpMutation,
    login: loginMutation,
    register: registerMutation,
    logout
  };
};
