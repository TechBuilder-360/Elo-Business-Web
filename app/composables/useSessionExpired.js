// Global singleton state — shared across all composable usages
const isSessionExpired = ref(false);

export const useSessionExpired = () => {
  const showExpiredModal = () => {
    isSessionExpired.value = true;
  };

  const hideExpiredModal = () => {
    isSessionExpired.value = false;
  };

  return { isSessionExpired, showExpiredModal, hideExpiredModal };
};
