'use client';

import { Alert, Anchor, Button, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { authApi } from '../api';

type Dict = {
  title: string;
  subtitle: string;
  emailLabel: string;
  emailPlaceholder: string;
  emailInvalid: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  passwordRequired: string;
  submit: string;
  noAccount: string;
  signUpLink: string;
  errorFallback: string;
};

type Props = {
  dict: Dict;
  lang: string;
};

const SignInForm = ({ dict, lang }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: (v) => (/^\S+@\S+\.\S+$/.test(v) ? null : dict.emailInvalid),
      password: (v) => (v.length > 0 ? null : dict.passwordRequired)
    }
  });

  const handleSubmit = form.onSubmit(async ({ email, password }) => {
    setFormError('');
    setLoading(true);
    try {
      const tokens = await authApi.signIn({ email, password });
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
      router.push(`/${lang}`);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : dict.errorFallback);
    } finally {
      setLoading(false);
    }
  });

  return (
    <div style={{ maxWidth: 400, width: '100%' }}>
      <Stack gap='xl'>
        <Stack gap={6}>
          <Title
            order={2}
            style={{ fontSize: '2rem', fontWeight: 400, letterSpacing: '-0.01em', lineHeight: 1.2 }}
          >
            {dict.title}
          </Title>
          <Text c='dimmed' size='sm'>{dict.subtitle}</Text>
        </Stack>
        <form onSubmit={handleSubmit}>
          <Stack gap='md'>
            {formError && (
              <Alert color='red' variant='light'>
                {formError}
              </Alert>
            )}
            <TextInput
              label={dict.emailLabel}
              placeholder={dict.emailPlaceholder}
              type='email'
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label={dict.passwordLabel}
              placeholder={dict.passwordPlaceholder}
              {...form.getInputProps('password')}
            />
            <Button fullWidth loading={loading} mt='xs' type='submit'>
              {dict.submit}
            </Button>
          </Stack>
        </form>
        <Text c='dimmed' size='sm' ta='center'>
          {dict.noAccount}{' '}
          <Anchor component={Link} href={`/${lang}/auth/sign-up`} size='sm'>
            {dict.signUpLink}
          </Anchor>
        </Text>
      </Stack>
    </div>
  );
};

export default SignInForm;
