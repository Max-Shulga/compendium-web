'use client';

import { Alert, Anchor, Button, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/core/constants/routes.constant';
import { setAuthTokens } from '@/lib/auth/client';
import zodResolver from '@/lib/zodResolver';

import { useSignInMutation } from './mutations/signIn.mutation';
import { signInSchema } from './schemas/signIn.schema';

const SignInForm = () => {
  const router = useRouter();

  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: zodResolver(signInSchema)
  });

  const signInMutation = useSignInMutation();

  const handleSubmit = form.onSubmit((values) => signInMutation.mutate(values, {
    onSuccess: (tokens) => {
      setAuthTokens(tokens);
      router.push(ROUTES.home);
    }
  }));

  return (
    <div style={{ maxWidth: 400, width: '100%' }}>
      <Stack gap='xl'>
        <Stack gap={6}>
          <Title
            order={2}
            style={{ fontSize: '2rem', fontWeight: 400, letterSpacing: '-0.01em', lineHeight: 1.2 }}
          >
            Sign in
          </Title>
          <Text c='dimmed' size='sm'>Welcome back</Text>
        </Stack>
        <form onSubmit={handleSubmit}>
          <Stack gap='md'>
            {signInMutation.isError && (
              <Alert color='red' variant='light'>
                {signInMutation.error instanceof Error
                  ? signInMutation.error.message
                  : 'Sign in failed'}
              </Alert>
            )}
            <TextInput
              label='Email'
              placeholder='you@example.com'
              type='email'
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label='Password'
              placeholder='Your password'
              {...form.getInputProps('password')}
            />
            <Button fullWidth loading={signInMutation.isPending} mt='xs' type='submit'>
              Sign in
            </Button>
          </Stack>
        </form>
        <Text c='dimmed' size='sm' ta='center'>
          Don&apos;t have an account?{' '}
          <Anchor component={Link} href={ROUTES.auth.signUp} size='sm'>
            Sign up
          </Anchor>
        </Text>
      </Stack>
    </div>
  );
};

export default SignInForm;
