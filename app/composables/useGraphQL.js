export const useGraphQL = () => {
  const token = useCookie('auth_token');

  const execute = async (query, variables = {}) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token.value) {
      headers['Authorization'] = `Bearer ${token.value}`;
    }

    try {
      const response = await $fetch('/api/remote', {
        method: 'POST',
        body: { query, variables },
        headers,
      });

      if (response.errors) {
        throw new Error(response.errors[0].message || 'GraphQL Error');
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return { execute };
};
