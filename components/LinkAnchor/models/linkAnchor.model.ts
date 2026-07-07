import type { AnchorProps } from '@mantine/core';
import type { PropsWithChildren } from 'react';

type TLinkAnchor = PropsWithChildren<AnchorProps & { href: string }>;

export type { TLinkAnchor };
