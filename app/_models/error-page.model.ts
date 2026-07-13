type TErrorPage = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

export type { TErrorPage };
