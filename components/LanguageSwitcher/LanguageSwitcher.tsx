'use client';

import { SegmentedControl } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';

type Locale = 'en' | 'ru';

type Props = {
  lang: Locale;
};

const LanguageSwitcher = ({ lang }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (newLang: string) => {
    const segments = pathname.split('/');
    segments[1] = newLang;
    router.push(segments.join('/') || '/');
  };

  return (
    <SegmentedControl
      data={[
        { label: 'EN', value: 'en' },
        { label: 'RU', value: 'ru' }
      ]}
      size='xs'
      value={lang}
      onChange={handleChange}
    />
  );
};

export default LanguageSwitcher;
