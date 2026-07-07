import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/app/auth/api';

function useSignInMutation() {
  return useMutation({
    mutationFn: authApi.signIn
  });
}

export { useSignInMutation };
