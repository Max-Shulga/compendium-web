type SignUpDto = {
  email: string;
  password: string;
};

type SignInDto = {
  email: string;
  password: string;
};

type TAuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type { SignUpDto, SignInDto, TAuthTokens };
