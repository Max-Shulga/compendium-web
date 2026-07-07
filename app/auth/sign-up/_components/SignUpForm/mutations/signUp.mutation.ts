import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/app/auth/api';

function useSignUpMutation() {
  return useMutation({
    mutationFn: authApi.signUp
  });
}

export { useSignUpMutation };
