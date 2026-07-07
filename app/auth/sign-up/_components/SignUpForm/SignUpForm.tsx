'use client';

import { Alert, Anchor, Button, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { ROUTES } from '@/core/constants/routes.constant';
import zodResolver from '@/lib/zodResolver';

import { useSignUpMutation } from './mutations/signUp.mutation';
import { signUpSchema } from './schemas/signUp.schema';

const SignUpForm = () => {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validate: zodResolver(signUpSchema)
  });

  const { isTouched, validateField, values: { password } } = form;

  useEffect(() => {
    if (isTouched('confirmPassword')) {
      validateField('confirmPassword');
    }
  }, [password, isTouched, validateField]);

  const signUpMutation = useSignUpMutation();

  const handleSubmit = form.onSubmit(({ email, password: formPassword }) =>
    signUpMutation.mutate({ email, password: formPassword }, {
      onSuccess: () => router.push(ROUTES.auth.signIn)
    }));

  return (
    <div style={{ maxWidth: 400, width: '100%' }}>
      <Stack gap='xl'>
        <Stack gap={6}>
          <Title
            order={2}
            style={{ fontSize: '2rem', fontWeight: 400, letterSpacing: '-0.01em', lineHeight: 1.2 }}
          >
            Create account
          </Title>
          <Text c='dimmed' size='sm'>Start your journey</Text>
        </Stack>
        <form onSubmit={handleSubmit}>
          <Stack gap='md'>
            {signUpMutation.isError && (
              <Alert color='red' variant='light'>
                {signUpMutation.error instanceof Error
                  ? signUpMutation.error.message
                  : 'Sign up failed'}
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
              placeholder='Create a password'
              {...form.getInputProps('password')}
            />
            <PasswordInput
              label='Confirm password'
              placeholder='Repeat your password'
              {...form.getInputProps('confirmPassword')}
            />
            <Button fullWidth loading={signUpMutation.isPending} mt='xs' type='submit'>
              Create account
            </Button>
          </Stack>
        </form>
        <Text c='dimmed' size='sm' ta='center'>
          Already have an account?
          <Anchor component={Link} href={ROUTES.auth.signIn} size='sm'>
            Sign in
          </Anchor>
        </Text>
      </Stack>
    </div>
  );
};

export default SignUpForm;
