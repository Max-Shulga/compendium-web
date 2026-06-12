import { notFound } from 'next/navigation';

import { getDictionary, hasLocale } from '@/app/[lang]/dictionaries';

import SignInForm from './SignInForm';

const SignInPage = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return <SignInForm dict={dict.auth.signIn} lang={lang} />;
};

export default SignInPage;
