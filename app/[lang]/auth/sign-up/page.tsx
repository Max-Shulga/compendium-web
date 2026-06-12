import { notFound } from 'next/navigation';

import { getDictionary, hasLocale } from '@/app/[lang]/dictionaries';

import SignUpForm from './SignUpForm';

const SignUpPage = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return <SignUpForm dict={dict.auth.signUp} lang={lang} />;
};

export default SignUpPage;
