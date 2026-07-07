'use client';

import { Anchor } from '@mantine/core';
import Link from 'next/link';

import type { TLinkAnchor } from './models/linkAnchor.model';

const LinkAnchor = ({ href, ...props }: TLinkAnchor) => (
  <Anchor component={Link} href={href} {...props} />
);

export default LinkAnchor;
