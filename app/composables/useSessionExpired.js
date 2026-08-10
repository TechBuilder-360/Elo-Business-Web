export const useSessionExpired = () => {
  // Use Nuxt's useState to safely scope this globally per-user instead of sharing across all server requests
  const isSessionExpired = useState('isSessionExpired', () => false);

  const showExpiredModal = () => {
    isSessionExpired.value = true;
  };

  const hideExpiredModal = () => {
    isSessionExpired.value = false;
  };

  return { isSessionExpired, showExpiredModal, hideExpiredModal };
};
