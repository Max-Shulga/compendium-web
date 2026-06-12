'use client';

import { Alert, Anchor, Button, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
  confirmPasswordLabel: string;
  confirmPasswordPlaceholder: string;
  submit: string;
  hasAccount: string;
  signInLink: string;
  passwordMismatch: string;
  errorFallback: string;
};

type Props = {
  dict: Dict;
  lang: string;
};

const SignUpForm = ({ dict, lang }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const form = useForm({
    initialValues: { email: '', password: '', confirmPassword: '' },
    validate: {
      email: (v) => (/^\S+@\S+\.\S+$/.test(v) ? null : dict.emailInvalid),
      password: (v) => (v.length > 0 ? null : dict.passwordRequired),
      confirmPassword: (v, values) =>
        v === values.password ? null : dict.passwordMismatch
    }
  });

  const { isTouched, validateField, values: { password } } = form;

  useEffect(() => {
    if (isTouched('confirmPassword')) {
      validateField('confirmPassword');
    }
  }, [password, isTouched, validateField]);

  const handleSubmit = form.onSubmit(async ({ email,password: formPassword }) => {
    setFormError('');
    setLoading(true);
    try {
      await authApi.signUp({ email, password:formPassword });
      router.push(`/${lang}/auth/sign-in`);
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
            <PasswordInput
              label={dict.confirmPasswordLabel}
              placeholder={dict.confirmPasswordPlaceholder}
              {...form.getInputProps('confirmPassword')}
            />
            <Button fullWidth loading={loading} mt='xs' type='submit'>
              {dict.submit}
            </Button>
          </Stack>
        </form>
        <Text c='dimmed' size='sm' ta='center'>
          {dict.hasAccount}{' '}
          <Anchor component={Link} href={`/${lang}/auth/sign-in`} size='sm'>
            {dict.signInLink}
          </Anchor>
        </Text>
      </Stack>
    </div>
  );
};

export default SignUpForm;
